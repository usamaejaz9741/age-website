/**
 * @fileoverview Application Entry Point
 * 
 * Main entry point for the Alvi Global Enterprises Website application.
 * Initializes React, sets up global configurations, and mounts the application
 * to the DOM with comprehensive error handling and development tools.
 * 
 * @module main
 * @author Alvi Global Enterprises
 * @version 1.0.0
 * 
 * @features
 * - ⚛️ React 18 with createRoot for optimal performance
 * - 🎨 Global CSS styles and design system
 * - 🔇 Console warning suppression for clean development
 * - 🔧 Setup status validation and logging
 * - 🛡️ Comprehensive error boundaries and fallback UI
 * - 🎭 FOUC prevention with loaded class management
 * - 📱 Mobile-optimized responsive design
 */

import { createRoot } from "react-dom/client";
import "./index.css";
import { suppressConsoleWarnings } from "./lib/console-utils";
import { logSetupStatus } from "./lib/setup-checker";
import { AppWithErrorBoundary } from "./components/AppWithErrorBoundary";

// Get the root DOM element and create React root
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found. Make sure index.html has a div with id='root'");
}

// Suppress console warnings in production
suppressConsoleWarnings();

// Check setup status in development
if (import.meta.env.DEV) {
  logSetupStatus();
}

// Create React root and render the App component
const root = createRoot(rootElement);

// Add error boundary for development
try {
  root.render(<AppWithErrorBoundary />);
  
  // FOUC Prevention: Add loaded class when app is ready
  document.documentElement.classList.add('loaded');
  document.body.classList.add('loaded');
} catch (error) {
  // Log error securely without exposing sensitive information
  if (import.meta.env.DEV) {
    console.error('Error rendering app:', error);
  }
  
  // Render secure error page without exposing internal details
  root.render(
    <div style={{ padding: '20px', color: '#dc2626', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Application Error</h1>
      <p>We're experiencing technical difficulties. Please try refreshing the page.</p>
      <p>If the problem persists, please contact our support team.</p>
      <button 
        onClick={() => window.location.reload()} 
        style={{ 
          padding: '8px 16px', 
          backgroundColor: '#dc2626', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '16px'
        }}
      >
        Refresh Page
      </button>
    </div>
  );
  
  // Still add loaded class even on error to prevent permanent hiding
  document.documentElement.classList.add('loaded');
  document.body.classList.add('loaded');
}