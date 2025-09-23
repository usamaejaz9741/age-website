/**
 * Main entry point for the Alvi Global Enterprises Website application
 * 
 * This file initializes the React application and mounts it to the DOM.
 * It sets up the root component and applies global styles.
 */

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Get the root DOM element and create React root
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found. Make sure index.html has a div with id='root'");
}

// Create React root and render the App component
const root = createRoot(rootElement);

// Add error boundary for development
try {
  root.render(<App />);
  
  // FOUC Prevention: Add loaded class when app is ready
  document.documentElement.classList.add('loaded');
  document.body.classList.add('loaded');
} catch (error) {
  // Log error securely without exposing sensitive information
  console.error('Error rendering app:', error);
  
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
