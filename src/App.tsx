/**
 * @fileoverview Main App component for Alvi Global Enterprises Website
 * 
 * This is the root component that sets up the application's core infrastructure:
 * - React Query for data fetching and caching
 * - React Router for client-side routing
 * - Helmet for SEO meta tag management
 * - Toast notifications and tooltips
 * - Preloader with intelligent loading detection
 * - FOUC (Flash of Unstyled Content) prevention
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
import { useState, useEffect } from "react";
import Preloader from "./components/Preloader";
import Index from "./pages/Index";
import AIGrowthScore from "./pages/ai-growth-score";
import NotFound from "./pages/NotFound";

/**
 * React Query client configuration
 * 
 * Provides global settings for data fetching:
 * - 5-minute stale time for cached data
 * - 3 retry attempts for failed requests
 * - Automatic background refetching
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
 * Main App Component
 * 
 * The root component that orchestrates the entire application. It provides:
 * - Global state management and data fetching
 * - Client-side routing with React Router v6
 * - SEO optimization with React Helmet
 * - Toast notifications and tooltip system
 * - Preloader with intelligent loading detection
 * - FOUC prevention for smooth user experience
 * 
 * @returns {JSX.Element} The complete application structure
 */
const App = () => {
  /** State to control preloader visibility */
  const [showPreloader, setShowPreloader] = useState(true);

  /**
   * FOUC Prevention and Font Loading Setup
   * 
   * This effect handles:
   * - Flash of Unstyled Content (FOUC) prevention
   * - Font loading detection and management
   * - DOM ready state handling
   * - Cleanup of event listeners
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
   * Handles preloader completion
   * Adds a small delay to ensure smooth transition
   */
  const handlePreloaderComplete = () => {
    setTimeout(() => {
      setShowPreloader(false);
    }, 100);
  };

  return (
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
              <Route path="/ai-growth-score" element={<AIGrowthScore />} />
              {/* 404 fallback route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;