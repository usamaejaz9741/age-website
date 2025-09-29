/**
 * @fileoverview Standardized Error Handling Utilities
 * 
 * This module provides standardized error handling utilities for consistent
 * error management across the application. It includes async error handling,
 * error classification, and standardized error responses.
 * 
 * @module error-handler
 * @author Alvi Global Enterprises
 * @version 1.0.0
 * 
 * @features
 * - 🔄 Async error handling with fallbacks
 * - 📊 Error classification and categorization
 * - 🛡️ Secure error logging and reporting
 * - 🎯 Standardized error responses
 * - 📝 Context-aware error handling
 * - ⚡ Performance optimized
 */

import { logError } from './console-utils';

/**
 * Error types for classification
 */
export enum ErrorType {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  RATE_LIMIT = 'RATE_LIMIT',
  SERVER = 'SERVER',
  CLIENT = 'CLIENT',
  UNKNOWN = 'UNKNOWN'
}

/**
 * Error severity levels
 */
export enum ErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

/**
 * Standardized error response interface
 */
export interface ErrorResponse {
  type: ErrorType;
  severity: ErrorSeverity;
  message: string;
  code?: string | number;
  details?: Record<string, unknown>;
  timestamp: string;
  context?: string;
}

/**
 * Error handling options
 */
export interface ErrorHandlingOptions {
  /** Context where the error occurred */
  context?: string;
  /** Fallback value to return on error */
  fallback?: unknown;
  /** Whether to log the error */
  shouldLog?: boolean;
  /** Custom error message */
  customMessage?: string;
  /** Error severity level */
  severity?: ErrorSeverity;
}

/**
 * Classify error type based on error object
 */
export const classifyError = (error: unknown): ErrorType => {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    
    if (message.includes('network') || message.includes('fetch') || message.includes('connection')) {
      return ErrorType.NETWORK;
    }
    
    if (message.includes('validation') || message.includes('invalid') || message.includes('required')) {
      return ErrorType.VALIDATION;
    }
    
    if (message.includes('unauthorized') || message.includes('authentication')) {
      return ErrorType.AUTHENTICATION;
    }
    
    if (message.includes('forbidden') || message.includes('authorization')) {
      return ErrorType.AUTHORIZATION;
    }
    
    if (message.includes('not found') || message.includes('404')) {
      return ErrorType.NOT_FOUND;
    }
    
    if (message.includes('rate limit') || message.includes('429')) {
      return ErrorType.RATE_LIMIT;
    }
    
    if (message.includes('server') || message.includes('500') || message.includes('503')) {
      return ErrorType.SERVER;
    }
  }
  
  return ErrorType.UNKNOWN;
};

/**
 * Determine error severity based on error type and context
 */
export const determineSeverity = (errorType: ErrorType, context?: string): ErrorSeverity => {
  switch (errorType) {
    case ErrorType.CRITICAL:
    case ErrorType.SERVER:
      return ErrorSeverity.CRITICAL;
    
    case ErrorType.AUTHENTICATION:
    case ErrorType.AUTHORIZATION:
    case ErrorType.RATE_LIMIT:
      return ErrorSeverity.HIGH;
    
    case ErrorType.NETWORK:
    case ErrorType.VALIDATION:
      return ErrorSeverity.MEDIUM;
    
    case ErrorType.NOT_FOUND:
    case ErrorType.CLIENT:
      return ErrorSeverity.LOW;
    
    default:
      return ErrorSeverity.MEDIUM;
  }
};

/**
 * Create standardized error response
 */
export const createErrorResponse = (
  error: unknown,
  options: ErrorHandlingOptions = {}
): ErrorResponse => {
  const errorType = classifyError(error);
  const severity = options.severity || determineSeverity(errorType, options.context);
  
  let message = 'An unexpected error occurred';
  
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  }
  
  // Use custom message if provided
  if (options.customMessage) {
    message = options.customMessage;
  }
  
  return {
    type: errorType,
    severity,
    message,
    timestamp: new Date().toISOString(),
    context: options.context,
    details: {
      ...(error instanceof Error ? { stack: error.stack } : {}),
      ...(options.details || {})
    }
  };
};

