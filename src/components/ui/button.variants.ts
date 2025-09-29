import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium leading-none ring-offset-background transition-all duration-300 ease-gentle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:flex-shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-medium",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-primary bg-background hover:bg-primary hover:text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        cta: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-medium hover:shadow-strong transform hover:-translate-y-0.5 font-semibold [&>svg]:text-primary-foreground",
        "cta-secondary": "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-medium hover:shadow-strong transform hover:-translate-y-0.5 font-semibold",
        "cta-outline": "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-soft hover:shadow-medium transform hover:-translate-y-0.5 font-semibold",
      },
      size: {
        default: "h-10 px-4 py-2",        // 40px height
        sm: "h-9 px-3",                   // 36px height (4px smaller - mathematical progression)
        lg: "h-11 px-8",                  // 44px height (4px larger - mathematical progression)
        xl: "h-14 px-8 text-base",        // 56px height (12px larger for emphasis)
        icon: "h-10 w-10",                // 40px square
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);