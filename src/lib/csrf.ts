/**
 * CSRF Protection Utilities
 * 
 * This module provides CSRF (Cross-Site Request Forgery) protection
 * for form submissions and API calls.
 */

/**
 * Generate a CSRF token
 * @returns CSRF token string
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(array);
  } else {
    // Fallback for environments without crypto
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Store CSRF token in session storage
 * @param token - CSRF token to store
 */
export function storeCSRFToken(token: string): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('csrf_token', token);
  }
}

/**
 * Retrieve CSRF token from session storage
 * @returns CSRF token or null if not found
 */
export function getCSRFToken(): string | null {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('csrf_token');
  }
  return null;
}

/**
 * Validate CSRF token
 * @param token - Token to validate
 * @returns boolean - Whether token is valid
 */
export function validateCSRFToken(token: string): boolean {
  const storedToken = getCSRFToken();
  return storedToken !== null && storedToken === token;
}

/**
 * Initialize CSRF protection
 * @returns CSRF token
 */
export function initializeCSRF(): string {
  const token = generateCSRFToken();
  storeCSRFToken(token);
  return token;
}

/**
 * Get CSRF token for form submission
 * @returns CSRF token
 */
export function getCSRFTokenForSubmission(): string {
  let token = getCSRFToken();
  if (!token) {
    token = initializeCSRF();
  }
  return token;
}





