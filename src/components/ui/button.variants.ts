import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-[var(--font-size-sm)] font-medium leading-none ring-offset-background transition-all duration-300 ease-gentle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:flex-shrink-0 [&_svg]:transition-colors [&_svg]:duration-300 [&_svg]:stroke-current",
  {
    variants: {
      variant: {
        default: "bg-primary !text-white hover:bg-primary/90 shadow-soft hover:shadow-medium",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-primary bg-background !text-primary hover:bg-primary hover:!text-white",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "!text-primary underline-offset-4 hover:underline",
        cta: "bg-primary !text-white hover:bg-primary/90 shadow-medium hover:shadow-strong transform hover:-translate-y-0.5 font-semibold",
        "cta-secondary": "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-medium hover:shadow-strong transform hover:-translate-y-0.5 font-semibold",
        "cta-outline": "border-2 border-primary !text-primary hover:bg-primary hover:!text-white shadow-soft hover:shadow-medium transform hover:-translate-y-0.5 font-semibold",
      },
      size: {
        default: "h-10 min-h-[44px] px-4 py-2",        // 44px height (meets touch target)
        sm: "h-9 min-h-[44px] px-3",                   // 44px height (meets touch target)
        lg: "h-12 min-h-[48px] px-8",                  // 48px height (enhanced touch target)
        xl: "h-16 min-h-[64px] px-10 text-[var(--font-size-lg)]",        // 64px height (extra emphasis)
        icon: "h-11 w-11 min-h-[44px] min-w-[44px]",  // 44px square (meets touch target)
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);