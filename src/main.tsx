/**
 * @fileoverview Application Entry Point
 * 
 * This file serves as the main entry point for the React application. It is responsible for:
 * 1. Initializing the React root using `createRoot` for concurrent rendering.
 * 2. Importing global CSS styles to ensure a consistent design system.
 * 3. Suppressing irrelevant console warnings in production to maintain a clean console.
 * 4. Validating and logging the application's environment setup in development mode.
 * 5. Rendering the root `AppWithErrorBoundary` component to mount the application into the DOM.
 * 6. Providing a top-level try-catch block to handle catastrophic rendering errors and display a safe fallback UI.
 * 
 * @module main
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

import { createRoot } from "react-dom/client";
import "./index.css";
import { suppressConsoleWarnings } from "./lib/console-utils";
import { logSetupStatus } from "./lib/setup-checker";
import { AppWithErrorBoundary } from "./components/AppWithErrorBoundary";

// Get the root DOM element and create React root. This is the mount point for the entire application.
const rootElement = document.getElementById("root");
if (!rootElement) {
  // A critical error if the root element is not found in the HTML.
  throw new Error("Root element not found. Make sure index.html has a div with id='root'");
}

// Suppress known, non-critical console warnings in production to avoid cluttering the console.
suppressConsoleWarnings();

// In development mode, check if all required environment variables are set and log the status.
if (import.meta.env.DEV) {
  logSetupStatus();
}

// Create a React root for the main application container.
const root = createRoot(rootElement);

// Render the application within a try-catch block to handle potential initial rendering errors.
try {
  // The AppWithErrorBoundary component wraps the main App with an error boundary for robust error handling.
  root.render(<AppWithErrorBoundary />);
  
  // FOUC Prevention: Add 'loaded' class to the body and html elements once the app is ready to be displayed.
  document.documentElement.classList.add('loaded');
  document.body.classList.add('loaded');
} catch (error) {
  // Log the error to the console in development for debugging purposes.
  if (import.meta.env.DEV) {
    console.error('Error rendering app:', error);
  }
  
  // Render a safe, user-friendly fallback UI in case of a catastrophic rendering error.
  root.render(
    <div className="p-5 text-destructive font-sans">
      <h1 className="text-2xl mb-4">Application Error</h1>
      <p className="mb-2">We're experiencing technical difficulties. Please try refreshing the page.</p>
      <p className="mb-4">If the problem persists, please contact our support team.</p>
      <button 
        onClick={() => window.location.reload()} 
        className="px-4 py-2 bg-destructive text-destructive-foreground border-none rounded cursor-pointer mt-4 hover:bg-destructive/90 transition-colors"
      >
        Refresh Page
      </button>
    </div>
  );
  
  // Ensure the page becomes visible even if there's an error to avoid a blank screen.
  document.documentElement.classList.add('loaded');
  document.body.classList.add('loaded');
}