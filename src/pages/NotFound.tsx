/**
 * 404 Not Found Page Component
 * 
 * This component handles all invalid routes and provides a user-friendly
 * error page with navigation back to the main site. It also logs 404 errors
 * for monitoring and debugging purposes.
 */

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

/**
 * 404 Not Found page component
 * 
 * Displays when users navigate to a non-existent route. Provides:
 * - Clear error messaging
 * - Navigation back to home page
 * - Error logging for monitoring
 */
const NotFound = () => {
  const location = useLocation();

  /**
   * Log 404 errors for monitoring and debugging
   * This helps identify broken links or user navigation patterns
   */
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    
    // In production, you might want to send this to an error tracking service
    // Example: Sentry.captureException(new Error(`404: ${location.pathname}`));
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        {/* Error code display */}
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        
        {/* User-friendly error message */}
        <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
        
        {/* Navigation back to home */}
        <a 
          href="/" 
          className="text-blue-500 underline hover:text-blue-700 transition-colors"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
