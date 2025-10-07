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
import { HEADING_SIZES, TEXT_SIZES, MARGIN_BOTTOM, GAP, BUTTON_STYLES } from "@/constants/design-system";

/**
 * Renders a user-friendly error page when a user navigates to a non-existent route.
 *
 * This component displays a standard 404 "Page Not Found" message with a consistent
 * brand design. It provides clear navigation options for the user to go back to the
 * homepage or to the previous page. It also includes SEO meta tags to prevent search
 * engines from indexing the error page and logs the 404 event for analytics purposes.
 *
 * @returns {JSX.Element} The 404 Not Found page component.
 */
const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * An effect hook that logs the 404 error when the component mounts.
   * This is useful for analytics and debugging, as it helps track broken links
   * or user attempts to access non-existent pages. It logs to the console
   * in development and can be extended to send data to an analytics service.
   *
   * @effect
   * @listens location.pathname - This effect re-runs if the path changes while the component is mounted.
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
    
    // Error tracking integration can be added here when needed
    // Example: errorTrackingService.captureException(new Error(`404: ${location.pathname}`));
  }, [location.pathname]);

  /**
   * A callback function that navigates the user to the home page ('/').
   */
  const handleGoHome = () => {
    navigate('/');
  };

  /**
   * A callback function that navigates the user to the previous page in their browser history.
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
          <div className={MARGIN_BOTTOM.large}>
            <h1 className={`text-8xl font-bold text-primary ${MARGIN_BOTTOM.small}`}>404</h1>
            <h2 className={`${HEADING_SIZES.h3} text-foreground ${MARGIN_BOTTOM.small}`}>
              Page Not Found
            </h2>
            <p className={`${TEXT_SIZES.base} text-muted-foreground`}>
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </p>
          </div>
          
          {/* Navigation buttons */}
          <div className={`flex flex-col sm:flex-row ${GAP.small} justify-center`}>
            <Button 
              onClick={handleGoHome}
              variant="cta"
              className={`group ${BUTTON_STYLES.responsive}`}
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
            
            <Button 
              onClick={handleGoBack}
              variant="cta-outline"
              className={`group ${BUTTON_STYLES.responsive}`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
          
          {/* Additional help text */}
          <p className={`${TEXT_SIZES.small} text-muted-foreground mt-8`}>
            If you believe this is an error, please contact our support team.
          </p>
        </div>
      </SectionTemplate>
    </PageTemplate>
  );
};

export default NotFound;
