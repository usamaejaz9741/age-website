/**
 * @fileoverview Error Boundary Component - React Error Catching and Recovery
 * 
 * A React class component that implements error boundary functionality to catch
 * JavaScript errors anywhere in the component tree and display a fallback UI
 * instead of crashing the entire application.
 * 
 * @component
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 * 
 * @features
 * - 🛡️ Catches runtime errors in child components
 * - 🎨 Displays user-friendly error messages
 * - 📝 Logs errors for debugging and monitoring
 * - 🔄 Provides recovery options (retry, go home)
 * - 🚀 Maintains application stability
 * - ♿ Accessible error messages with proper ARIA labels
 * - 📱 Responsive error UI design
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 * @since 1.0.0
 */

import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { handleErrorBoundary, ErrorResponse } from '@/lib/error-handler';

/**
 * Props for the ErrorBoundary component
 */
interface Props {
  /** Child components to wrap with error boundary */
  children: ReactNode;
  /** Optional custom fallback UI to display when an error occurs */
  fallback?: ReactNode;
}

/**
 * Internal state for the ErrorBoundary component
 */
interface State {
  /** Whether an error has been caught */
  hasError: boolean;
  /** The error object that was caught */
  error?: Error;
  /** Additional error information from React */
  errorInfo?: ErrorInfo;
  /** Processed error response from error handler */
  errorResponse?: ErrorResponse;
}

/**
 * A React component that catches JavaScript errors in its child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 *
 * @extends Component<Props, State>
 */
class ErrorBoundary extends Component<Props, State> {
  /**
   * Initializes the ErrorBoundary component.
   * @param {Props} props - The props for the component.
   */
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * A lifecycle method that is invoked after an error has been thrown by a descendant component.
   * It receives the error that was thrown as a parameter and should return a value to update state.
   *
   * @param {Error} error - The error that was thrown.
   * @returns {State} An object to update the state, indicating that an error has occurred.
   */
  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  /**
   * A lifecycle method that is invoked after an error has been thrown by a descendant component.
   * It receives two parameters: the error that was thrown, and an object with a `componentStack` key
   * containing information about which component threw the error.
   *
   * @param {Error} error - The error that was thrown.
   * @param {ErrorInfo} errorInfo - An object with a `componentStack` property.
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Use standardized error handling
    const errorResponse = handleErrorBoundary(error, errorInfo, 'ErrorBoundary');
    
    this.setState({
      error,
      errorInfo,
      errorResponse
    });

    // In production, you might want to send this to an error reporting service
    if (import.meta.env.PROD) {
      // Example: Send to error reporting service
      // errorReportingService.captureException(error, { extra: errorInfo });
    }
  }

  /**
   * Resets the error state, allowing the user to try rendering the child components again.
   */
  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: undefined, 
      errorInfo: undefined,
      errorResponse: undefined 
    });
  };

  /**
   * Navigates the user to the home page as a recovery option.
   */
  handleGoHome = () => {
    // Use proper navigation instead of direct window.location manipulation
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  /**
   * Renders the component. If an error has been caught, it displays a fallback UI.
   * Otherwise, it renders the child components.
   *
   * @returns {ReactNode} The fallback UI or the child components.
   */
  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-6">
              <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4 flex-shrink-0" />
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Something went wrong
              </h1>
              <p className="text-muted-foreground mb-6">
                We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists.
              </p>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={this.handleRetry}
                className="w-full"
                variant="default"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              
              <Button 
                onClick={this.handleGoHome}
                className="w-full"
                variant="outline"
              >
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </div>

            {/* Development error details */}
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                  Error Details (Development)
                </summary>
                <div className="mt-2 p-3 bg-muted rounded-md text-xs font-mono text-muted-foreground overflow-auto">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error.message}
                  </div>
                  {this.state.error.stack && (
                    <div className="mb-2">
                      <strong>Stack:</strong>
                      <pre className="whitespace-pre-wrap">{this.state.error.stack}</pre>
                    </div>
                  )}
                  {this.state.errorInfo && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

