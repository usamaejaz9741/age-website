/**
 * @fileoverview Skeleton Patterns - Reusable Loading Skeletons
 * 
 * Provides pre-built skeleton patterns for common UI elements.
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

/**
 * Skeleton patterns for common use cases
 */
export const SkeletonPatterns = {
  /** Text line skeleton */
  TextLine: ({ className }: { className?: string }) => (
    <Skeleton className={cn("h-4 w-full", className)} />
  ),
  
  /** Heading skeleton */
  Heading: ({ className }: { className?: string }) => (
    <Skeleton className={cn("h-8 w-3/4", className)} />
  ),
  
  /** Card skeleton */
  Card: ({ className }: { className?: string }) => (
    <div className={cn("space-y-4 p-6", className)} role="status" aria-label="Loading card">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  ),
  
  /** Avatar skeleton */
  Avatar: ({ className }: { className?: string }) => (
    <Skeleton className={cn("h-12 w-12 rounded-full", className)} />
  ),
  
  /** Button skeleton */
  Button: ({ className }: { className?: string }) => (
    <Skeleton className={cn("h-10 w-24 rounded-md", className)} />
  ),
  
  /** Form field skeleton */
  FormField: ({ className }: { className?: string }) => (
    <div className={cn("space-y-2", className)}>
      <Skeleton className="h-4 w-24" /> {/* Label */}
      <Skeleton className="h-10 w-full" /> {/* Input */}
    </div>
  ),
  
  /** Table row skeleton */
  TableRow: ({ className }: { className?: string }) => (
    <div className={cn("flex gap-4", className)}>
      <Skeleton className="h-8 w-1/4" />
      <Skeleton className="h-8 w-2/4" />
      <Skeleton className="h-8 w-1/4" />
    </div>
  ),
};
