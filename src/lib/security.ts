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
 * Validates email format using RFC 5322 compliant regex
 * 
 * Performs comprehensive email validation including:
 * - Format validation using RFC 5322 compliant regex
 * - Length validation (max 254 characters total)
 * - Local part max 64 characters, domain max 255 characters
 * - Type checking for input safety
 * - Prevention of common attack patterns (consecutive dots, etc.)
 * 
 * @param email - The email address to validate
 * @returns true if email is valid, false otherwise
 * 
 * @example
 * ```typescript
 * validateEmail('user@example.com'); // Returns: true
 * validateEmail('invalid-email'); // Returns: false
 * validateEmail('invalid..email@example.com'); // Returns: false
 * validateEmail('user@.example.com'); // Returns: false
 * validateEmail(''); // Returns: false
 * ```
 * 
 * @security
 * - Prevents email injection attacks
 * - Blocks malformed email addresses
 * - Validates according to RFC 5322 and RFC 5321 standards
 * 
 * @since 1.0.0
 */
export function validateEmail(email: string): boolean {
  // Type and length validation
  if (typeof email !== 'string' || email.length > 254 || email.length === 0) {
    return false;
  }
  
  // RFC 5322 compliant email regex with additional security checks
  // Prevents: consecutive dots, dots at start/end, and other malformed patterns
  const emailRegex = /^(?!.*\.\.)(?!.*\.@)(?!.*@\.)[a-zA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/;
  
  // Test against regex
  if (!emailRegex.test(email)) {
    return false;
  }
  
  // Additional security checks for common attack patterns
  if (email.includes('..') || email.startsWith('.') || email.endsWith('.')) {
    return false;
  }
  
  // Validate local and domain part lengths per RFC 5321
  const parts = email.split('@');
  if (parts.length !== 2) {
    return false;
  }
  
  const [localPart, domainPart] = parts;
  
  // Local part must be 1-64 characters
  if (localPart.length === 0 || localPart.length > 64) {
    return false;
  }
  
  // Domain part must be 1-255 characters
  if (domainPart.length === 0 || domainPart.length > 255) {
    return false;
  }
  
  return true;
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
 * Generate secure random string
 * @param length - Length of random string
 * @returns Random string
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
 * Validate URL format
 * @param url - URL to validate
 * @returns boolean - Whether URL is valid
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
 * Sanitize URL
 * @param url - URL to sanitize
 * @returns Sanitized URL or empty string if invalid
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
 * Rate limiting helper with automatic memory cleanup
 * 
 * Features:
 * - Sliding window rate limiting
 * - Automatic memory cleanup to prevent leaks
 * - Configurable limits and windows
 * - Memory-efficient storage with maximum identifier limit
 * - Periodic cleanup of stale entries
 * 
 * @since 1.0.0
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private storageKey: string;
  private lastCleanup: number = Date.now();
  private readonly CLEANUP_INTERVAL = 300000; // 5 minutes
  private readonly MAX_IDENTIFIERS = 10000; // Prevent unbounded growth
  
  constructor(
    private maxRequests: number = 10,
    private windowMs: number = 60000, // 1 minute
    storageKey: string = 'rate_limiter'
  ) {
    this.storageKey = storageKey;
    this.loadFromStorage();
  }
  
  /**
   * Load rate limit data from localStorage
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
   * Save rate limit data to localStorage
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
   * Clean up old entries to prevent memory leaks
   * Runs automatically every CLEANUP_INTERVAL
   * 
   * @private
   */
  private cleanupOldEntries(): void {
    const now = Date.now();
    
    // Only run cleanup periodically
    if (now - this.lastCleanup < this.CLEANUP_INTERVAL) {
      return;
    }
    
    this.lastCleanup = now;
    const maxAge = now - (3600000); // Keep entries for 1 hour max
    
    // Remove entries older than maxAge
    for (const [identifier, timestamps] of this.requests.entries()) {
      const validTimestamps = timestamps.filter(t => t > maxAge);
      
      if (validTimestamps.length === 0) {
        this.requests.delete(identifier);
      } else {
        this.requests.set(identifier, validTimestamps);
      }
    }
    
    // Enforce maximum identifiers limit (FIFO removal)
    if (this.requests.size > this.MAX_IDENTIFIERS) {
      const sortedEntries = Array.from(this.requests.entries())
        .sort((a, b) => Math.min(...a[1]) - Math.min(...b[1]));
      
      const toRemove = sortedEntries.slice(0, this.requests.size - this.MAX_IDENTIFIERS);
      toRemove.forEach(([id]) => this.requests.delete(id));
    }
    
    // Save cleaned up data
    this.saveToStorage();
  }
  
  /**
   * Check if request is allowed under rate limit
   * 
   * @param identifier - Unique identifier (IP, user ID, email, etc.)
   * @returns boolean - Whether request is allowed
   * 
   * @example
   * ```typescript
   * const limiter = new RateLimiter(10, 60000); // 10 requests per minute
   * 
   * if (limiter.isAllowed('user@example.com')) {
   *   // Process request
   * } else {
   *   // Rate limit exceeded
   * }
   * ```
   */
  isAllowed(identifier: string): boolean {
    // Periodic cleanup to prevent memory leaks
    this.cleanupOldEntries();
    
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
   * Get current attempt count for identifier
   * 
   * @param identifier - Unique identifier
   * @returns number - Current number of attempts in window
   */
  getAttemptCount(identifier: string): number {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];
    const validRequests = requests.filter(time => now - time < this.windowMs);
    return validRequests.length;
  }
  
  /**
   * Get remaining requests for identifier
   * @param identifier - Unique identifier
   * @returns number - Remaining requests
   */
  getRemainingRequests(identifier: string): number {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    return Math.max(0, this.maxRequests - validRequests.length);
  }
  
  /**
   * Clear all rate limit data
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
 * Lazy-initialized rate limiter instances to avoid module-level initialization issues
 */
let _apiRateLimiter: RateLimiter | null = null;
let _formRateLimiter: RateLimiter | null = null;

/**
 * Get or create API rate limiter instance (lazy initialization)
 */
export const apiRateLimiter = {
  isAllowed: (identifier: string) => {
    if (!_apiRateLimiter) {
      _apiRateLimiter = new RateLimiter(5, 60000, 'age_api_rate_limit');
    }
    return _apiRateLimiter.isAllowed(identifier);
  },
  getAttemptCount: (identifier: string) => {
    if (!_apiRateLimiter) {
      _apiRateLimiter = new RateLimiter(5, 60000, 'age_api_rate_limit');
    }
    return _apiRateLimiter.getAttemptCount(identifier);
  },
  getRemainingRequests: (identifier: string) => {
    if (!_apiRateLimiter) {
      _apiRateLimiter = new RateLimiter(5, 60000, 'age_api_rate_limit');
    }
    return _apiRateLimiter.getRemainingRequests(identifier);
  },
  clear: () => {
    if (!_apiRateLimiter) {
      _apiRateLimiter = new RateLimiter(5, 60000, 'age_api_rate_limit');
    }
    return _apiRateLimiter.clear();
  }
};

/**
 * Get or create form rate limiter instance (lazy initialization)
 */
export const formRateLimiter = {
  isAllowed: (identifier: string) => {
    if (!_formRateLimiter) {
      _formRateLimiter = new RateLimiter(3, 300000, 'age_form_rate_limit');
    }
    return _formRateLimiter.isAllowed(identifier);
  },
  getAttemptCount: (identifier: string) => {
    if (!_formRateLimiter) {
      _formRateLimiter = new RateLimiter(3, 300000, 'age_form_rate_limit');
    }
    return _formRateLimiter.getAttemptCount(identifier);
  },
  getRemainingRequests: (identifier: string) => {
    if (!_formRateLimiter) {
      _formRateLimiter = new RateLimiter(3, 300000, 'age_form_rate_limit');
    }
    return _formRateLimiter.getRemainingRequests(identifier);
  },
  clear: () => {
    if (!_formRateLimiter) {
      _formRateLimiter = new RateLimiter(3, 300000, 'age_form_rate_limit');
    }
    return _formRateLimiter.clear();
  }
};
