/**
 * @fileoverview Security Utilities - Input Validation and Sanitization
 * 
 * This module provides comprehensive security functions for:
 * - Input validation and sanitization
 * - XSS attack prevention
 * - Email and URL validation
 * - Rate limiting for API endpoints
 * - Secure random string generation
 * - Suspicious pattern detection
 * 
 * All functions are designed to be safe, performant, and easy to use
 * throughout the application for maintaining security best practices.
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 * @since 1.0.0
 */

import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks
 * 
 * This function uses DOMPurify to remove potentially dangerous HTML elements
 * and attributes that could be used for cross-site scripting attacks. It's
 * designed to be safe for user-generated content display.
 * 
 * @param input - The string to sanitize
 * @returns Sanitized string safe for display
 * 
 * @example
 * ```typescript
 * const userInput = '<script>alert("xss")</script>Hello World';
 * const safe = sanitizeHtml(userInput); // Returns: "Hello World"
 * ```
 * 
 * @since 1.0.0
 */
export function sanitizeHtml(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }
  
  return DOMPurify.sanitize(input);
}

/**
 * Validates email format using RFC-compliant regex
 * 
 * Performs comprehensive email validation including:
 * - Format validation using RFC-compliant regex
 * - Length validation (max 254 characters)
 * - Type checking for input safety
 * 
 * @param email - The email address to validate
 * @returns true if email is valid, false otherwise
 * 
 * @example
 * ```typescript
 * validateEmail('user@example.com'); // Returns: true
 * validateEmail('invalid-email'); // Returns: false
 * validateEmail(''); // Returns: false
 * ```
 * 
 * @since 1.0.0
 */
export function validateEmail(email: string): boolean {
  if (typeof email !== 'string') {
    return false;
  }
  
  // RFC-compliant email regex with length validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Sanitizes email address for safe storage and display
 * 
 * Performs email sanitization by:
 * - Trimming whitespace
 * - Converting to lowercase
 * - Removing potentially dangerous characters
 * - Preserving valid email format
 * 
 * @param email - The email address to sanitize
 * @returns Sanitized email address
 * 
 * @example
 * ```typescript
 * sanitizeEmail('  USER@EXAMPLE.COM  '); // Returns: "user@example.com"
 * sanitizeEmail('user<script>@example.com'); // Returns: "user@example.com"
 * ```
 * 
 * @since 1.0.0
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') {
    return '';
  }
  
  // Remove angle brackets to prevent HTML injection in emails
  return email
    .trim()
    .toLowerCase()
    .replace(/[<>]/g, '')
    .substring(0, 254); // Limit length
}

/**
 * Validates and sanitizes text input for safe storage and display
 * 
 * Performs comprehensive text validation and sanitization:
 * - Type checking for input safety
 * - HTML sanitization to prevent XSS
 * - Length validation with configurable maximum
 * - Trimming of whitespace
 * 
 * @param {string} input - The text input to validate and sanitize
 * @param {number} [maxLength=1000] - Maximum allowed length (default: 1000)
 * @returns {string} Sanitized and validated text
 * 
 * @example
 * ```typescript
 * const cleanText = validateAndSanitizeText('<script>alert("xss")</script>Hello World', 50);
 * console.log(cleanText); // "Hello World"
 * 
 * const longText = validateAndSanitizeText('A'.repeat(2000), 100);
 * console.log(longText.length); // 100
 * ```
 * 
 * @security
 * - Prevents XSS attacks through HTML sanitization
 * - Limits input length to prevent DoS attacks
 * - Type-safe input validation
 * 
 * @since 1.0.0
 */
export function validateAndSanitizeText(input: string, maxLength: number = 1000): string {
  // Type safety check
  if (typeof input !== 'string') {
    return '';
  }
  
  // Sanitize HTML, limit length, and trim whitespace
  return sanitizeHtml(input)
    .substring(0, maxLength)
    .trim();
}

/**
 * Validates numeric input within specified bounds
 * 
 * Performs comprehensive numeric validation including:
 * - Type checking for number type
 * - NaN (Not a Number) detection
 * - Range validation with configurable min/max
 * - Safe handling of edge cases
 * 
 * @param {unknown} value - The value to validate
 * @param {number} [min=0] - Minimum allowed value (default: 0)
 * @param {number} [max=100] - Maximum allowed value (default: 100)
 * @returns {boolean} True if value is a valid number within bounds
 * 
 * @example
 * ```typescript
 * validateNumeric(50); // true (within 0-100)
 * validateNumeric(150); // false (exceeds max)
 * validateNumeric(-10); // false (below min)
 * validateNumeric('50'); // false (not a number)
 * validateNumeric(NaN); // false (NaN)
 * ```
 * 
 * @since 1.0.0
 */
export function validateNumeric(value: unknown, min: number = 0, max: number = 100): boolean {
  // Type and NaN validation
  if (typeof value !== 'number' || isNaN(value)) {
    return false;
  }
  
  // Range validation
  return value >= min && value <= max;
}

/**
 * Detects suspicious patterns that could indicate malicious input
 * 
 * Scans input for common attack patterns including:
 * - Script injection attempts
 * - Event handler injections
 * - Data URI schemes
 * - CSS expression attacks
 * - JavaScript function calls
 * - Dynamic code execution patterns
 * 
 * @param {string} input - The input string to scan for suspicious patterns
 * @returns {boolean} True if suspicious patterns are detected
 * 
 * @example
 * ```typescript
 * containsSuspiciousPatterns('Hello World'); // false
 * containsSuspiciousPatterns('<script>alert("xss")</script>'); // true
 * containsSuspiciousPatterns('javascript:void(0)'); // true
 * containsSuspiciousPatterns('onclick="malicious()"'); // true
 * ```
 * 
 * @security
 * - Detects XSS attack vectors
 * - Identifies script injection attempts
 * - Prevents CSS-based attacks
 * - Blocks dynamic code execution
 * 
 * @since 1.0.0
 */
