# AI Agent Instructions for Alvi Global Enterprises Website

## Project Overview
Single-page business website showcasing AI automation and product engineering services, built with React, TypeScript, Vite, and Shadcn UI. Features a quiz-based lead generation system and seamless integration with analytics and CRM platforms.

## Architecture & Data Flows

### Core Features
1. **AI Growth Score System** (`/src/pages/ai-growth-score.tsx`)
   ```typescript
   interface QuizResults {
     score: number;
     band: 'Explorer' | 'Experimenter' | 'Accelerator';
     dimensions: {
       strategy: number;
       implementation: number;
       data: number;
       culture: number;
     };
   }
   ```
   - Multi-step form flow: Landing -> Quiz -> Email -> Results
   - UTM tracking and GA4 events (`page_view`, `quiz_start`, `quiz_complete`)
   - Personalized scoring and recommendations engine

2. **Analytics Integration**
   ```typescript
   // Event tracking pattern
   if (typeof window !== 'undefined' && window.gtag) {
     window.gtag('event', 'event_name', {
       event_category: 'category',
       event_label: 'label',
       ...utmParams
     });
   }
   ```

3. **Component System**
   - Shadcn/Radix components with custom variants
   - Business-specific components (`ServicesGrid`, `CaseStudies`, etc.)
   - Consistent animation classes (`animate-fade-in`, `animate-slide-up`)

### State Management
- React Query for data fetching and caching
- Component-local state with React hooks
- Form state with controlled inputs

## Brand Guidelines

### Color System
- Primary: `resolution-blue-600` (#0050ff)
- Primary Hover: `resolution-blue-700` (#0051ff)
- Accent: `malibu-300` (#60cdff)
- Accent Hover: `malibu-400` (#33c1fd)
- Neutrals: Black (#000) and White (#fff) with opacity variants

### Typography
- Headings (H1-H3): Kufam font family
  - Font weights: 400-900
  - Optical sizing: auto
- Body: System font stack

### Logo Usage
- Header Logo (`/public/assets/age-logos/age-logo-header.png`):
  - Fixed height: 40px (width auto)
  - Left-aligned in header
  - Preserves brand colors
  - Included padding: 8px vertical

- Footer Logo (`/public/assets/age-logos/age-logo-footer.png`):
  - Fixed height: 60px (width auto)
  - Top of footer section
  - White version for dark backgrounds
  - Included padding: 16px bottom

- Favicon System:
  - Main favicon: `/public/favicon.ico` & `/public/favicon.svg`
  - Apple Touch Icon: `/public/apple-touch-icon.png`
  - Web App Icons: 
    - `/public/web-app-manifest-192x192.png`
    - `/public/web-app-manifest-512x512.png`
  - Browser favicon: `/public/favicon-96x96.png`

### Design Tokens
```css
/* Core Brand Colors */
--resolution-blue-600: 224 100% 50%;  /* Primary */
--resolution-blue-700: 224 100% 50%;  /* Primary Hover */
--malibu-300: 199 98% 69%;           /* Accent */
--malibu-400: 198 98% 60%;           /* Accent Hover */

/* Neutrals */
--neutral-75: 0 0% 0% / 0.75;
--neutral-50: 0 0% 0% / 0.5;
--neutral-25: 0 0% 0% / 0.25;
--neutral-10: 0 0% 0% / 0.1;
```

## Key Technologies & Architecture
- React + TypeScript + Vite (running on port 8080)
- Tailwind CSS for styling with custom color schemes (resolution-blue, malibu)
- Shadcn UI component library with extended Radix UI primitives
- React Router for routing (single page with NotFound fallback)
- React Query for data management
- Lovable tagger for development mode component tracking
- Custom hooks for responsive design (`useIsMobile`)

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
  variant?: "default" | "cta" | "cta-outline" | "cta-secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "xl" | "icon";
}
```
- Extend Shadcn/Radix primitives with project-specific variants
- Use `class-variance-authority` for variant management
- Custom variants follow business naming (e.g., "cta", "cta-outline")
- All components support responsive design via Tailwind classes
- Common patterns include group-hover animations and shadows

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
   # Remove existing lockfiles if switching from Bun to npm
   Remove-Item -Force bun.lockb   # If exists
   Remove-Item -Force package-lock.json   # If exists
   
   npm install   # Install dependencies (Node.js required)
   npm run dev   # Starts dev server (default port 8080, falls back to next available) with hot reloading + component tagging
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

## Integration Points
1. **Analytics**: GA4 event tracking (page_view, quiz_complete, etc.)
2. **Lovable Platform**: Auto-commit integration at https://lovable.dev/projects/[project-id]
3. **Form Submissions**: Quiz results and email collection flow

## Development Workflow

### Local Setup
```bash
# Remove any existing lockfiles when switching from Bun
Remove-Item -Force bun.lockb   # If exists
Remove-Item -Force package-lock.json   # If exists
npm install   # Install dependencies
npm run dev   # Start dev server (port 8080)
```

### Component Creation
1. **UI Components**
   ```typescript
   // components/ui/my-component.tsx
   import { cn } from "@/lib/utils";
   import * as ComponentPrimitive from "@radix-ui/react-component";

   export const MyComponent = ({ className, ...props }) => (
     <ComponentPrimitive.Root 
       className={cn("base-styles", className)} 
       {...props} 
     />
   );
   ```

2. **Business Components**
   ```typescript
   // components/MyFeature.tsx
   const MyFeature = () => (
     <section className="relative animate-fade-in">
       <div className="max-w-7xl mx-auto px-6 py-24">
         {/* Component content */}
       </div>
     </section>
   );
   ```

### Common Patterns
- Add `@/` imports for internal modules
- Use semantic HTML (`section`, `article`, etc.)
- Follow BEM-style Tailwind classes
- Track events using GTM pattern above
- Keep variants in separate `.variants.ts` files