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

import { logError } from './console-utils';

/**
 * Storage configuration constants
 */
const STORAGE_RETENTION_DAYS = 90; // Keep submissions for 90 days
const MAX_SUBMISSIONS = 100; // Maximum number of submissions to store
const MAX_STORAGE_SIZE_MB = 4; // Maximum storage size in MB before cleanup
const FALLBACK_SUBMISSION_COUNT_HIGH = 50; // First fallback: keep 50 submissions
const FALLBACK_SUBMISSION_COUNT_LOW = 10; // Second fallback: keep 10 submissions
const STORAGE_KEY = 'age_user_submissions'; // Primary storage key

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
 * 3. Logs errors for debugging in development mode
 * 
 * @param data - User submission data to save
 * @returns Promise<boolean> - Success status of the save operation
 * 
 * @example
 * ```typescript
 * const success = await saveUserData({
 *   timestamp: new Date().toISOString(),
 *   email: 'user@example.com',
 *   score: 75,
 *   band: 'Accelerator',
 *   dimensions: { strategy: 80, implementation: 70, data: 75, culture: 80 },
 *   recommendations: ['Develop AI strategy']
 * });
 * ```
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
    logError('Save User Data', error);
    return false;
  }
};

/**
 * Load existing submissions from localStorage
 * 
 * @returns Array of existing submissions, or empty array if none found or parse fails
 */
const loadExistingSubmissions = (): UserSubmission[] => {
  const existingDataString = localStorage.getItem(STORAGE_KEY);
  
  if (!existingDataString) {
    return [];
  }
  
  try {
    const submissions = JSON.parse(existingDataString);
    return Array.isArray(submissions) ? submissions : [];
  } catch (parseError) {
    logError('Load Submissions', parseError, { action: 'Parsing localStorage data' });
    return [];
  }
};

/**
 * Remove submissions older than the retention period
 * 
 * @param submissions - Array of submissions to filter
 * @returns Filtered array with only recent submissions
 */
const cleanupOldSubmissions = (submissions: UserSubmission[]): UserSubmission[] => {
  const retentionCutoff = Date.now() - (STORAGE_RETENTION_DAYS * 24 * 60 * 60 * 1000);
  return submissions.filter(sub => 
    new Date(sub.timestamp).getTime() > retentionCutoff
  );
};

/**
 * Enforce submission count limit
 * 
 * @param submissions - Array of submissions
 * @returns Array limited to MAX_SUBMISSIONS
 */
const enforceSubmissionLimit = (submissions: UserSubmission[]): UserSubmission[] => {
  if (submissions.length >= MAX_SUBMISSIONS) {
    return submissions.slice(-(MAX_SUBMISSIONS - 1)); // Keep (MAX-1), add 1 new = MAX total
  }
  return submissions;
};

/**
 * Check if serialized data exceeds size threshold
 * 
 * @param jsonString - Serialized JSON string
 * @returns true if data is too large
 */
const exceedsStorageLimit = (jsonString: string): boolean => {
  const sizeInBytes = jsonString.length;
  const maxSizeInBytes = MAX_STORAGE_SIZE_MB * 1024 * 1024;
  return sizeInBytes > maxSizeInBytes;
};

/**
 * Persist submissions to localStorage with progressive fallback strategy
 * 
 * This function implements a multi-tier fallback strategy:
 * 1. Try to save all submissions
 * 2. If too large, reduce to FALLBACK_SUBMISSION_COUNT_HIGH (50) submissions
 * 3. If quota exceeded, reduce to FALLBACK_SUBMISSION_COUNT_LOW (10) submissions
 * 4. If still failing, save only the current submission
 * 5. If completely unavailable, fail silently
 * 
 * @param submissions - Array of submissions to persist
 * @param currentSubmission - The current submission being saved
 */
