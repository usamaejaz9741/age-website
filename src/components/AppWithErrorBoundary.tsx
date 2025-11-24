import ErrorBoundary from './ErrorBoundary';
import App from '../App';

/**
 * @fileoverview App with Error Boundary
 *
 * This component wraps the main App component with an ErrorBoundary to provide
 * application-wide error handling. It catches JavaScript errors anywhere in
 * the component tree and displays a fallback UI instead of crashing the app.
 *
 * @component
 * @returns {JSX.Element} The wrapped App component.
 * @example
 * ```tsx
 * <AppWithErrorBoundary />
 * ```
 *
 * @features
 * - Catches JavaScript errors in the component tree
 * - Displays a fallback UI on error
 * - Prevents application crashes from unhandled exceptions
 *
 */
export const AppWithErrorBoundary = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
