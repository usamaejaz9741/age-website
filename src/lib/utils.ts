/**
 * Utility Functions
 * 
 * This module provides common utility functions used throughout the application,
 * particularly for CSS class management and styling.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and merges CSS classes using clsx and tailwind-merge
 * 
 * This utility function is essential for conditional styling in React components.
 * It combines the functionality of clsx (for conditional classes) with tailwind-merge
 * (for resolving Tailwind CSS class conflicts).
 * 
 * @param inputs - Variable number of class values (strings, objects, arrays)
 * @returns string - Merged and deduplicated class string
 * 
 * @example
 * ```tsx
 * cn('px-4 py-2', 'bg-blue-500', { 'text-white': isActive })
 * // Returns: "px-4 py-2 bg-blue-500 text-white" (if isActive is true)
 * 
 * cn('px-4', 'px-6') // Returns: "px-6" (px-4 is overridden)
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
