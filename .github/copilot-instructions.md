# AI Agent Instructions for Age-Website

## Project Overview
This is a React-based website built with Vite, TypeScript, and Shadcn UI components. The project serves as a business website showcasing services and capabilities related to AI automation and product engineering.

## Key Technologies & Architecture
- React + TypeScript + Vite
- Tailwind CSS for styling
- Shadcn UI component library with Radix UI primitives
- Lovable tagger for development mode component tracking
- React Router for navigation
- React Query for data management
- React Hook Form + Zod for form handling

## Project Structure
- `/src/components/` - React components organized by feature
  - `/ui/` - Reusable UI components built with Shadcn/Radix
  - Main components implement business features (e.g., `Hero.tsx`, `ServicesGrid.tsx`)
- `/src/hooks/` - Custom React hooks
- `/src/lib/` - Utility functions and shared code
- `/src/pages/` - Top-level page components
- `/src/assets/` - Static assets (images, etc.)

## Component Patterns & Conventions

### UI Components
```tsx
// Example from button.tsx - Custom variant pattern
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "cta" | "cta-outline" | ...;
  size?: "default" | "sm" | "lg" | "xl";
}
```
- Extend Shadcn/Radix primitives with custom variants
- Use `class-variance-authority` for variant management
- Follow naming conventions in `ui/` directory
- Always export with named exports

### Feature Components
```tsx
// Example from Hero.tsx - Component structure pattern
const Hero = () => {
  return (
    <section className="relative min-h-screen">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero">
        <img src={heroImage} alt="..." className="opacity-10" />
      </div>
      {/* Content with animation classes */}
      <div className="animate-fade-in">...</div>
    </section>
  );
};
```
- Implement business logic and compose UI components
- Use semantic HTML elements (section, article, etc.)
- Apply consistent animation classes
- Follow BEM-style class naming in Tailwind

## Development Workflow
1. Local Development:
   ```bash
   npm run dev   # Starts dev server on port 8080 with hot reloading + component tagging
   ```

2. Building & Testing:
   ```bash
   npm run build        # Production build
   npm run build:dev    # Development build with sourcemaps
   npm run preview      # Preview production build
   npm run lint        # Run ESLint checks
   ```

## Styling & Design System
- Use Tailwind CSS classes following mobile-first approach
- Custom colors and gradients defined in `tailwind.config.ts`
- Animation classes from `tailwindcss-animate`
- Follow these gradient patterns:
  ```tsx
  bg-gradient-hero    // For hero sections
  bg-gradient-card    // For card backgrounds
  ```

## Common Integration Patterns

### Component Library Integration
- All UI components built on Radix primitives
- Custom variants in component files
- Follow patterns in `components/ui/`
- Example new component:
  ```tsx
  import { cn } from "@/lib/utils";
  import * as RadixPrimitive from "@radix-ui/react-component";
  
  export const Component = ({ className, ...props }) => {
    return <RadixPrimitive.Root className={cn("base-styles", className)} {...props} />;
  };
  ```

### Asset Management
- Store images in `src/assets/`
- Import and use as React components
- Example: `import heroImage from "@/assets/hero-bg.jpg"`

## Critical Patterns & Conventions
- Use TypeScript with strict mode
- Always use named exports
- Path aliases with `@/` prefix
- Consistent file structure:
  - Components in PascalCase
  - Hooks prefixed with `use`
  - Utilities in camelCase
- Error handling through React Error Boundaries
- Form validation with Zod schemas

## Performance Considerations
- Use Next.js Image component for optimized images
- Implement lazy loading for routes and heavy components
- Follow React Query patterns for data caching
- Use `React.memo()` for expensive renders