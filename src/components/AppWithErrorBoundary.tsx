/**
 * @file AppWithErrorBoundary.tsx
 * @description This file exports a React component that wraps the main App component with an ErrorBoundary.
 * This setup ensures that any unhandled JavaScript errors within the application are caught,
 * preventing a white screen of death and allowing a fallback UI to be displayed instead.
 * @author Alvi Global
 */
import ErrorBoundary from './ErrorBoundary';
import App from '../App';

/**
 * A root-level component that wraps the main `App` component with an `ErrorBoundary`.
 * This is a crucial part of the application's stability, providing a safety net for catching
 * rendering errors and other unhandled exceptions in the component tree.
 *
 * @returns {JSX.Element} The `App` component rendered within an `ErrorBoundary`.
 */
export const AppWithErrorBoundary = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);