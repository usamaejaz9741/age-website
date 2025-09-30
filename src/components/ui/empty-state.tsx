/**
 * @fileoverview Empty State Component - Consistent Empty State Messages
 * 
 * Provides consistent, user-friendly empty state displays across the application.
 * Helps guide users when no data is available.
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

/**
 * Props interface for EmptyState component
 */
interface EmptyStateProps {
  /** Icon to display */
  icon?: LucideIcon;
  /** Title for empty state */
  title: string;
  /** Description text */
  description?: string;
  /** Optional action button */
  actionLabel?: string;
  /** Action button click handler */
  onAction?: () => void;
  /** Custom className */
  className?: string;
}

/**
 * Empty State Component
 * 
 * Displays user-friendly message when no data is available.
 * Includes optional icon, description, and action button.
 * 
 * @param props - Component props
 * @returns JSX element with empty state display
 * 
 * @example
 * ```tsx
 * <EmptyState
 *   icon={Inbox}
 *   title="No submissions yet"
 *   description="Submissions will appear here once users complete the assessment"
 *   actionLabel="Refresh"
 *   onAction={() => window.location.reload()}
 * />
 * ```
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className
}: EmptyStateProps) {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 text-center",
        className
      )}
      role="status"
      aria-live="polite"
    >
      {/* Icon */}
      {Icon && (
        <div className="mb-4">
          <Icon 
            className="w-12 h-12 text-muted-foreground/40" 
            aria-hidden="true"
          />
        </div>
      )}
      
      {/* Title */}
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {title}
      </h3>
      
      {/* Description */}
      {description && (
        <p className="text-muted-foreground max-w-sm mx-auto mb-6">
          {description}
        </p>
      )}
      
      {/* Action Button */}
      {actionLabel && onAction && (
        <Button 
          onClick={onAction}
          variant="outline"
          size="default"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
