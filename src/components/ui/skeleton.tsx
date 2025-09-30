/**
 * @fileoverview Skeleton Component - Loading Placeholders
 * 
 * Provides skeleton loading placeholders for better perceived performance.
 * Shows content structure while data loads.
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

import { cn } from "@/lib/utils";

/**
 * Skeleton loading placeholder component
 * 
 * Displays animated placeholder during content loading.
 * Improves perceived performance and user experience.
 * 
 * @param props - HTML div attributes including className
 * @returns JSX element with skeleton placeholder
 * 
 * @example
 * ```tsx
 * <Skeleton className="h-12 w-full" />
 * <Skeleton className="h-4 w-3/4" />
 * ```
 */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn("animate-pulse rounded-md bg-muted/50", className)} 
      role="status"
      aria-label="Loading content"
      aria-busy="true"
      {...props} 
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export { Skeleton };