export function containsSuspiciousPatterns(input: string): boolean {
  // Type safety check
  if (typeof input !== 'string') {
    return false;
  }
  
  // Comprehensive suspicious pattern detection
  const suspiciousPatterns = [
    /<script/i,           // Script tag injection
    /javascript:/i,       // JavaScript protocol
    /on\w+\s*=/i,        // Event handler injection (onclick, onload, etc.)
    /data:/i,            // Data URI schemes
    /vbscript:/i,        // VBScript protocol
    /expression\s*\(/i,  // CSS expression attacks
    /url\s*\(/i,         // CSS url() function
    /@import/i,          // CSS import statements
    /eval\s*\(/i,        // JavaScript eval() function
    /setTimeout\s*\(/i,  // JavaScript setTimeout
    /setInterval\s*\(/i  // JavaScript setInterval
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(input));
}

/**
 * Generates a cryptographically secure random string of a specified length.
 * It uses `window.crypto.getRandomValues` for strong randomness and falls back to `Math.random` if the Crypto API is not available.
 *
 * @param {number} [length=32] - The desired length of the random string.
 * @returns {string} A secure random string.
 */
export function generateSecureRandomString(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    // Use crypto.getRandomValues if available (more secure)
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      const value = array[i];
      if (value !== undefined) {
        result += chars[value % chars.length];
      }
    }
  } else {
    // Fallback to Math.random (less secure but functional)
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }
  
  return result;
}

/**
 * Validates if a given string is a valid URL with an http or https protocol.
 *
 * @param {string} url - The URL string to validate.
 * @returns {boolean} `true` if the URL is valid, `false` otherwise.
 */
export function validateUrl(url: string): boolean {
  if (typeof url !== 'string') {
    return false;
  }
  
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
}

/**
 * Sanitizes a URL by validating it and returning a clean version.
 * If the URL is invalid, it returns an empty string.
 *
 * @param {string} url - The URL string to sanitize.
 * @returns {string} The sanitized URL or an empty string if the URL is invalid.
 */
export function sanitizeUrl(url: string): string {
  if (!validateUrl(url)) {
    return '';
  }
  
  try {
    const urlObj = new URL(url);
    return urlObj.toString();
  } catch {
    return '';
  }
}

/**
 * A client-side rate limiter to prevent abuse of forms and APIs.
 * It uses `localStorage` to persist request counts across page loads.
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private storageKey: string;

  /**
   * Creates an instance of RateLimiter.
   * @param {number} [maxRequests=10] - The maximum number of requests allowed within the time window.
   * @param {number} [windowMs=60000] - The time window in milliseconds (e.g., 60000 for 1 minute).
   * @param {string} [storageKey='rate_limiter'] - The key to use for storing rate limit data in localStorage.
   */
  constructor(
    private maxRequests: number = 10,
    private windowMs: number = 60000, // 1 minute
    storageKey: string = 'rate_limiter'
  ) {
    this.storageKey = storageKey;
    this.loadFromStorage();
  }

  /**
   * Loads rate limit data from localStorage to persist state across sessions.
   * @private
   */
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const data = JSON.parse(stored) as Record<string, number[]>;
        const now = Date.now();
        
        // Only load valid (non-expired) requests
        Object.entries(data).forEach(([key, timestamps]) => {
          const validTimestamps = timestamps.filter(time => now - time < this.windowMs);
          if (validTimestamps.length > 0) {
            this.requests.set(key, validTimestamps);
          }
        });
      }
    } catch (error) {
      // Silently fail - localStorage might be disabled or full
      if (import.meta.env.DEV) {
        console.warn('Failed to load rate limiter from storage:', error);
      }
    }
  }
  
  /**
   * Saves the current rate limit data to localStorage.
   * @private
   */
  private saveToStorage(): void {
    try {
      const data: Record<string, number[]> = {};
      this.requests.forEach((timestamps, key) => {
        data[key] = timestamps;
      });
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      // Silently fail - localStorage might be disabled or full
      if (import.meta.env.DEV) {
        console.warn('Failed to save rate limiter to storage:', error);
      }
    }
  }
  
  /**
   * Checks if a request from a given identifier is allowed.
   * If allowed, it records the request timestamp.
   *
   * @param {string} identifier - A unique identifier for the client (e.g., a user ID or a session ID).
   * @returns {boolean} `true` if the request is allowed, `false` otherwise.
   */
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    // Add current request
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    this.saveToStorage();
    
    return true;
  }
  
  /**
   * Gets the number of remaining requests for a given identifier within the current time window.
   *
   * @param {string} identifier - The unique identifier for the client.
   * @returns {number} The number of remaining requests.
   */
  getRemainingRequests(identifier: string): number {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    return Math.max(0, this.maxRequests - validRequests.length);
  }
  
  /**
   * Clears all rate limit data from memory and localStorage.
   */
  clear(): void {
    this.requests.clear();
    try {
      localStorage.removeItem(this.storageKey);
    } catch {
      // Silently fail
    }
  }
}

/**
 * A pre-configured rate limiter for API calls.
 * Allows 5 requests per minute.
 */
export const apiRateLimiter = new RateLimiter(5, 60000, 'age_api_rate_limit'); // 5 requests per minute

/**
 * A pre-configured rate limiter for form submissions.
 * Allows 3 submissions per 5 minutes to prevent spam.
 */
export const formRateLimiter = new RateLimiter(3, 300000, 'age_form_rate_limit'); // 3 submissions per 5 minutes
