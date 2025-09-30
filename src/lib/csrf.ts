/**
 * @fileoverview CSRF Protection Utilities - Cross-Site Request Forgery Prevention
 * 
 * This module provides comprehensive CSRF (Cross-Site Request Forgery) protection
 * for form submissions and API calls. It includes:
 * - Secure token generation using crypto.getRandomValues()
 * - Session-based token storage and retrieval
 * - Token validation and verification
 * - Automatic token initialization
 * - Fallback support for environments without crypto API
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 * @since 1.0.0
 * 
 * @security
 * - Uses cryptographically secure random number generation
 * - Tokens are 64 characters (32 bytes) in length
 * - Tokens are stored in sessionStorage (cleared on tab close)
 * - Includes fallback for environments without crypto API
 */

/**
 * Generates a cryptographically secure CSRF token
 * 
 * Creates a 64-character hexadecimal token using 32 bytes of random data.
 * Uses the Web Crypto API when available, with a fallback to Math.random()
 * for environments without crypto support.
 * 
 * @returns {string} A 64-character hexadecimal CSRF token
 * 
 * @example
 * ```typescript
 * const token = generateCSRFToken();
 * console.log(token); // "a1b2c3d4e5f6..."
 * ```
 * 
 * @security
 * - Uses crypto.getRandomValues() for cryptographically secure randomness
 * - Generates 32 bytes (256 bits) of entropy
 * - Fallback to Math.random() for compatibility
 * 
 * @since 1.0.0
 */
export function generateCSRFToken(): string {
  // Create array for 32 bytes of random data
  const array = new Uint8Array(32);
  
  // Use Web Crypto API if available (preferred method)
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(array);
  } else {
    // Fallback for environments without crypto API (e.g., SSR, older browsers)
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  
  // Convert bytes to hexadecimal string with zero-padding
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Stores a CSRF token in session storage
 * 
 * Saves the provided token to the browser's sessionStorage, which persists
 * for the duration of the browser tab session. The token is automatically
 * cleared when the tab is closed.
 * 
 * @param {string} token - The CSRF token to store
 * 
 * @example
 * ```typescript
 * const token = generateCSRFToken();
 * storeCSRFToken(token);
 * ```
 * 
 * @security
 * - Uses sessionStorage (cleared on tab close)
 * - Only available in browser environments
 * - Token is not sent to server automatically
 * 
 * @since 1.0.0
 */
export function storeCSRFToken(token: string): void {
  // Only store in browser environments
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('csrf_token', token);
  }
}

/**
 * Retrieves the stored CSRF token from session storage
 * 
 * Gets the previously stored CSRF token from sessionStorage. Returns null
 * if no token is found or if running in a non-browser environment.
 * 
 * @returns {string | null} The stored CSRF token or null if not found
 * 
 * @example
 * ```typescript
 * const token = getCSRFToken();
 * if (token) {
 *   // Use token for form submission
 *   formData.append('csrf_token', token);
 * }
 * ```
 * 
 * @since 1.0.0
 */
export function getCSRFToken(): string | null {
  // Only retrieve in browser environments
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('csrf_token');
  }
  return null;
}

/**
 * Validates a CSRF token against the stored token
 * 
 * Compares the provided token with the token stored in sessionStorage.
 * Returns true only if both tokens exist and match exactly.
 * 
 * @param {string} token - The CSRF token to validate
 * @returns {boolean} True if the token is valid, false otherwise
 * 
 * @example
 * ```typescript
 * const isValid = validateCSRFToken(submittedToken);
 * if (!isValid) {
 *   throw new Error('Invalid CSRF token');
 * }
 * ```
 * 
 * @security
 * - Performs exact string comparison
 * - Returns false if no stored token exists
 * - Case-sensitive validation
 * 
 * @since 1.0.0
 */
export function validateCSRFToken(token: string): boolean {
  const storedToken = getCSRFToken();
  return storedToken !== null && storedToken === token;
}

/**
 * Initializes CSRF protection by generating and storing a new token
 * 
 * Creates a new CSRF token, stores it in sessionStorage, and returns it.
 * This should be called once per session to establish CSRF protection.
 * 
 * @returns {string} The newly generated and stored CSRF token
 * 
 * @example
 * ```typescript
 * // Initialize CSRF protection on app startup
 * const token = initializeCSRF();
 * console.log('CSRF protection initialized');
 * ```
 * 
 * @security
 * - Generates a new token each time it's called
 * - Automatically stores the token in sessionStorage
 * - Should be called once per session
 * 
 * @since 1.0.0
 */
export function initializeCSRF(): string {
  const token = generateCSRFToken();
  storeCSRFToken(token);
  return token;
}

/**
 * Gets a CSRF token for form submission, initializing if necessary
 * 
 * Retrieves the stored CSRF token, or generates and stores a new one
 * if no token exists. This is the recommended method for getting tokens
 * for form submissions as it ensures a token is always available.
 * 
 * @returns {string} A valid CSRF token for form submission
 * 
 * @example
 * ```typescript
 * // Get token for form submission
 * const token = getCSRFTokenForSubmission();
 * formData.append('csrf_token', token);
 * ```
 * 
 * @security
 * - Ensures a token is always available
 * - Automatically initializes CSRF protection if needed
 * - Returns the same token for the session
 * 
 * @since 1.0.0
 */
export function getCSRFTokenForSubmission(): string {
  let token = getCSRFToken();
  if (!token) {
    // Initialize CSRF protection if no token exists
    token = initializeCSRF();
  }
  return token;
}