/**
 * Handle async operations with standardized error handling
 * 
 * @param operation - Async operation to execute
 * @param fallback - Fallback value to return on error
 * @param options - Error handling options
 * @returns Promise with result or fallback value
 */
export const handleAsyncError = async <T>(
  operation: () => Promise<T>,
  fallback: T,
  options: ErrorHandlingOptions = {}
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    const errorResponse = createErrorResponse(error, options);
    
    if (options.shouldLog !== false) {
      logError(options.context || 'Async Operation', error, {
        errorResponse,
        fallback: fallback !== undefined ? 'Using fallback value' : 'No fallback'
      });
    }
    
    return fallback;
  }
};

/**
 * Handle sync operations with standardized error handling
 * 
 * @param operation - Sync operation to execute
 * @param fallback - Fallback value to return on error
 * @param options - Error handling options
 * @returns Result or fallback value
 */
export const handleSyncError = <T>(
  operation: () => T,
  fallback: T,
  options: ErrorHandlingOptions = {}
): T => {
  try {
    return operation();
  } catch (error) {
    const errorResponse = createErrorResponse(error, options);
    
    if (options.shouldLog !== false) {
      logError(options.context || 'Sync Operation', error, {
        errorResponse,
        fallback: fallback !== undefined ? 'Using fallback value' : 'No fallback'
      });
    }
    
    return fallback;
  }
};

/**
 * Retry operation with exponential backoff
 * 
 * @param operation - Operation to retry
 * @param maxRetries - Maximum number of retries
 * @param baseDelay - Base delay in milliseconds
 * @param options - Error handling options
 * @returns Promise with result or throws error
 */
export const retryOperation = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000,
  options: ErrorHandlingOptions = {}
): Promise<T> => {
  let lastError: unknown;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        const errorResponse = createErrorResponse(error, {
          ...options,
          severity: ErrorSeverity.HIGH
        });
        
        if (options.shouldLog !== false) {
          logError(options.context || 'Retry Operation', error, {
            errorResponse,
            attempts: attempt + 1,
            maxRetries
          });
        }
        
        throw error;
      }
      
      // Calculate delay with exponential backoff
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
};

/**
 * Safe JSON parsing with error handling
 * 
 * @param jsonString - JSON string to parse
 * @param fallback - Fallback value on parse error
 * @param options - Error handling options
 * @returns Parsed object or fallback value
 */
export const safeJsonParse = <T>(
  jsonString: string,
  fallback: T,
  options: ErrorHandlingOptions = {}
): T => {
  return handleSyncError(
    () => JSON.parse(jsonString) as T,
    fallback,
    {
      ...options,
      context: options.context || 'JSON Parse',
      severity: ErrorSeverity.LOW
    }
  );
};

/**
 * Safe JSON stringification with error handling
 * 
 * @param value - Value to stringify
 * @param fallback - Fallback string on stringify error
 * @param options - Error handling options
 * @returns JSON string or fallback value
 */
export const safeJsonStringify = (
  value: unknown,
  fallback: string = '{}',
  options: ErrorHandlingOptions = {}
): string => {
  return handleSyncError(
    () => JSON.stringify(value),
    fallback,
    {
      ...options,
      context: options.context || 'JSON Stringify',
      severity: ErrorSeverity.LOW
    }
  );
};

/**
 * Create error boundary error handler
 * 
 * @param error - Error object
 * @param errorInfo - React error info
 * @param context - Component context
 * @returns Standardized error response
 */
export const handleErrorBoundary = (
  error: Error,
  errorInfo: { componentStack: string },
  context: string = 'Error Boundary'
): ErrorResponse => {
  const errorResponse = createErrorResponse(error, {
    context,
    severity: ErrorSeverity.HIGH,
    details: {
      componentStack: errorInfo.componentStack,
      errorBoundary: true
    }
  });
  
  logError(context, error, {
    errorResponse,
    componentStack: errorInfo.componentStack
  });
  
  return errorResponse;
};
