/**
 * Main entry point for the AGE Website application
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
} catch (error) {
  console.error('Error rendering app:', error);
  root.render(
    <div style={{ padding: '20px', color: 'red' }}>
      <h1>Error Loading Application</h1>
      <p>Check the console for details.</p>
      <pre>{error instanceof Error ? error.message : String(error)}</pre>
    </div>
  );
}
