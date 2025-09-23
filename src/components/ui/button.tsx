/**
 * Button Component
 * 
 * A versatile button component built on top of Radix UI's Slot primitive.
 * Supports multiple variants, sizes, and can be rendered as different elements.
 */

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button.variants";

/**
 * Props interface for the Button component
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Whether to render as a child component using Radix Slot */
  asChild?: boolean;
}

/**
 * Button component with multiple variants and sizes
 * 
 * @param props - Button props including variant, size, and HTML button attributes
 * @param ref - Forwarded ref to the button element
 * @returns JSX element for the button
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button };
// eslint-disable-next-line react-refresh/only-export-components
export { buttonVariants } from './button.variants';
