/**
 * 404 Not Found Page Component
 * 
 * This component handles all invalid routes and provides a user-friendly
 * error page with navigation back to the main site. It also logs 404 errors
 * for monitoring and debugging purposes.
 */

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

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
  const navigate = useNavigate();

  /**
   * Log 404 errors for monitoring and debugging
   * This helps identify broken links or user navigation patterns
   */
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    
    // Track 404 errors in Google Analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_not_found', {
        event_category: 'error',
        event_label: location.pathname,
        value: 1
      });
    }
    
    // In production, you might want to send this to an error tracking service
    // Example: Sentry.captureException(new Error(`404: ${location.pathname}`));
  }, [location.pathname]);

  /**
   * Handle navigation back to home page
   */
  const handleGoHome = () => {
    navigate('/');
  };

  /**
   * Handle navigation back to previous page
   */
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md mx-auto text-center">
        {/* Error code display with brand styling */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleGoHome}
            variant="cta"
            className="group"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
          
          <Button 
            onClick={handleGoBack}
            variant="cta-outline"
            className="group"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
        
        {/* Additional help text */}
        <p className="text-sm text-muted-foreground mt-8">
          If you believe this is an error, please contact our support team.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
