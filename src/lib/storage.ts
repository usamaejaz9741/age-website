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
    console.log('=== SAVING USER DATA ===');
    console.log('Email:', data.email);
    console.log('Score:', data.score);
    console.log('Band:', data.band);

    // Try to save to database first
    try {
      const { saveSubmissionToDatabase } = await import('./database');
      const dbSuccess = await saveSubmissionToDatabase(data);
      
      if (dbSuccess) {
        console.log('✅ Successfully saved to database');
        
        // Also save to localStorage as backup
        await saveToLocalStorage(data);
        
        return true;
      } else {
        console.warn('⚠️ Database save failed, falling back to localStorage');
      }
    } catch (dbError) {
      console.warn('⚠️ Database not configured or failed:', dbError);
    }

    // Fallback to localStorage
    console.log('📱 Saving to localStorage as fallback');
    await saveToLocalStorage(data);
    
    // Create downloadable file for manual collection
    await createDownloadableFile(data);

    console.log(`✅ User data saved successfully for ${data.email}`);
    return true;
  } catch (error) {
    console.error('❌ Error saving user data:', error);
    return false;
  }
};

/**
 * Save data to localStorage (fallback method)
 */
const saveToLocalStorage = async (data: UserSubmission): Promise<void> => {
  try {
    // Save to localStorage for client-side access
    const existingData = localStorage.getItem('age_user_submissions');
    const submissions: UserSubmission[] = existingData ? JSON.parse(existingData) : [];

    // Add new submission to the array
    submissions.push(data);

    // Update localStorage
    localStorage.setItem('age_user_submissions', JSON.stringify(submissions));

    // Save individual submission with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const sanitizedEmail = data.email.replace('@', '_at_').replace(/[^a-zA-Z0-9._-]/g, '_');
    const individualKey = `age_submission_${sanitizedEmail}_${timestamp}`;
    localStorage.setItem(individualKey, JSON.stringify(data));

    console.log('📱 Data saved to localStorage');
  } catch (error) {
    console.error('❌ Error saving to localStorage:', error);
  }
};

/**
 * Create downloadable file for manual collection
 */
const createDownloadableFile = async (data: UserSubmission): Promise<void> => {
  try {
    // Create a downloadable file with the data
    const fileData = {
      timestamp: new Date().toISOString(),
      submission: data,
      metadata: {
        userAgent: navigator.userAgent,
        url: window.location.href,
        referrer: document.referrer
      }
    };

    // Log the data to console for immediate access
    console.log('=== NEW SUBMISSION ===');
    console.log('Email:', data.email);
    console.log('Score:', data.score);
    console.log('Band:', data.band);
    console.log('Full Data:', JSON.stringify(fileData, null, 2));
    console.log('=====================');

    // Create downloadable file
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const sanitizedEmail = data.email.replace('@', '_at_').replace(/[^a-zA-Z0-9._-]/g, '_');
    
    const blob = new Blob([JSON.stringify(fileData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `age_submission_${sanitizedEmail}_${timestamp}.json`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log('📁 Downloadable file created');
  } catch (fileError) {
    console.warn('⚠️ Failed to create downloadable file:', fileError);
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
      console.log('No submissions found to export');
      return false;
    }

    const submissions: UserSubmission[] = JSON.parse(existingData);

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

    console.log(`CSV export completed: ${filename}`);
    console.log(`Exported ${submissions.length} submissions`);
    return true;
  } catch (error) {
    console.error('Error exporting to CSV:', error);
    return false;
  }
};