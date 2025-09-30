/**
 * @fileoverview Loading Spinner Component - Consistent Loading States
 * 
 * Provides consistent, accessible loading indicators across the application.
 * Multiple size variants and styles for different contexts.
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Props interface for LoadingSpinner component
 */
interface LoadingSpinnerProps {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Custom className */
  className?: string;
  /** Loading message */
  message?: string;
  /** Whether to show the message */
  showMessage?: boolean;
  /** Additional description */
  description?: string;
}

/**
 * Size configurations for spinner
 */
const spinnerSizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const messageSizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

/**
 * Loading Spinner Component
 * 
 * Displays a rotating spinner with optional message for loading states.
 * Fully accessible with proper ARIA labels.
 * 
 * @param props - Component props
 * @returns JSX element with loading spinner
 * 
 * @example
 * ```tsx
 * <LoadingSpinner size="md" message="Loading data..." />
 * <LoadingSpinner size="lg" showMessage={false} />
 * ```
 */
export function LoadingSpinner({
  size = 'md',
  className,
  message = 'Loading...',
  showMessage = true,
  description
}: LoadingSpinnerProps) {
  return (
    <div 
      className={cn("flex flex-col items-center justify-center", className)}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative">
        {/* Spinning icon */}
        <Loader2 
          className={cn(
            spinnerSizes[size],
            "animate-spin text-primary",
            className
          )}
          aria-hidden="true"
        />
        
        {/* Pulse ring for emphasis */}
        <div className={cn(
          spinnerSizes[size],
          "absolute inset-0 border-2 border-primary/20 rounded-full animate-pulse"
        )} aria-hidden="true" />
      </div>
      
      {/* Loading message */}
      {showMessage && (
        <div className="text-center mt-4">
          <p className={cn(messageSizes[size], "text-muted-foreground font-medium")}>
            {message}
          </p>
          {description && (
            <p className={cn("text-sm text-muted-foreground/70 mt-1")}>
              {description}
            </p>
          )}
        </div>
      )}
      
      {/* Screen reader text */}
      <span className="sr-only">
        {message} {description ? description : ''}
      </span>
    </div>
  );
}

/**
 * Inline Loading Spinner
 * 
 * Smaller spinner for inline use in buttons and small spaces
 */
export function InlineSpinner({ className }: { className?: string }) {
  return (
    <Loader2 
      className={cn("w-4 h-4 animate-spin", className)}
      aria-hidden="true"
    />
  );
}
