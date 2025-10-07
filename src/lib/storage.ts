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
 * Saves user assessment data, prioritizing database storage with a fallback to localStorage.
 * This function ensures data is persisted, first attempting to save to a Supabase database.
 * If the database operation fails, it falls back to saving the data in the browser's localStorage.
 *
 * @param {UserSubmission} data - The user submission data to be saved.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the data was saved successfully (either to the database or localStorage), and `false` otherwise.
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
      console.warn('Database save failed, falling back to localStorage:', dbError);
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
 * Saves user submission data to the browser's localStorage as a fallback.
 * This function manages a list of submissions, ensuring it doesn't exceed a certain size or age.
 *
 * @private
 * @param {UserSubmission} data - The user submission data to save to localStorage.
 * @returns {Promise<void>} A promise that resolves when the data has been saved.
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

    // Remove submissions older than 90 days to save space
    const ninetyDaysAgo = Date.now() - (90 * 24 * 60 * 60 * 1000);
    submissions = submissions.filter(sub => 
      new Date(sub.timestamp).getTime() > ninetyDaysAgo
    );

    // Limit to 100 most recent submissions
    if (submissions.length >= 100) {
      submissions = submissions.slice(-99); // Keep 99, add 1 new = 100 total
    }

    // Add new submission to the array
    submissions.push(data);

    // Update localStorage with enhanced error handling
    try {
      const jsonString = JSON.stringify(submissions);
      // Check if data is too large (localStorage limit is typically 5-10MB)
      if (jsonString.length > 4 * 1024 * 1024) { // 4MB threshold
        // Keep only the most recent 50 submissions
        submissions = submissions.slice(-50);
      }
      localStorage.setItem('age_user_submissions', JSON.stringify(submissions));
    } catch (storageError) {
      if (import.meta.env.DEV) {
        console.error('Error setting localStorage:', storageError);
      }
      // Quota exceeded - progressively reduce data
      try {
        // Try with last 10 submissions
        localStorage.setItem('age_user_submissions', JSON.stringify(submissions.slice(-10)));
      } catch {
        // Last resort: keep only current submission
        try {
          localStorage.setItem('age_user_submissions', JSON.stringify([data]));
        } catch {
          // localStorage is completely unavailable - fail silently
        }
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
 * Exports all user submissions stored in localStorage to a CSV file.
 * This function retrieves the submissions, converts them to a CSV format, and triggers a download of the file.
 *
 * @returns {boolean} `true` if the export was successful, `false` otherwise (e.g., if no data is available).
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