const persistSubmissions = (submissions: UserSubmission[], currentSubmission: UserSubmission): void => {
  try {
    let dataToSave = submissions;
    const jsonString = JSON.stringify(dataToSave);
    
    // Check if data is too large before attempting to save
    if (exceedsStorageLimit(jsonString)) {
      logError('Persist Submissions', `Storage size exceeds ${MAX_STORAGE_SIZE_MB}MB, reducing to ${FALLBACK_SUBMISSION_COUNT_HIGH} submissions`);
      dataToSave = submissions.slice(-FALLBACK_SUBMISSION_COUNT_HIGH);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (storageError) {
    logError('Persist Submissions', storageError);
    
    // Progressive fallback strategy for quota exceeded errors
    saveWithFallback(submissions, currentSubmission);
  }
};

/**
 * Save submissions with progressive fallback strategy when quota is exceeded
 * 
 * @param submissions - Original array of submissions
 * @param currentSubmission - The current submission being saved
 */
const saveWithFallback = (submissions: UserSubmission[], currentSubmission: UserSubmission): void => {
  // Fallback 1: Try with last FALLBACK_SUBMISSION_COUNT_LOW submissions
  try {
    const reducedSubmissions = submissions.slice(-FALLBACK_SUBMISSION_COUNT_LOW);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reducedSubmissions));
    logError('Save Fallback', `Reduced to ${FALLBACK_SUBMISSION_COUNT_LOW} submissions due to quota`);
    return;
  } catch {
    // Continue to next fallback
  }
  
  // Fallback 2: Try with only current submission
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([currentSubmission]));
    logError('Save Fallback', 'Reduced to single submission due to quota');
    return;
  } catch {
    // Continue to final fallback
  }
  
  // Fallback 3: localStorage is completely unavailable - fail silently
  logError('Save Fallback', 'localStorage completely unavailable, data not persisted');
};

/**
 * Save individual submission with timestamped key
 * 
 * @param data - Submission to save individually
 */
const saveIndividualSubmission = (data: UserSubmission): void => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const sanitizedEmail = data.email.replace('@', '_at_').replace(/[^a-zA-Z0-9._-]/g, '_');
  const individualKey = `age_submission_${sanitizedEmail}_${timestamp}`;
  
  try {
    localStorage.setItem(individualKey, JSON.stringify(data));
  } catch (storageError) {
    // Individual submission storage failed - non-critical
    logError('Save Individual Submission', storageError, { key: individualKey });
  }
};

/**
 * Save data to localStorage (fallback method)
 * 
 * Implements a robust storage strategy with automatic cleanup and fallback mechanisms:
 * - Loads existing submissions
 * - Removes old submissions based on retention policy
 * - Enforces submission count limits
 * - Adds new submission
 * - Persists with progressive fallback on quota errors
 * - Saves individual timestamped copy
 */
const saveToLocalStorage = async (data: UserSubmission): Promise<void> => {
  try {
    // Load existing submissions
    let submissions = loadExistingSubmissions();
    
    // Cleanup old submissions
    submissions = cleanupOldSubmissions(submissions);
    
    // Enforce submission limit
    submissions = enforceSubmissionLimit(submissions);
    
    // Add new submission
    submissions.push(data);
    
    // Persist with progressive fallback strategy
    persistSubmissions(submissions, data);
    
    // Save individual submission with timestamp (non-critical)
    saveIndividualSubmission(data);
    
  } catch (error) {
    logError('Save to localStorage', error);
  }
};


/**
 * Exports all user submissions to CSV format for analysis
 * 
 * This function reads all stored submissions from localStorage and converts them 
 * to CSV format for easy analysis in spreadsheet applications or data analysis tools.
 * The CSV file is automatically downloaded to the user's device with timestamp.
 * 
 * @returns boolean - Success status of the export operation
 * 
 * @example
 * ```typescript
 * const success = exportToCSV();
 * if (success) {
 *   console.log('Export completed successfully');
 * }
 * ```
 * 
 * @throws Does not throw - returns false on error
 */
export const exportToCSV = (): boolean => {
  try {
    // Read submissions from localStorage
    const existingData = localStorage.getItem(STORAGE_KEY);
    
    if (!existingData) {
      return false;
    }

    let submissions: UserSubmission[] = [];
    try {
      submissions = JSON.parse(existingData);
    } catch (parseError) {
      logError('Export to CSV', parseError, { action: 'Parsing localStorage data' });
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
    logError('Export to CSV', error);
    return false;
  }
};