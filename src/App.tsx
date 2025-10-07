/**
 * @fileoverview Main App Component - Application Root
 * 
 * Root component that initializes the complete application infrastructure including
 * routing, state management, SEO optimization, and user experience enhancements.
 * 
 * @component
 * @example
 * ```tsx
 * <App />
 * ```
 * 
 * @features
 * - 🚀 React Query for efficient data fetching and caching
 * - 🛣️ React Router for client-side navigation and routing
 * - 🔍 Helmet for dynamic SEO meta tag management
 * - 🔔 Toast notifications and tooltip system
 * - ⏳ Intelligent preloader with loading state detection
 * - 🎨 FOUC (Flash of Unstyled Content) prevention
 * - ♿ Full accessibility support with error boundaries
 * - 📱 Responsive design with mobile optimization
 * - 🎭 Smooth page transitions and animations
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useState, useEffect, lazy, Suspense, useCallback } from "react";
import Preloader from "./components/Preloader";
import ErrorBoundary from "./components/ErrorBoundary";
import Index from "./pages/Index";

// Lazy load heavy components for better performance
const AIGrowthScore = lazy(() => import("./pages/ai-growth-score"));
const NotFound = lazy(() => import("./pages/NotFound"));

/**
 * Creates and configures the React Query client.
 *
 * This instance of `QueryClient` is configured with default options for all queries,
 * including a 5-minute stale time to reduce unnecessary refetching and a retry
 * count of 3 for failed requests.
 *
 * @const {QueryClient} queryClient
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
    },
  },
});

/**
 * The root component of the application.
 *
 * This component orchestrates the entire application by setting up global providers,
 * client-side routing, and the initial loading experience. It integrates:
 * - `React Router` for navigation.
 * - `React Query` for data fetching and state management.
 * - `React Helmet Async` for managing the document head and SEO.
 * - A custom preloader to handle initial asset loading.
 * - `Toaster` and `Sonner` for displaying toast notifications.
 * - `TooltipProvider` for enabling tooltips throughout the app.
 *
 * @returns {JSX.Element} The fully composed application with all providers and routes.
 */
const App = () => {
  /** State to control preloader visibility. */
  const [showPreloader, setShowPreloader] = useState(true);

  /**
   * An effect hook to prevent Flash of Unstyled Content (FOUC) and manage font loading.
   * It adds CSS classes to the document to signal when the DOM and fonts are ready,
   * allowing for a smoother initial render.
   *
   * @effect
   */
  useEffect(() => {
    /**
     * Handles DOM loading completion
     * Adds CSS classes to prevent FOUC and show content
     */
    const handleLoad = () => {
      document.documentElement.classList.add('loaded');
      document.body.classList.add('loaded');
      document.body.classList.remove('loading');
    };

    /**
     * Handles font loading completion
     * Uses Font Loading API when available, fallback for older browsers
     */
    const handleFontLoad = () => {
      if ('fonts' in document) {
        // Modern browsers with Font Loading API
        document.fonts.ready.then(() => {
          document.documentElement.classList.add('fonts-loaded');
          document.body.classList.add('fonts-loaded');
        });
      } else {
        // Fallback for older browsers
        setTimeout(() => {
          document.documentElement.classList.add('fonts-loaded');
          document.body.classList.add('fonts-loaded');
        }, 1000);
      }
    };

    // Handle immediate loading if DOM is already ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      handleLoad();
      handleFontLoad();
    } else {
      // Set up event listeners for loading events
      document.addEventListener('DOMContentLoaded', handleLoad);
      window.addEventListener('load', handleLoad);
      handleFontLoad();
    }

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener('DOMContentLoaded', handleLoad);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  /**
   * A callback function that is invoked when the preloader has finished its animation.
   * It sets the state to hide the preloader after a short delay to ensure a smooth transition.
   *
   * @callback handlePreloaderComplete
   */
  const handlePreloaderComplete = useCallback(() => {
    const timeoutId = setTimeout(() => {
      setShowPreloader(false);
    }, 100);
    
    // Return cleanup function
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        {/* React Query for data fetching and caching */}
        <QueryClientProvider client={queryClient}>
          {/* Tooltip system provider */}
          <TooltipProvider>
          {/* Conditional preloader with intelligent loading detection */}
          {showPreloader && (
            <Preloader 
              minDuration={1200}
              maxDuration={4000}
              showProgress={true}
              onComplete={handlePreloaderComplete}
              className="preloader-container"
            />
          )}
          
          {/* Preload Spline iframe during preloader phase */}
          {showPreloader && (
            <iframe
              src="/spline-background.html"
              style={{
                position: 'absolute',
                top: '-9999px',
                left: '-9999px',
                width: '1px',
                height: '1px',
                opacity: 0,
                pointerEvents: 'none',
                border: 'none',
                overflow: 'hidden'
              }}
              sandbox="allow-scripts allow-pointer-lock allow-forms allow-popups allow-same-origin"
              title="Spline Preload"
            />
          )}
          
          {/* Toast notification systems */}
          <Toaster />
          <Sonner />
          
          {/* Client-side routing with React Router v6 */}
          <BrowserRouter
            future={{
              v7_startTransition: true,      // Opt-in to React 18 concurrent features
              v7_relativeSplatPath: true     // Opt-in to new relative path resolution
            }}
          >
            <Routes>
              {/* Homepage route */}
              <Route path="/" element={<Index />} />
              {/* AI Growth Score assessment page */}
              <Route path="/ai-growth-score" element={
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>}>
                  <AIGrowthScore />
                </Suspense>
              } />
              {/* 404 fallback route */}
              <Route path="*" element={
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>}>
                  <NotFound />
                </Suspense>
              } />
            </Routes>
          </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;