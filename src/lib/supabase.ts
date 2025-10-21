/**
 * Supabase Database Client Configuration
 * 
 * This module provides the Supabase client for database operations.
 * It handles both client-side and server-side database interactions
 * for storing and retrieving audit submissions.
 */

import { createClient } from '@supabase/supabase-js'

/**
 * Database table name for audit submissions
 */
export const AUDIT_SUBMISSIONS_TABLE = 'audit_submissions'

/**
 * Supabase client for client-side operations
 * Uses environment variables or falls back to placeholder values
 */
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co',
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

/**
 * Type definitions for database operations
 */
export interface DatabaseSubmission {
  id?: string
  created_at?: string
  updated_at?: string
  email: string
  score: number
  band: string
  strategy_score: number
  implementation_score: number
  data_score: number
  culture_score: number
  recommendations: string[]
  audit_content?: string
  utm_params?: Record<string, string | number | boolean>
  quiz_answers?: Record<string, number>
  user_agent?: string
  referrer?: string
  ip_address?: string
}

/**
 * Input type for database conversion (matches UserSubmission structure)
 */
export interface ConversionInput {
  email: string;
  score: number;
  band: string;
  dimensions: {
    strategy: number;
    implementation: number;
    data: number;
    culture: number;
  };
  recommendations: string[];
  auditContent?: string;
  utmParams?: Record<string, string | number | boolean>;
  quizAnswers?: Record<string, number>;
  metadata?: {
    userAgent?: string;
    referrer?: string;
  };
}

/**
 * Convert UserSubmission to DatabaseSubmission format
 * 
 * @param submission - User submission data to convert
 * @returns DatabaseSubmission object ready for database insertion
 */
export function convertToDatabaseFormat(submission: ConversionInput): DatabaseSubmission {
  // Validate dimensions are all numbers
  const dimensions = submission.dimensions;
  if (typeof dimensions.strategy !== 'number' || 
      typeof dimensions.implementation !== 'number' ||
      typeof dimensions.data !== 'number' ||
      typeof dimensions.culture !== 'number') {
    throw new Error('Invalid dimension scores: all must be numbers');
  }

  // Validate score range
  if (submission.score < 0 || submission.score > 100) {
    throw new Error('Invalid score: must be between 0 and 100');
  }

  return {
    email: submission.email.trim().toLowerCase(),
    score: Math.round(submission.score),
    band: submission.band,
    strategy_score: Math.round(dimensions.strategy),
    implementation_score: Math.round(dimensions.implementation),
    data_score: Math.round(dimensions.data),
    culture_score: Math.round(dimensions.culture),
    recommendations: submission.recommendations,
    audit_content: submission.auditContent,
    utm_params: submission.utmParams,
    quiz_answers: submission.quizAnswers,
    user_agent: submission.metadata?.userAgent,
    referrer: submission.metadata?.referrer
  }
}

/**
 * Output type for database conversion
 */
export interface ConversionOutput {
  timestamp: string | undefined;
  email: string;
  score: number;
  band: string;
  dimensions: {
    strategy: number;
    implementation: number;
    data: number;
    culture: number;
  };
  recommendations: string[];
  auditContent?: string;
  utmParams?: Record<string, string | number | boolean>;
  quizAnswers?: Record<string, number>;
}

/**
 * Convert DatabaseSubmission back to UserSubmission format
 * 
 * @param dbSubmission - Database submission to convert
 * @returns ConversionOutput object with UserSubmission structure
 */
export function convertFromDatabaseFormat(dbSubmission: DatabaseSubmission): ConversionOutput {
  // Validate required fields exist
  if (!dbSubmission.email || !dbSubmission.band) {
    throw new Error('Invalid database submission: missing required fields');
  }

  return {
    timestamp: dbSubmission.created_at,
    email: dbSubmission.email,
    score: dbSubmission.score,
    band: dbSubmission.band,
    dimensions: {
      strategy: dbSubmission.strategy_score,
      implementation: dbSubmission.implementation_score,
      data: dbSubmission.data_score,
      culture: dbSubmission.culture_score
    },
    recommendations: dbSubmission.recommendations || [],
    auditContent: dbSubmission.audit_content,
    utmParams: dbSubmission.utm_params,
    quizAnswers: dbSubmission.quiz_answers
  }
}
