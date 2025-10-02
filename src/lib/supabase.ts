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
  console.error('Invalid Supabase URL configuration:', error);
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
  },
  // Connection pooling and performance optimizations
  global: {
    headers: {
      'Connection': 'keep-alive',
      'Keep-Alive': 'timeout=5, max=1000'
    }
  },
  // Database connection settings
  db: {
    schema: 'public'
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
