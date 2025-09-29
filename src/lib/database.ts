/**
 * @fileoverview Database Operations for Audit Submissions
 * 
 * Provides secure database operations for saving and retrieving audit submissions
 * from Supabase. Includes comprehensive validation, error handling, and fallback
 * mechanisms for robust data persistence.
 * 
 * @module database
 * @author Alvi Global Enterprises
 * @version 1.0.0
 * 
 * @features
 * - 🔒 Secure data validation and sanitization
 * - 🛡️ Environment variable validation
 * - 📊 Comprehensive error handling with specific error messages
 * - 🔄 Graceful fallback to localStorage when database unavailable
 * - 🎯 Type-safe operations with TypeScript
 * - 📝 Detailed logging for development debugging
 */

import { supabase, AUDIT_SUBMISSIONS_TABLE, convertToDatabaseFormat } from './supabase'
import type { UserSubmission } from './storage'

/**
 * Save user submission to the database with comprehensive validation
 * 
 * Validates environment configuration, sanitizes input data, and securely
 * persists user submissions to Supabase with detailed error handling.
 * 
 * @param submission - User submission data containing assessment results and metadata
 * @returns Promise<boolean> - Success status of the database operation
 * 
 * @throws {Error} When environment variables are not configured
 * @throws {Error} When input validation fails
 * @throws {Error} When database operation fails (logged securely)
 * 
 * @example
 * ```typescript
 * const success = await saveSubmissionToDatabase({
 *   email: 'user@example.com',
 *   score: 75,
 *   band: 'Accelerator',
 *   dimensions: { strategy: 80, implementation: 70, data: 75, culture: 80 },
 *   recommendations: ['Develop AI strategy', 'Improve data governance']
 * });
 * ```
 */
export async function saveSubmissionToDatabase(submission: UserSubmission): Promise<boolean> {
  try {
    // Check if Supabase is properly configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      if (import.meta.env.DEV) {
        console.warn('Supabase not configured - skipping database save. Set up VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local');
      }
      return false;
    }
    
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
    const { error } = await supabase
      .from(AUDIT_SUBMISSIONS_TABLE)
      .insert([dbSubmission])
      .select()
    
    if (error) {
      // Log error securely without exposing sensitive information
      if (import.meta.env.DEV) {
        if (error.message.includes('row-level security policy')) {
          console.error('Database RLS policy violation. You need to run the database setup scripts in Supabase SQL Editor.');
          console.error('Required scripts: 1) Your audit submissions table SQL, 2) Your RLS policy reset SQL, 3) database-views-security-fix.sql');
        } else if (error.message.includes('401') || error.message.includes('Unauthorized')) {
          console.error('Database authentication failed. Your environment variables are set, but the database may not be properly configured.');
          console.error('Please run the database setup scripts in your Supabase SQL Editor.');
        } else {
          console.error('Database error:', error.message);
        }
      }
      return false
    }
    
    return true
    
  } catch (error) {
    // Log error securely without exposing sensitive information
    if (import.meta.env.DEV) {
      console.error('Error saving to database:', error instanceof Error ? error.message : 'Unknown error');
    }
    return false
  }
}

