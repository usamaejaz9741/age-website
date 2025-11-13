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
 * Placeholder values for Supabase configuration
 */
const PLACEHOLDER_URL = 'https://placeholder.supabase.co'
const PLACEHOLDER_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder'

/**
 * Check if Supabase is properly configured with valid credentials
 * 
 * @returns true if valid Supabase URL and key are provided, false otherwise
 */
export function isSupabaseConfigured(): boolean {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  
  // Check if both values exist and are not placeholder values
  return !!(
    url && 
    key && 
    url !== PLACEHOLDER_URL && 
    key !== PLACEHOLDER_KEY &&
    url.trim() !== '' &&
    key.trim() !== ''
  )
}

/**
 * Validate and retrieve Supabase configuration
 * Logs warnings in development mode if configuration is missing or invalid
 * 
 * @returns Object containing URL and key (may be placeholders with warnings)
 */
function getSupabaseConfig(): { url: string; key: string } {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  const isDevelopment = import.meta.env.DEV

  // Check if credentials are missing
  if (!url || !key || url.trim() === '' || key.trim() === '') {
    if (isDevelopment) {
      console.warn(
        '⚠️ Supabase Configuration Missing\n\n' +
        'Required environment variables are not set:\n' +
        (!url || url.trim() === '' ? '  - VITE_SUPABASE_URL\n' : '') +
        (!key || key.trim() === '' ? '  - VITE_SUPABASE_ANON_KEY\n' : '') +
        '\nTo fix this:\n' +
        '1. Copy env.template to .env\n' +
        '2. Add your Supabase project credentials\n' +
        '3. Restart the development server\n\n' +
        'Database operations will fail until configured.'
      )
    }
    return { url: PLACEHOLDER_URL, key: PLACEHOLDER_KEY }
  }

  // Check if using placeholder values
  if (url === PLACEHOLDER_URL || key === PLACEHOLDER_KEY) {
    if (isDevelopment) {
      console.warn(
        '⚠️ Supabase Placeholder Values Detected\n\n' +
        'You are using placeholder credentials. Database operations will not work.\n' +
        'Please update your .env file with real Supabase credentials.'
      )
    }
    return { url: PLACEHOLDER_URL, key: PLACEHOLDER_KEY }
  }

  // Validate URL format
  try {
    const urlObj = new URL(url)
    if (!urlObj.hostname.includes('supabase')) {
      if (isDevelopment) {
        console.warn(
          '⚠️ Supabase URL Format Warning\n\n' +
          `The provided URL "${url}" doesn't appear to be a Supabase URL.\n` +
          'Expected format: https://your-project.supabase.co'
        )
      }
    }
  } catch {
    if (isDevelopment) {
      console.error(
        '❌ Invalid Supabase URL\n\n' +
        `The provided URL "${url}" is not a valid URL.\n` +
        'Expected format: https://your-project.supabase.co'
      )
    }
    return { url: PLACEHOLDER_URL, key: PLACEHOLDER_KEY }
  }

  // Configuration is valid
  return { url, key }
}

/**
 * Supabase client for client-side operations
 * Uses environment variables or falls back to placeholder values with warnings
 */
const config = getSupabaseConfig()
export const supabase = createClient(
  config.url,
  config.key,
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
