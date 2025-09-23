/**
 * Main App component for the Alvi Global Enterprises Website
 * 
 * This component sets up the application's core providers and routing structure.
 * It includes:
 * - React Query for server state management
 * - Tooltip provider for UI components
 * - Toast notifications (both shadcn/ui and Sonner)
 * - React Router for client-side routing
 * 
 * Routes:
 * - "/" - Main landing page with marketing content
 * - "/ai-growth-score" - Interactive AI maturity assessment
 * - "*" - 404 Not Found page for invalid routes
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AIGrowthScore from "./pages/ai-growth-score";
import NotFound from "./pages/NotFound";

// Initialize React Query client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes by default
      staleTime: 5 * 60 * 1000,
      // Retry failed requests up to 3 times
      retry: 3,
    },
  },
});

/**
 * Root App component that provides global context and routing
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Toast notification systems */}
      <Toaster />
      <Sonner />
      
      {/* Client-side routing */}
      <BrowserRouter>
            <Routes>
              {/* Main landing page with marketing content and services */}
              <Route path="/" element={<Index />} />

              {/* AI Growth Score assessment page */}
              <Route path="/ai-growth-score" element={<AIGrowthScore />} />

              {/* Catch-all route for 404 errors - must be last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
