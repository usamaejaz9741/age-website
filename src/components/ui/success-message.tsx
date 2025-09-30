/**
 * @fileoverview Success Message Component - Consistent Success Display
 * 
 * Provides consistent, accessible success message displays.
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Props interface for SuccessMessage component
 */
interface SuccessMessageProps {
  /** Success message text */
  message: string;
  /** Variant style */
  variant?: 'inline' | 'box' | 'banner';
  /** Custom className */
  className?: string;
  /** Whether to show icon */
  showIcon?: boolean;
  /** ID for aria-describedby */
  id?: string;
}

/**
 * Success Message Component
 * 
 * Displays success messages with consistent green styling and checkmark icon.
 * Fully accessible with proper ARIA attributes.
 * 
 * @param props - Component props
 * @returns JSX element with success message
 * 
 * @example
 * ```tsx
 * <SuccessMessage
 *   message="Your assessment has been saved successfully"
 *   variant="box"
 * />
 * ```
 */
export function SuccessMessage({
  message,
  variant = 'inline',
  className,
  showIcon = true,
  id
}: SuccessMessageProps) {
  const variantStyles = {
    inline: "text-sm",
    box: "p-3 rounded-md border",
    banner: "p-4 rounded-lg border-l-4"
  };
  
  const baseClasses = cn(
    "font-medium text-green-600",
    variantStyles[variant],
    variant === 'box' && "bg-green-50 border-green-200",
    variant === 'banner' && "bg-green-50 border-green-200 border-l-green-600",
    className
  );
  
  return (
    <div
      id={id}
      className={baseClasses}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-2">
        {showIcon && variant !== 'inline' && (
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
        )}
        <p className="flex-1">{message}</p>
      </div>
    </div>
  );
}
