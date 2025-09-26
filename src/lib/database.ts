/**
 * Database Operations for Audit Submissions
 * 
 * This module provides functions for saving and retrieving audit submissions
 * from the Supabase database. It replaces the localStorage-based storage
 * with proper server-side persistence.
 */

import { supabase, AUDIT_SUBMISSIONS_TABLE, convertToDatabaseFormat, type DatabaseSubmission } from './supabase'
import type { UserSubmission } from './storage'

/**
 * Save user submission to the database
 * 
 * @param submission - User submission data
 * @returns Promise<boolean> - Success status
 */
export async function saveSubmissionToDatabase(submission: UserSubmission): Promise<boolean> {
  try {
    
    // Security: Input validation and sanitization
    if (!submission || typeof submission !== 'object') {
      // Invalid submission data
      return false;
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!submission.email || !emailRegex.test(submission.email)) {
      // Invalid email format
      return false;
    }

    // Validate score range
    if (typeof submission.score !== 'number' || submission.score < 0 || submission.score > 100) {
      // Invalid score value
      return false;
    }

    // Validate band
    const validBands = ['Explorer', 'Experimenter', 'Accelerator'];
    if (!submission.band || !validBands.includes(submission.band)) {
      // Invalid band value
      return false;
    }

    // Sanitize email
    const sanitizedSubmission = {
      ...submission,
      email: submission.email.trim().toLowerCase()
    };
    
    // Convert to database format
    const dbSubmission = convertToDatabaseFormat(sanitizedSubmission)
    
    // Insert into database
    const { data, error } = await supabase
      .from(AUDIT_SUBMISSIONS_TABLE)
      .insert([dbSubmission])
      .select()
    
    if (error) {
      // Database error
      return false
    }
    
    return true
    
  } catch (error) {
    // Error saving to database
    return false
  }
}

