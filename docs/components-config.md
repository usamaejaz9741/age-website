# Components Configuration

## components.json

This file configures the shadcn/ui component library for the AGE website. It defines:

- **Style**: Default shadcn/ui styling
- **Framework**: React with TypeScript (no RSC)
- **Tailwind Integration**: 
  - Config file: `tailwind.config.ts`
  - CSS file: `src/index.css`
  - Base color: Slate
  - CSS variables enabled
- **Path Aliases**:
  - `@/components` → `src/components`
  - `@/lib/utils` → `src/lib/utils`
  - `@/components/ui` → `src/components/ui`
  - `@/lib` → `src/lib`
  - `@/hooks` → `src/hooks`

This configuration enables clean imports like `@/components/ui/button` throughout the application.
