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

## Styling Conventions
- Use Tailwind CSS classes
- Follow the project's custom color scheme defined in `tailwind.config.ts`
- Custom variants are managed through `class-variance-authority`
- Use `cn()` utility from `@/lib/utils` for conditional class names

## Key Integration Points
1. Component Library:
   - All UI components are built on Radix UI primitives
   - Custom variants are defined in individual component files
   - Follow existing patterns in `/components/ui/` for new components

2. Asset Management:
   - Store images in `/src/assets/`
   - Import and use as React components
   - Example: `import heroImage from "@/assets/hero-bg.jpg"`

## Common Patterns
- Use TypeScript for type safety
- Follow existing component and hook naming conventions
- Maintain consistent file structure within component directories
- Use named exports for components
- Leverage path aliases (`@/`) for imports