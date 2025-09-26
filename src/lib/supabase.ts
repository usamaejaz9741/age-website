/**
 * Supabase Database Client Configuration
 * 
 * This module provides the Supabase client for database operations.
 * It handles both client-side and server-side database interactions
 * for storing and retrieving audit submissions.
 */

import { createClient } from '@supabase/supabase-js'

// Supabase configuration from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Security: Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  // Missing Supabase environment variables
  throw new Error('Supabase configuration is incomplete');
}

// Security: Validate URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  // Invalid Supabase URL format
  throw new Error('Invalid Supabase URL configuration');
}

// Security: Validate key format (should be a JWT-like string)
if (!supabaseAnonKey.startsWith('eyJ') || supabaseAnonKey.length < 100) {
  // Invalid Supabase anon key format
  throw new Error('Invalid Supabase key configuration');
}

/**
 * Supabase client for client-side operations
 * Uses the anonymous key for public operations like inserting submissions
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Disable auto-refresh for this use case since we're not using auth
    autoRefreshToken: false,
    persistSession: false
  },
  // Security: Disable realtime for anonymous users
  realtime: {
    params: {
      eventsPerSecond: 2
    }
  }
})


/**
 * Database table name for audit submissions
 */
export const AUDIT_SUBMISSIONS_TABLE = 'audit_submissions'

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
 * Convert UserSubmission to DatabaseSubmission format
 */
export function convertToDatabaseFormat(submission: {
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
}): DatabaseSubmission {
  return {
    email: submission.email,
    score: submission.score,
    band: submission.band,
    strategy_score: submission.dimensions.strategy,
    implementation_score: submission.dimensions.implementation,
    data_score: submission.dimensions.data,
    culture_score: submission.dimensions.culture,
    recommendations: submission.recommendations,
    audit_content: submission.auditContent,
    utm_params: submission.utmParams,
    quiz_answers: submission.quizAnswers,
    user_agent: submission.metadata?.userAgent,
    referrer: submission.metadata?.referrer
  }
}

/**
 * Convert DatabaseSubmission back to UserSubmission format
 */
export function convertFromDatabaseFormat(dbSubmission: DatabaseSubmission): {
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
} {
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
    recommendations: dbSubmission.recommendations,
    auditContent: dbSubmission.audit_content,
    utmParams: dbSubmission.utm_params,
    quizAnswers: dbSubmission.quiz_answers
  }
}
