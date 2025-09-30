/**
 * @fileoverview Error Message Component - Consistent Error Display
 * 
 * Provides consistent, accessible error message displays across forms and components.
 * Multiple variants for different contexts.
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

import { AlertCircle, XCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Props interface for ErrorMessage component
 */
interface ErrorMessageProps {
  /** Error message text */
  message: string;
  /** Variant style */
  variant?: 'inline' | 'box' | 'banner';
  /** Severity level */
  severity?: 'error' | 'warning' | 'info';
  /** Custom className */
  className?: string;
  /** Whether to show icon */
  showIcon?: boolean;
  /** ID for aria-describedby */
  id?: string;
}

/**
 * Variant styles for error messages
 */
const variantStyles = {
  inline: "text-sm",
  box: "p-3 rounded-md border",
  banner: "p-4 rounded-lg border-l-4"
};

/**
 * Severity styles for error messages
 */
const severityStyles = {
  error: {
    text: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/20",
    borderL: "border-l-destructive",
    icon: XCircle
  },
  warning: {
    text: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    borderL: "border-l-yellow-600",
    icon: AlertTriangle
  },
  info: {
    text: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    borderL: "border-l-blue-600",
    icon: AlertCircle
  }
};

/**
 * Error Message Component
 * 
 * Displays error messages with consistent styling and accessibility.
 * Supports multiple variants and severity levels.
 * 
 * @param props - Component props
 * @returns JSX element with error message
 * 
 * @example
 * ```tsx
 * <ErrorMessage
 *   message="Please enter a valid email address"
 *   variant="box"
 *   severity="error"
 * />
 * ```
 */
export function ErrorMessage({
  message,
  variant = 'inline',
  severity = 'error',
  className,
  showIcon = true,
  id
}: ErrorMessageProps) {
  const styles = severityStyles[severity];
  const Icon = styles.icon;
  
  const baseClasses = cn(
    "font-medium",
    styles.text,
    variantStyles[variant],
    variant === 'box' && styles.bg,
    variant === 'box' && styles.border,
    variant === 'banner' && styles.bg,
    variant === 'banner' && styles.border,
    variant === 'banner' && styles.borderL,
    className
  );
  
  return (
    <div
      id={id}
      className={baseClasses}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-2">
        {showIcon && variant !== 'inline' && (
          <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
        )}
        <p className="flex-1">{message}</p>
      </div>
    </div>
  );
}
