# AI Agent Instructions for Age-Website

## Project Overview
This is a React-based website built with Vite, TypeScript, and Shadcn UI components. The project serves as a business website showcasing services and capabilities related to AI automation and product engineering.

## Key Technologies
- React + TypeScript + Vite
- Tailwind CSS for styling
- Shadcn UI component library with Radix UI primitives
- Lovable tagger for development mode component tracking

## Project Structure
- `/src/components/` - React components organized by feature
  - `/ui/` - Reusable UI components built with Shadcn/Radix
  - Main components directly implement business features (e.g., `Hero.tsx`, `ServicesGrid.tsx`)
- `/src/hooks/` - Custom React hooks
- `/src/lib/` - Utility functions and shared code
- `/src/pages/` - Top-level page components

## Component Patterns
1. UI Components:
   - Extend Shadcn/Radix primitives with custom variants and styles
   - Use `class-variance-authority` for variant management
   - Example: See `button.tsx` for pattern implementation

2. Feature Components:
   - Implement business logic and compose UI components
   - Follow atomic design principles
   - Use CSS module pattern with Tailwind classes
   - Example: See `Hero.tsx` for implementation pattern

## Development Workflow
1. Local Development:
   ```bash
   npm run dev
   # Starts dev server on port 8080 with hot reloading
   ```

2. Building:
   ```bash
   npm run build        # Production build
   npm run build:dev    # Development build
   npm run preview      # Preview production build
   ```

3. Code Quality:
   ```bash
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