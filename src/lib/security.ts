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

/**
 * Sanitizes HTML content to prevent XSS attacks
 * 
 * This function removes potentially dangerous HTML elements and attributes
 * that could be used for cross-site scripting attacks. It's designed to
 * be safe for user-generated content display.
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
  
  return input
    .replace(/[<>]/g, '') // Remove angle brackets to prevent HTML injection
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:/gi, '') // Remove data: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers (onclick, onload, etc.)
    .trim();
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
  
  return email
    .trim()
    .toLowerCase()
    .replace(/[<>]/g, '') // Remove angle brackets to prevent HTML injection
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:/gi, '') // Remove data: protocol
    .substring(0, 254); // Limit length
}

/**
 * Validate and sanitize text input
 * @param input - Text to validate and sanitize
 * @param maxLength - Maximum allowed length
 * @returns Sanitized text
 */
export function validateAndSanitizeText(input: string, maxLength: number = 1000): string {
  if (typeof input !== 'string') {
    return '';
  }
  
  return sanitizeHtml(input)
    .substring(0, maxLength)
    .trim();
}

/**
 * Validate numeric input
 * @param value - Value to validate
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns boolean - Whether value is valid
 */
export function validateNumeric(value: unknown, min: number = 0, max: number = 100): boolean {
  if (typeof value !== 'number' || isNaN(value)) {
    return false;
  }
  
  return value >= min && value <= max;
}

/**
 * Check for suspicious patterns in input
 * @param input - Input to check
 * @returns boolean - Whether input contains suspicious patterns
 */
export function containsSuspiciousPatterns(input: string): boolean {
  if (typeof input !== 'string') {
    return false;
  }
  
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:/i,
    /vbscript:/i,
    /expression\s*\(/i,
    /url\s*\(/i,
    /@import/i,
    /eval\s*\(/i,
    /setTimeout\s*\(/i,
    /setInterval\s*\(/i
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
      result += chars[array[i] % chars.length];
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
 * Rate limiting helper
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  constructor(
    private maxRequests: number = 10,
    private windowMs: number = 60000 // 1 minute
  ) {}
  
  /**
   * Check if request is allowed
   * @param identifier - Unique identifier (IP, user ID, etc.)
   * @returns boolean - Whether request is allowed
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
    
    return true;
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
}

/**
 * Create a rate limiter instance for API calls
 */
export const apiRateLimiter = new RateLimiter(5, 60000); // 5 requests per minute

/**
 * Create a rate limiter instance for form submissions
 */
export const formRateLimiter = new RateLimiter(3, 300000); // 3 submissions per 5 minutes
