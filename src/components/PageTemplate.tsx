/**
 * Enhanced Page Template Component - Consistent Page Structure
 * 
 * This component provides a comprehensive page structure for all pages in the application.
 * It ensures uniform layout, accessibility, SEO optimization, and styling across the entire website.
 * 
 * Features:
 * - Consistent header and footer placement
 * - Proper semantic HTML structure
 * - Enhanced accessibility attributes
 * - Responsive design patterns
 * - SEO-friendly structure with meta tags
 * - Skip navigation support
 * - Loading states and error boundaries
 * - Custom background options
 * - Breadcrumb navigation support
 * - Social media meta tags
 * - Performance optimizations
 */

import { ReactNode, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

/**
 * Enhanced props interface for the PageTemplate component
 */
interface PageTemplateProps {
  /** Main content to be rendered in the page */
  children: ReactNode;
  /** Page title for SEO and accessibility */
  pageTitle?: string;
  /** Page description for SEO */
  pageDescription?: string;
  /** Page keywords for SEO */
  pageKeywords?: string;
  /** Canonical URL for SEO */
  canonicalUrl?: string;
  /** Open Graph image URL */
  ogImage?: string;
  /** Twitter card type */
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  /** Additional CSS classes for the main content area */
  className?: string;
  /** Whether to show the header (default: true) */
  showHeader?: boolean;
  /** Whether to show the footer (default: true) */
  showFooter?: boolean;
  /** Custom background variant */
  background?: 'default' | 'gradient' | 'muted' | 'transparent';
  /** Whether to show breadcrumb navigation */
  showBreadcrumbs?: boolean;
  /** Breadcrumb items */
  breadcrumbs?: Array<{
    label: string;
    href?: string;
    current?: boolean;
  }>;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  hasError?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Custom error component */
  errorComponent?: ReactNode;
  /** Whether to add structured data */
  structuredData?: Record<string, unknown>;
  /** Custom meta tags */
  customMeta?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
  /** Page type for structured data */
  pageType?: 'WebPage' | 'Article' | 'Product' | 'Organization' | 'Service';
  /** Author information */
  author?: string;
  /** Publication date */
  publishedDate?: string;
  /** Last modified date */
  modifiedDate?: string;
}

/**
 * Enhanced page template component providing comprehensive structure for all pages
 * 
 * This component ensures that all pages follow the same structural patterns:
 * - Fixed header navigation with enhanced accessibility
 * - Main content area with proper semantic markup
 * - Footer with consistent styling
 * - Enhanced accessibility features including skip navigation
 * - SEO-friendly structure with meta tags and structured data
 * - Loading and error states
 * - Breadcrumb navigation support
 * - Performance optimizations
 * 
 * @param children - Main content to be rendered
 * @param pageTitle - Page title for SEO and accessibility
 * @param pageDescription - Page description for SEO
 * @param pageKeywords - Page keywords for SEO
 * @param canonicalUrl - Canonical URL for SEO
 * @param ogImage - Open Graph image URL
 * @param twitterCard - Twitter card type
 * @param className - Additional CSS classes
 * @param showHeader - Whether to show the header
 * @param showFooter - Whether to show the footer
 * @param background - Custom background variant
 * @param showBreadcrumbs - Whether to show breadcrumb navigation
 * @param breadcrumbs - Breadcrumb items
 * @param isLoading - Loading state
 * @param hasError - Error state
 * @param errorMessage - Error message
 * @param errorComponent - Custom error component
 * @param structuredData - Structured data for SEO
 * @param customMeta - Custom meta tags
 * @param pageType - Page type for structured data
 * @param author - Author information
 * @param publishedDate - Publication date
 * @param modifiedDate - Last modified date
 * @returns JSX element with enhanced page structure
 */
const PageTemplate = ({ 
  children, 
  pageTitle,
  pageDescription,
  pageKeywords,
  canonicalUrl,
  ogImage,
  twitterCard = 'summary_large_image',
  className = "",
  showHeader = true,
  showFooter = true,
  background = 'default',
  showBreadcrumbs = false,
  breadcrumbs = [],
  isLoading = false,
  hasError = false,
  errorMessage = "An error occurred while loading this page.",
  errorComponent,
  structuredData,
  customMeta = [],
  pageType = 'WebPage',
  author,
  publishedDate,
  modifiedDate
}: PageTemplateProps) => {
  // Background variants
  const backgroundVariants = {
    default: 'bg-background',
    gradient: 'bg-gradient-hero',
    muted: 'bg-muted/20',
    transparent: 'bg-transparent'
  };

  // Update document title and meta tags
  useEffect(() => {
    if (pageTitle) {
      document.title = `${pageTitle} | Alvi Global Enterprises`;
    }
  }, [pageTitle]);

  // Generate comprehensive structured data
  const generateStructuredData = () => {
    const baseData: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": pageType,
      "name": pageTitle,
      "description": pageDescription,
      "url": canonicalUrl || window.location.href,
      "publisher": {
        "@type": "Organization",
        "name": "Alvi Global Enterprises",
        "alternateName": "AGE",
        "url": "https://alviglobal.com",
        "logo": "https://alviglobal.com/assets/age-logos/age-logo-header.png",
        "description": "AI-powered business ecosystems for emerging markets",
        "foundingDate": "2024",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "PK",
          "addressRegion": "Sindh",
          "addressLocality": "Karachi"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "hello@alviglobal.com",
          "telephone": "+92 301 8222054"
        },
        "sameAs": [
          "https://twitter.com/AlviGlobalEnt",
          "https://linkedin.com/company/alvi-global-enterprises"
        ]
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl || window.location.href
      }
    };

    // Add author information
    if (author) {
      baseData.author = {
        "@type": "Person",
        "name": author,
        "url": "https://alviglobal.com/about"
      };
    }

    // Add publication and modification dates
    if (publishedDate) {
      baseData.datePublished = publishedDate;
    }

    if (modifiedDate) {
      baseData.dateModified = modifiedDate;
    }

    // Add breadcrumb structured data
    if (showBreadcrumbs && breadcrumbs && breadcrumbs.length > 0) {
      baseData.breadcrumb = {
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.label,
          "item": item.href ? `https://alviglobal.com${item.href}` : undefined
        }))
      };
    }

    // Add organization-specific data for homepage
    if (pageType === 'WebPage' && (!pageTitle || pageTitle.includes('Home'))) {
      baseData.about = {
        "@type": "Organization",
        "name": "Alvi Global Enterprises",
        "description": "AI-powered business ecosystems for emerging markets",
        "service": [
          {
            "@type": "Service",
            "name": "AI Automation",
            "description": "AI-powered automation solutions for business processes"
          },
          {
            "@type": "Service",
            "name": "Product Engineering",
            "description": "Full-stack product development and engineering services"
          },
          {
            "@type": "Service",
            "name": "Growth Consulting",
            "description": "Go-to-market strategy and business growth consulting"
          },
          {
            "@type": "Service",
            "name": "AI Maturity Assessment",
            "description": "Comprehensive AI readiness assessment and recommendations"
          }
        ]
      };
    }

    return structuredData ? { ...baseData, ...structuredData } : baseData;
  };

  // Breadcrumb component
  const BreadcrumbComponent = () => {
    if (!showBreadcrumbs || breadcrumbs.length === 0) return null;

    return (
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          {breadcrumbs.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-muted-foreground/50">/</span>
              )}
              {item.href && !item.current ? (
                <a
                  href={item.href}
                  className="hover:text-primary transition-colors duration-500 ease-gentle"
                >
                  {item.label}
                </a>
              ) : (
                <span className={item.current ? "text-foreground font-medium" : ""}>
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  };

  // Loading component
  const LoadingComponent = () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );

  // Error component
  const ErrorComponent = () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-foreground mb-4">Something went wrong</h1>
        <p className="text-muted-foreground mb-6">{errorMessage}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-500 ease-gentle"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Enhanced SEO Meta Tags */}
      <Helmet>
        {/* Basic Meta Tags */}
        {pageTitle && <title>{`${pageTitle} | Alvi Global Enterprises`}</title>}
        {pageDescription && <meta name="description" content={pageDescription} />}
        {pageKeywords && <meta name="keywords" content={pageKeywords} />}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        
        {/* Enhanced Meta Tags */}
        <meta name="author" content="Alvi Global Enterprises" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="language" content="en" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="geo.region" content="PK" />
        <meta name="geo.country" content="Pakistan" />
        <meta name="geo.placename" content="Karachi" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Alvi Global Enterprises" />
        <meta property="og:locale" content="en_US" />
        {pageTitle && <meta property="og:title" content={`${pageTitle} | Alvi Global Enterprises`} />}
        {pageDescription && <meta property="og:description" content={pageDescription} />}
        {ogImage && <meta property="og:image" content={ogImage} />}
        {ogImage && <meta property="og:image:width" content="1200" />}
        {ogImage && <meta property="og:image:height" content="630" />}
        {ogImage && <meta property="og:image:alt" content={pageDescription || pageTitle} />}
        {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content={twitterCard} />
        <meta name="twitter:site" content="@AlviGlobalEnt" />
        <meta name="twitter:creator" content="@AlviGlobalEnt" />
        {pageTitle && <meta name="twitter:title" content={`${pageTitle} | Alvi Global Enterprises`} />}
        {pageDescription && <meta name="twitter:description" content={pageDescription} />}
        {ogImage && <meta name="twitter:image" content={ogImage} />}
        {ogImage && <meta name="twitter:image:alt" content={pageDescription || pageTitle} />}
        
        {/* Additional SEO Meta Tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="hsl(224, 100%, 48%)" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Alvi Global Enterprises" />
        
        {/* Performance and SEO Links */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://generativelanguage.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Custom Meta Tags */}
        {customMeta.map((meta, index) => (
          <meta
            key={index}
            {...(meta.name ? { name: meta.name } : {})}
            {...(meta.property ? { property: meta.property } : {})}
            content={meta.content}
          />
        ))}
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(generateStructuredData())}
        </script>
      </Helmet>

      <div className={cn("min-h-screen", backgroundVariants[background])}>
        {/* Enhanced Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-500 ease-gentle"
        >
          Skip to main content
        </a>

        {/* Fixed navigation header */}
        {showHeader && <Header />}
        
        {/* Breadcrumb Navigation */}
        <BreadcrumbComponent />
        
        {/* Main page content */}
        <main 
          id="main-content" 
          role="main" 
          className={cn("relative", className)}
          aria-label={pageTitle ? `Main content for ${pageTitle}` : "Main content"}
        >
          {/* Loading State */}
          {isLoading && <LoadingComponent />}
          
          {/* Error State */}
          {hasError && !isLoading && (
            errorComponent || <ErrorComponent />
          )}
          
          {/* Main Content */}
          {!isLoading && !hasError && (
            <>
              {pageDescription && (
                <div className="sr-only">
                  <p>{pageDescription}</p>
                </div>
              )}
              {children}
            </>
          )}
        </main>
        
        {/* Footer */}
        {showFooter && <Footer />}
      </div>
    </>
  );
};

export default PageTemplate;
