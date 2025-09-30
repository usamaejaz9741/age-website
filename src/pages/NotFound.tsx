/**
 * @fileoverview 404 Not Found Page Component - User-Friendly Error Handling
 * 
 * This component provides a comprehensive 404 error page that handles all
 * invalid routes with user-friendly messaging and navigation options. It includes:
 * - Clear error messaging with brand styling
 * - Multiple navigation options (home, back)
 * - SEO optimization with proper meta tags
 * - Error tracking and analytics integration
 * - Accessibility compliance (WCAG 2.1 AA)
 * - Responsive design for all devices
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 * @since 1.0.0
 * 
 * @features
 * - 🎨 Brand-consistent error page design
 * - 🧭 Multiple navigation options
 * - 📊 Error tracking and analytics
 * - ♿ Full accessibility compliance
 * - 📱 Responsive mobile design
 * - 🔍 SEO-optimized meta tags
 */

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import PageTemplate from "@/components/PageTemplate";
import SectionTemplate from "@/components/SectionTemplate";

/**
 * 404 Not Found Page Component
 * 
 * Renders a user-friendly error page when users navigate to non-existent routes.
 * Provides clear messaging, navigation options, and comprehensive error tracking.
 * 
 * @component
 * @returns {JSX.Element} The 404 error page with navigation options
 * 
 * @example
 * ```tsx
 * // Used automatically by React Router for invalid routes
 * <Route path="*" element={<NotFound />} />
 * ```
 * 
 * @accessibility
 * - Uses semantic HTML structure
 * - Provides clear heading hierarchy
 * - Includes descriptive button labels
 * - Supports keyboard navigation
 * 
 * @seo
 * - Sets noindex, nofollow meta tags
 * - Includes structured data
 * - Provides canonical URL
 * - Optimized page title and description
 * 
 * @since 1.0.0
 */
const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * Logs 404 errors for monitoring and debugging purposes
   * 
   * Tracks invalid route access to help identify:
   * - Broken internal links
   * - User navigation patterns
   * - Potential SEO issues
   * - Missing pages that users expect
   * 
   * @effect
   * - Logs to console in development
   * - Sends analytics event if Google Analytics is available
   * - Can be extended to send to error tracking services
   * 
   * @dependencies location.pathname - Triggers when route changes
   * 
   * @since 1.0.0
   */
  useEffect(() => {
    // Development logging for debugging
    if (import.meta.env.DEV) {
      console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }
    
    // Analytics tracking for monitoring
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_not_found', {
        event_category: 'error',
        event_label: location.pathname,
        value: 1
      });
    }
    
    // TODO: Integrate with error tracking service (e.g., Sentry)
    // Example: Sentry.captureException(new Error(`404: ${location.pathname}`));
  }, [location.pathname]);

  /**
   * Handles navigation to the home page
   * 
   * Navigates the user back to the main landing page using React Router's
   * programmatic navigation. This provides a clear path forward when users
   * encounter a 404 error.
   * 
   * @function
   * @since 1.0.0
   */
  const handleGoHome = () => {
    navigate('/');
  };

  /**
   * Handles navigation back to the previous page
   * 
   * Uses the browser's history to navigate back to the previous page.
   * This provides users with a quick way to return to where they came from
   * if they accidentally navigated to an invalid route.
   * 
   * @function
   * @since 1.0.0
   */
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <PageTemplate 
      pageTitle="Page Not Found - Alvi Global Enterprises"
      pageDescription="The page you're looking for doesn't exist. Navigate back to our homepage or contact support."
      pageKeywords="404, page not found, error, Alvi Global Enterprises, AI automation, business solutions"
      canonicalUrl="https://alviglobal.com/404"
      pageType="WebPage"
      structuredData={{
        "@type": "WebPage",
        "name": "Page Not Found - Alvi Global Enterprises",
        "description": "The page you're looking for doesn't exist. Navigate back to our homepage or contact support.",
        "mainEntity": {
          "@type": "Organization",
          "name": "Alvi Global Enterprises"
        }
      }}
      customMeta={[
        { name: "robots", content: "noindex, nofollow" }
      ]}
    >
      <SectionTemplate 
        variant="default" 
        padding="xl" 
        maxWidth="md" 
        align="center"
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
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
      </SectionTemplate>
    </PageTemplate>
  );
};

export default NotFound;
