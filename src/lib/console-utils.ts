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
  
  // Store original window error handlers
  const originalWindowError = window.onerror;
  const originalWindowUnhandledRejection = window.onunhandledrejection;
  
  // Add user-friendly console message about expected warnings
  if (import.meta.env.DEV) {
    setTimeout(() => {
      originalLog('%c🎨 Spline 3D Background Active', 'color: hsl(var(--resolution-blue-600)); font-weight: bold; font-size: 14px;');
      originalLog('%cℹ️ Some WebGL and iframe warnings are expected and can be safely ignored.', 'color: hsl(var(--muted-foreground)); font-size: 12px;');
      originalLog('%cThese warnings come from the 3D animation system and do not affect functionality.', 'color: hsl(var(--muted-foreground)); font-size: 12px;');
    }, 1000);
  }
  
  // Helper function to check if message should be suppressed
  // Only suppress known, harmless warnings - be conservative to avoid hiding real issues
  const shouldSuppress = (message: unknown): boolean => {
    if (typeof message === 'string') {
      const messageStr = message.toLowerCase();
      return (
        // React development warnings that are informational only
        messageStr.includes('react router future flag warning') ||
        messageStr.includes('download the react devtools') ||
        messageStr.includes('reactjs.org/link/react-devtools') ||
        messageStr.includes('react does not recognize the `allowtransparency` prop') ||
        
        // Browser intervention warnings that are informational
        messageStr.includes('[intervention] images loaded lazily') ||
        messageStr.includes('load events are deferred') ||
        
        // WebGL framebuffer warnings from Spline 3D background
        messageStr.includes('gl_invalid_framebuffer_operation') ||
        (messageStr.includes('framebuffer') && messageStr.includes('incomplete')) ||
        (messageStr.includes('framebuffer') && messageStr.includes('attachment has zero size')) ||
        (messageStr.includes('webgl') && messageStr.includes('glclear')) ||
        (messageStr.includes('webgl') && messageStr.includes('gldrawelements')) ||
        (messageStr.includes('webgl') && messageStr.includes('glclearbuffer')) ||
        
        // iframe sandbox warnings from Spline
        (messageStr.includes('iframe') && messageStr.includes('sandbox') && messageStr.includes('escape')) ||
        (messageStr.includes('iframe') && messageStr.includes('allow-scripts') && messageStr.includes('allow-same-origin'))
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
  
  // Override window error handlers to suppress WebGL and iframe warnings
  window.onerror = (message, source, lineno, colno, error) => {
    const errorMessage = String(message);
    if (shouldSuppress(errorMessage)) {
      return true; // Suppress the error
    }
    if (originalWindowError) {
      return originalWindowError.call(window, message, source, lineno, colno, error);
    }
    return false;
  };
  
  window.onunhandledrejection = (event) => {
    const reason = String(event.reason);
    if (shouldSuppress(reason)) {
      event.preventDefault();
      return;
    }
    if (originalWindowUnhandledRejection) {
      originalWindowUnhandledRejection.call(window, event);
    }
  };
  
  // Ensure console methods are properly overridden on window object
  if (typeof window !== 'undefined') {
    (window as Window & { console: typeof console }).console = {
      ...console,
      warn: console.warn,
      log: console.log,
      error: console.error
    };
  }
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
    // Production: No console logging for security and performance
    // In production, errors should be sent to monitoring services
    // Example: errorReportingService.captureException(error, { context, additionalInfo });
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
  // Production: No logging for performance and security
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
  // Production: No logging for performance and security
};

/**
 * Focus management utility to prevent aria-hidden accessibility warnings
 * 
 * This function blurs any currently focused element to prevent the browser
 * from showing accessibility warnings when aria-hidden is applied to elements
 * containing focused content.
 * 
 * @example
 * ```typescript
 * // Before opening a modal
 * blurActiveElement();
 * setModalOpen(true);
 * ```
 * 
 * @since 1.0.0
 */
export const blurActiveElement = () => {
  const activeElement = document.activeElement;
  if (activeElement && activeElement instanceof HTMLElement) {
    activeElement.blur();
  }
};
