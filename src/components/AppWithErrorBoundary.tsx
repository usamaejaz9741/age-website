import ErrorBoundary from './ErrorBoundary';
import App from '../App';

/**
 * App component wrapped with ErrorBoundary for application-wide error handling
 */
export const AppWithErrorBoundary = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
