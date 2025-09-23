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
    console.log('=== SAVING TO DATABASE ===')
    console.log('Email:', submission.email)
    console.log('Score:', submission.score)
    console.log('Band:', submission.band)
    
    // Convert to database format
    const dbSubmission = convertToDatabaseFormat(submission)
    
    // Insert into database
    const { data, error } = await supabase
      .from(AUDIT_SUBMISSIONS_TABLE)
      .insert([dbSubmission])
      .select()
    
    if (error) {
      console.error('Database error:', error)
      return false
    }
    
    console.log('Successfully saved to database:', data)
    return true
    
  } catch (error) {
    console.error('Error saving to database:', error)
    return false
  }
}

