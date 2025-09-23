/**
 * Input Component
 * 
 * A styled input component with consistent styling and focus states.
 * Built with accessibility and form handling in mind.
 */

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Input component with custom styling and focus states
 * 
 * @param props - Input props including type, className, and HTML input attributes
 * @param ref - Forwarded ref to the input element
 * @returns JSX element for the input
 */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-md border border-resolution-blue-600/20 bg-background/50 px-4 py-2 text-base shadow-sm transition-colors ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/60 hover:border-resolution-blue-600/40 focus:border-resolution-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-resolution-blue-600 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
