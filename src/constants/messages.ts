/**
 * @fileoverview User-Facing Messages - Error and Success Messages
 * 
 * This file centralizes all user-facing strings for the application.
 * Using a single source for messages ensures consistency in language and tone,
 * and simplifies future internationalization (i18n) efforts.
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

/**
 * A frozen object containing standardized error messages for user feedback.
 * These messages are used in UI components to inform users of errors in a
 * clear and consistent manner.
 *
 * @const {object} ERROR_MESSAGES
 * @property {string} GENERIC - A fallback error message for unexpected issues.
 * @property {string} AI_UNAVAILABLE - Title for when the AI service is down.
 * @property {string} AI_UNAVAILABLE_DESCRIPTION - A more detailed explanation for AI service unavailability.
 * @property {string} INVALID_EMAIL - Error message for invalid email format.
 * @property {string} RATE_LIMIT - Message shown when a user exceeds submission limits.
 * @property {string} FORM_REQUIRED - Message for a required field that was left empty.
 * @property {string} NETWORK_ERROR - Message for network-related issues.
 * @property {string} SAVE_ERROR - Message for when data fails to save.
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
 * A frozen object containing standardized success messages for user feedback.
 * These messages confirm that a user's action has been completed successfully.
 *
 * @const {object} SUCCESS_MESSAGES
 * @property {string} SAVE_SUCCESS - Confirmation that user data has been saved.
 * @property {string} EMAIL_SENT - Confirmation that an email has been sent.
 * @property {string} FORM_SUBMITTED - A generic confirmation for form submissions.
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
 * A frozen object containing standardized loading messages.
 * These messages inform the user that a process is ongoing in the background.
 *
 * @const {object} LOADING_MESSAGES
 * @property {string} LOADING - A generic loading message.
 * @property {string} GENERATING_AUDIT - Message shown while the AI audit is being generated.
 * @property {string} GENERATING_RECOMMENDATIONS - Message shown while personalized recommendations are being generated.
 * @property {string} SAVING - Message shown while user data is being saved.
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
 * A frozen object containing standardized informational messages.
 * These messages provide neutral information to the user, such as in empty states or on info pages.
 *
 * @const {object} INFO_MESSAGES
 * @property {string} NO_DATA - Message for when no data is available to display.
 * @property {string} PAGE_NOT_FOUND - Title for the 404 page.
 * @property {string} PAGE_NOT_FOUND_DESCRIPTION - Description for the 404 page.
 */
export const INFO_MESSAGES = {
  /** No data available */
  NO_DATA: 'No data available.',
  /** 404 page */
  PAGE_NOT_FOUND: 'Page not found',
  PAGE_NOT_FOUND_DESCRIPTION: "The page you're looking for doesn't exist.",
} as const;