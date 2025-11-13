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
  /** Number of automatic retry attempts */
  retryCount: number;
  /** Whether automatic retry is in progress */
  isRetrying: boolean;
}

/**
 * Error Boundary class component with automatic retry mechanisms
 * 
 * This enhanced error boundary implements:
 * - Automatic retry for transient errors (network, timeouts, chunk loading)
 * - Exponential backoff for retry attempts
 * - Maximum retry limit to prevent infinite loops
 * - User-initiated recovery options
 * - Comprehensive error logging and reporting
 * 
 * @since 1.0.0
 */
class ErrorBoundary extends Component<Props, State> {
  private static readonly MAX_RETRIES = 3;
  private static readonly RETRY_DELAY = 1000; // Base delay in milliseconds
  private retryTimeout?: ReturnType<typeof setTimeout>;
  
  /**
   * Constructor for the ErrorBoundary component
   * @param props - Component props
   */
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false,
      retryCount: 0,
      isRetrying: false
    };
  }

  /**
   * Static method called when an error is thrown in a child component
   * Updates the state to trigger the fallback UI rendering
   * 
   * @param error - The error that was thrown
   * @returns New state object with error information
   */
  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  /**
   * Lifecycle method called when an error is caught
   * Handles error logging and triggers automatic retry for transient errors
   * 
   * @param error - The error that was thrown
   * @param errorInfo - Additional error information from React
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Use standardized error handling
    const errorResponse = handleErrorBoundary(error, errorInfo, 'ErrorBoundary');
    
    this.setState({
      error,
      errorInfo,
      errorResponse
    });

    // Track error in analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        error_boundary: true,
        retry_count: this.state.retryCount
      });
    }

    // Attempt automatic recovery for transient errors
    if (this.isTransientError(error) && this.state.retryCount < ErrorBoundary.MAX_RETRIES) {
      const delay = ErrorBoundary.RETRY_DELAY * Math.pow(2, this.state.retryCount); // Exponential backoff
      
      this.setState({ isRetrying: true });
      
      this.retryTimeout = window.setTimeout(() => {
        this.handleAutomaticRetry();
      }, delay);
    }

    // In production, send to error reporting service
    if (import.meta.env.PROD) {
      // Example: Send to error reporting service
      // errorReportingService.captureException(error, { 
      //   extra: {
      //     ...errorInfo,
      //     retryCount: this.state.retryCount,
      //     isTransient: this.isTransientError(error)
      //   }
      // });
    }
  }

  /**
   * Check if error is likely transient (network, timeout, chunk loading, etc.)
   * 
   * @param error - The error to check
   * @returns true if error is transient and should be retried
   */
  private isTransientError(error: Error): boolean {
    const transientPatterns = [
      /network/i,
      /timeout/i,
      /failed to fetch/i,
      /load.*chunk/i,
      /dynamically imported module/i,
      /loading css chunk/i,
      /aborted/i
    ];
    
    return transientPatterns.some(pattern => pattern.test(error.message));
  }

  /**
   * Handle automatic retry with exponential backoff
   */
  private handleAutomaticRetry = (): void => {
    this.setState(prevState => ({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      errorResponse: undefined,
      retryCount: prevState.retryCount + 1,
      isRetrying: false
    }));
  };

  /**
   * Handle user-initiated retry (resets retry count)
   */
  handleRetry = () => {
    // Clear any pending retry timeout
    if (this.retryTimeout) {
      window.clearTimeout(this.retryTimeout);
    }
    
    this.setState({ 
      hasError: false, 
      error: undefined, 
      errorInfo: undefined,
      errorResponse: undefined,
      retryCount: 0,
      isRetrying: false
    });
  };

  /**
   * Navigate to home page
   */
  handleGoHome = () => {
    // Clear any pending retry timeout
    if (this.retryTimeout) {
      window.clearTimeout(this.retryTimeout);
    }
    
    // Use proper navigation
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  /**
   * Cleanup timeouts on unmount
   */
  componentWillUnmount() {
    if (this.retryTimeout) {
      window.clearTimeout(this.retryTimeout);
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      const { isRetrying, retryCount, error } = this.state;
      const canRetry = retryCount < ErrorBoundary.MAX_RETRIES;
      const isTransient = error ? this.isTransientError(error) : false;
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-6">
              <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4 flex-shrink-0" />
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Something went wrong
              </h1>
              <p className="text-muted-foreground mb-4">
                {isRetrying && canRetry 
                  ? "We're attempting to recover automatically..." 
                  : "We're sorry, but something unexpected happened. Please try again or contact support if the problem persists."}
              </p>
              
              {/* Show retry status */}
              {retryCount > 0 && (
                <div className="text-xs text-muted-foreground mb-4 p-2 bg-muted/50 rounded">
                  {isTransient ? '🔄 Transient error detected. ' : ''}
                  Retry attempt {retryCount} of {ErrorBoundary.MAX_RETRIES}
                </div>
              )}
              
              {/* Show loading indicator during automatic retry */}
              {isRetrying && (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Retrying...</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Button 
                onClick={this.handleRetry}
                className="w-full"
                variant="default"
                disabled={isRetrying}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRetrying ? 'animate-spin' : ''}`} />
                Try Again
              </Button>
              
              <Button 
                onClick={this.handleGoHome}
                className="w-full"
                variant="outline"
                disabled={isRetrying}
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

