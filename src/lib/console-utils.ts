/**
 * @fileoverview Console Utilities - Development and Production Console Management
 * 
 * This utility provides functions to manage console output based on environment
 * and suppress unnecessary warnings in production while maintaining useful
 * development information. It includes:
 * - Production warning suppression
 * - Enhanced error logging with context
 * - Development-only logging utilities
 * - Performance monitoring helpers
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

/**
 * Suppresses specific console warnings in production environments
 * 
 * This function intercepts console.warn calls and filters out development-related
 * warnings that are not relevant to end users in production. It specifically
 * targets:
 * - React Router future flag warnings
 * - React DevTools download suggestions
 * - Other development-only notifications
 * 
 * @example
 * ```typescript
 * // Call this once at application startup
 * suppressConsoleWarnings();
 * ```
 * 
 * @since 1.0.0
 */
export const suppressConsoleWarnings = () => {
  // Store original console functions
  const originalWarn = console.warn;
  const originalLog = console.log;
  const originalError = console.error;
  
  // Helper function to check if message should be suppressed
  const shouldSuppress = (message: unknown): boolean => {
    if (typeof message === 'string') {
      return (
        message.includes('React Router Future Flag Warning') ||
        message.includes('Download the React DevTools') ||
        message.includes('reactjs.org/link/react-devtools') ||
        message.includes('[Intervention] Images loaded lazily') ||
        message.includes('Load events are deferred') ||
        message.includes('go.microsoft.com/fwlink') ||
        message.includes('React does not recognize the `fetchPriority` prop') ||
        message.includes('fetchpriority') ||
        message.includes('React DevTools') ||
        message.includes('Download the React DevTools for a better development experience') ||
        message.includes('https://reactjs.org/link/react-devtools')
      );
    }
    return false;
  };
  
  // Override console.warn with filtered version
  console.warn = (...args: unknown[]) => {
    // Only log in development mode
    if (import.meta.env.DEV) {
      if (shouldSuppress(args[0])) {
        return; // Suppress these warnings
      }
      originalWarn.apply(console, args);
    }
  };
  
  // Override console.log with filtered version (for development messages)
  console.log = (...args: unknown[]) => {
    // Only log in development mode
    if (import.meta.env.DEV) {
      if (shouldSuppress(args[0])) {
        return; // Suppress these development messages
      }
      originalLog.apply(console, args);
    }
  };
  
  // Override console.error with filtered version (for React warnings)
  console.error = (...args: unknown[]) => {
    // Always log errors, but filter in development
    if (import.meta.env.DEV && shouldSuppress(args[0])) {
      return; // Suppress these React warnings in development
    }
    originalError.apply(console, args);
  };
};

/**
 * Enhanced error logging with context and environment-aware output
 * 
 * Provides structured error logging that adapts to the environment:
 * - Development: Detailed error information with context grouping
 * - Production: Minimal error logging for security and performance
 * 
 * @param context - The context where the error occurred (e.g., "ComponentX", "API Call")
 * @param error - The error object or message to log
 * @param additionalInfo - Optional additional information to include with the error
 * 
 * @example
 * ```typescript
 * try {
 *   // Some operation
 * } catch (error) {
 *   logError('Data Fetching', error, { userId: 123, endpoint: '/api/users' });
 * }
 * ```
 * 
 * @since 1.0.0
 */
export const logError = (context: string, error: unknown, additionalInfo?: Record<string, unknown>) => {
  if (import.meta.env.DEV) {
    // Development: Detailed error logging with grouping
    console.group(`🚨 Error in ${context}`);
    console.error('Error:', error);
    if (additionalInfo) {
      console.info('Additional Info:', additionalInfo);
    }
    console.groupEnd();
  } else {
    // Production: Minimal error logging for security
    console.error(`Error in ${context}:`, error instanceof Error ? error.message : 'Unknown error');
  }
};

/**
 * Development-only logging utility
 * 
 * Logs messages only in development environment with a distinctive prefix.
 * Automatically strips out in production builds for performance.
 * 
 * @param message - The message to log
 * @param data - Optional data to log alongside the message
 * 
 * @example
 * ```typescript
 * devLog('Component mounted', { props: componentProps });
 * devLog('API response received', responseData);
 * ```
 * 
 * @since 1.0.0
 */
export const devLog = (message: string, data?: unknown) => {
  if (import.meta.env.DEV) {
    console.log(`🔧 ${message}`, data || '');
  }
};

/**
 * Performance monitoring utility
 * 
 * Measures and logs the duration of operations for performance analysis.
 * Only active in development environment.
 * 
 * @param label - A descriptive label for the performance measurement
 * @param startTime - The start time from performance.now()
 * 
 * @example
 * ```typescript
 * const startTime = performance.now();
 * // ... some operation
 * perfLog('Data Processing', startTime);
 * ```
 * 
 * @since 1.0.0
 */
export const perfLog = (label: string, startTime: number) => {
  if (import.meta.env.DEV) {
    const duration = performance.now() - startTime;
    console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
  }
};
