/**
 * Card Components
 * 
 * A collection of card-related components for creating structured content layouts.
 * Includes Card, CardHeader, CardTitle, CardDescription, CardContent, and CardFooter.
 */

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Main card container component
 * 
 * @param props - HTML div attributes
 * @param ref - Forwarded ref to the div element
 * @returns JSX element for the card container
 */
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
));
Card.displayName = "Card";

/**
 * Card header section component
 * 
 * @param props - HTML div attributes
 * @param ref - Forwarded ref to the div element
 * @returns JSX element for the card header
 */
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

/**
 * Card title component
 * 
 * @param props - HTML heading attributes
 * @param ref - Forwarded ref to the heading element
 * @returns JSX element for the card title
 */
const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-xl font-semibold tracking-tight", className)} style={{ lineHeight: 'var(--line-height-tight)' }} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

/**
 * Card description component
 * 
 * @param props - HTML paragraph attributes
 * @param ref - Forwarded ref to the paragraph element
 * @returns JSX element for the card description
 */
const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

/**
 * Card content section component
 * 
 * @param props - HTML div attributes
 * @param ref - Forwarded ref to the div element
 * @returns JSX element for the card content
 */
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
);
CardContent.displayName = "CardContent";

/**
 * Card footer section component
 * 
 * @param props - HTML div attributes
 * @param ref - Forwarded ref to the div element
 * @returns JSX element for the card footer
 */
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
