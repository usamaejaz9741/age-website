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
      originalLog('%c🎨 Spline 3D Background Active', 'color: #4F46E5; font-weight: bold; font-size: 14px;');
      originalLog('%cℹ️ Some WebGL and iframe warnings are expected and can be safely ignored.', 'color: #6B7280; font-size: 12px;');
      originalLog('%cThese warnings come from the 3D animation system and do not affect functionality.', 'color: #6B7280; font-size: 12px;');
    }, 1000);
  }
  
  // Helper function to check if message should be suppressed
  const shouldSuppress = (message: unknown): boolean => {
    if (typeof message === 'string') {
      const messageStr = message.toLowerCase();
      return (
        // React warnings
        messageStr.includes('react router future flag warning') ||
        messageStr.includes('download the react devtools') ||
        messageStr.includes('reactjs.org/link/react-devtools') ||
        messageStr.includes('react devtools') ||
        messageStr.includes('fetchpriority') ||
        messageStr.includes('allowtransparency') ||
        messageStr.includes('react does not recognize the `allowtransparency` prop') ||
        
        // Browser intervention warnings
        messageStr.includes('[intervention] images loaded lazily') ||
        messageStr.includes('load events are deferred') ||
        messageStr.includes('go.microsoft.com/fwlink') ||
        
        // WebGL warnings - comprehensive coverage
        messageStr.includes('gl_invalid_framebuffer_operation') ||
        messageStr.includes('framebuffer is incomplete') ||
        messageStr.includes('attachment has zero size') ||
        messageStr.includes('glclear') ||
        messageStr.includes('glclearbufferfv') ||
        messageStr.includes('gldrawelements') ||
        messageStr.includes('webgl') ||
        messageStr.includes('webgl-0x') ||
        messageStr.includes('gl_invalid_framebuffer_operation: glclear') ||
        messageStr.includes('gl_invalid_framebuffer_operation: glclearbufferfv') ||
        messageStr.includes('gl_invalid_framebuffer_operation: gldrawelements') ||
        
        // iframe sandbox warnings
        messageStr.includes('an iframe which has both allow-scripts and allow-same-origin') ||
        messageStr.includes('iframe') && messageStr.includes('sandbox') ||
        messageStr.includes('spline-background.html') ||
        
        // Additional WebGL context warnings
        messageStr.includes('webgl context') ||
        messageStr.includes('webgl rendering context') ||
        messageStr.includes('webgl2 rendering context') ||
        
        // GPU/Driver related warnings
        messageStr.includes('gpu') ||
        messageStr.includes('driver') ||
        messageStr.includes('hardware acceleration') ||
        
        // Canvas/3D related warnings
        messageStr.includes('canvas') && messageStr.includes('3d') ||
        messageStr.includes('spline') ||
        messageStr.includes('three.js') ||
        messageStr.includes('webgl context lost') ||
        messageStr.includes('webgl context restored')
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
  
  // Additional suppression for browser-native console methods
  if (typeof window !== 'undefined') {
    // Override console methods on the window object as well
    (window as Window & { console: typeof console }).console = {
      ...console,
      warn: console.warn,
      log: console.log,
      error: console.error
    };
    
    // Suppress WebGL context lost/restored events
    const suppressWebGLEvents = () => {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        canvas.addEventListener('webglcontextlost', (e) => {
          e.preventDefault();
          return false;
        });
        
        canvas.addEventListener('webglcontextrestored', (e) => {
          e.preventDefault();
          return false;
        });
      }
    };
    
    // Try to suppress immediately and on DOM ready
    suppressWebGLEvents();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', suppressWebGLEvents);
    }
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
