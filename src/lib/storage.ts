/**
 * Data Storage and Export Utilities
 * 
 * This module provides functions for persisting user assessment data
 * and exporting it for analysis. It handles both individual submissions
 * and bulk data export functionality.
 * 
 * Note: This implementation now uses Supabase database for server-side storage
 * with localStorage as a fallback. The database provides proper persistence,
 * analytics capabilities, and admin access to all submissions.
 */

/**
 * Interface for user submission data structure
 * Contains all assessment results and metadata for analysis
 */
export interface UserSubmission {
  /** ISO timestamp of when the assessment was completed */
  timestamp: string;
  /** User's email address for follow-up */
  email: string;
  /** Overall AI maturity score (0-100) */
  score: number;
  /** Maturity band classification */
  band: string;
  /** Individual dimension scores */
  dimensions: {
    strategy: number;      // AI strategy maturity score
    implementation: number; // Technical implementation score
    data: number;          // Data readiness score
    culture: number;       // Cultural alignment score
  };
  /** AI-generated recommendations */
  recommendations: string[];
  /** UTM parameters for marketing attribution (optional) */
  utmParams?: { [key: string]: string };
  /** Generated AI audit content (optional) */
  auditContent?: string;
  /** Quiz answers for detailed analysis (optional) */
  quizAnswers?: { [key: string]: number };
  /** Metadata for tracking and analytics (optional) */
  metadata?: {
    userAgent?: string;
    referrer?: string;
  };
}

/**
 * Saves user assessment data to database with localStorage fallback
 * 
 * This function stores user submissions in the following priority:
 * 1. Saves to Supabase database (primary storage)
 * 2. Falls back to localStorage if database fails
 * 3. Logs data to console for debugging
 * 
 * @param data - User submission data to save
 * @returns Promise<boolean> - Success status of the save operation
 */
export const saveUserData = async (data: UserSubmission): Promise<boolean> => {
  try {

    // Try to save to database first
    try {
      const { saveSubmissionToDatabase } = await import('./database');
      const dbSuccess = await saveSubmissionToDatabase(data);
      
      if (dbSuccess) {
        // Also save to localStorage as backup
        await saveToLocalStorage(data);
        return true;
      } else {
        // Fallback to localStorage
        await saveToLocalStorage(data);
      }
    } catch (dbError) {
      // Fallback to localStorage if database fails
      await saveToLocalStorage(data);
    }
    
    // Note: Automatic file download removed - data is now stored in database
    // await createDownloadableFile(data);

    return true;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error saving user data:', error);
    }
    return false;
  }
};

/**
 * Save data to localStorage (fallback method)
 */
const saveToLocalStorage = async (data: UserSubmission): Promise<void> => {
  try {
    // Save to localStorage for client-side access
    const existingDataString = localStorage.getItem('age_user_submissions');
    let submissions: UserSubmission[] = [];
    
    // Safely parse existing data
    if (existingDataString) {
      try {
        submissions = JSON.parse(existingDataString);
      } catch (parseError) {
        if (import.meta.env.DEV) {
          console.error('Error parsing existing localStorage data:', parseError);
        }
        // Reset to empty array if parse fails
        submissions = [];
      }
    }

    // Add new submission to the array
    submissions.push(data);

    // Update localStorage with error handling
    try {
      localStorage.setItem('age_user_submissions', JSON.stringify(submissions));
    } catch (storageError) {
      if (import.meta.env.DEV) {
        console.error('Error setting localStorage:', storageError);
      }
      // Quota exceeded - try to clear old data and retry
      if (submissions.length > 1) {
        // Keep only the current submission
        localStorage.setItem('age_user_submissions', JSON.stringify([data]));
      }
    }

    // Save individual submission with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const sanitizedEmail = data.email.replace('@', '_at_').replace(/[^a-zA-Z0-9._-]/g, '_');
    const individualKey = `age_submission_${sanitizedEmail}_${timestamp}`;
    
    try {
      localStorage.setItem(individualKey, JSON.stringify(data));
    } catch (storageError) {
      // Individual submission storage failed - non-critical
      if (import.meta.env.DEV) {
        console.error('Error saving individual submission:', storageError);
      }
    }

  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error saving to localStorage:', error);
    }
  }
};


/**
 * Exports all user submissions to CSV format for analysis
 * 
 * This function reads all stored submissions from localStorage and converts them 
 * to CSV format for easy analysis in spreadsheet applications or data analysis tools.
 * The CSV file is automatically downloaded to the user's device.
 * 
 * @returns boolean - Success status of the export operation
 */
export const exportToCSV = (): boolean => {
  try {
    // Read submissions from localStorage
    const existingData = localStorage.getItem('age_user_submissions');
    
    if (!existingData) {
      return false;
    }

    let submissions: UserSubmission[] = [];
    try {
      submissions = JSON.parse(existingData);
    } catch (parseError) {
      if (import.meta.env.DEV) {
        console.error('Error parsing localStorage data for export:', parseError);
      }
      return false;
    }

    // Create CSV header row
    const csvHeader = [
      'Timestamp',
      'Email',
      'Score',
      'Band',
      'Strategy Score',
      'Implementation Score',
      'Data Score',
      'Culture Score',
      'Recommendations',
      'UTM Parameters'
    ].join(',');

    // Convert each submission to CSV row
    const csvRows = submissions.map(submission => [
      submission.timestamp,
      submission.email,
      submission.score,
      submission.band,
      submission.dimensions.strategy,
      submission.dimensions.implementation,
      submission.dimensions.data,
      submission.dimensions.culture,
      `"${submission.recommendations.join('; ')}"`, // Escape recommendations
      `"${JSON.stringify(submission.utmParams || {})}"`, // Escape UTM params
    ].join(','));

    // Combine header and data rows
    const csvContent = [csvHeader, ...csvRows].join('\n');
    
    // Generate filename with current date
    const dateString = new Date().toISOString().slice(0, 10);
    const filename = `age_submissions_export_${dateString}.csv`;
    
    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error exporting to CSV:', error);
    }
    return false;
  }
};