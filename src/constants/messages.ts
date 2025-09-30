/**
 * @fileoverview User-Facing Messages - Error and Success Messages
 * 
 * Centralized user-facing messages for consistency and easier i18n in the future.
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

/**
 * Error messages for user feedback
 */
export const ERROR_MESSAGES = {
  /** Generic error message */
  GENERIC: 'An unexpected error occurred. Please try again.',
  /** AI service unavailable */
  AI_UNAVAILABLE: 'AI Service Temporarily Unavailable',
  AI_UNAVAILABLE_DESCRIPTION: "We're using pre-generated recommendations. The AI service will be back online shortly.",
  /** Email validation */
  INVALID_EMAIL: 'Please enter a valid email address',
  /** Rate limiting */
  RATE_LIMIT: 'Too many submissions. Please wait before trying again.',
  /** Form validation */
  FORM_REQUIRED: 'This field is required',
  /** Network error */
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  /** Data save error */
  SAVE_ERROR: 'Error saving your data. Please try again.',
} as const;

/**
 * Success messages for user feedback
 */
export const SUCCESS_MESSAGES = {
  /** Data saved successfully */
  SAVE_SUCCESS: 'Your assessment results have been saved successfully.',
  /** Email sent */
  EMAIL_SENT: 'Email sent successfully.',
  /** Form submitted */
  FORM_SUBMITTED: 'Thank you for your submission.',
} as const;

/**
 * Loading messages for user feedback
 */
export const LOADING_MESSAGES = {
  /** Generic loading */
  LOADING: 'Loading...',
  /** Generating audit */
  GENERATING_AUDIT: 'Generating your AI audit...',
  /** Generating recommendations */
  GENERATING_RECOMMENDATIONS: 'Generating personalized recommendations...',
  /** Saving data */
  SAVING: 'Saving your results...',
} as const;

/**
 * Informational messages
 */
export const INFO_MESSAGES = {
  /** No data available */
  NO_DATA: 'No data available.',
  /** 404 page */
  PAGE_NOT_FOUND: 'Page not found',
  PAGE_NOT_FOUND_DESCRIPTION: "The page you're looking for doesn't exist.",
} as const;
