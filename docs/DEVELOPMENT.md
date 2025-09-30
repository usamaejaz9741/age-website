# 🛠️ Development Guide

## Overview

This guide provides comprehensive information for developers working on the Alvi Global Enterprises AI Growth Assessment Platform. It covers setup, development workflows, coding standards, and best practices.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Environment](#development-environment)
- [Coding Standards](#coding-standards)
- [Component Development](#component-development)
- [State Management](#state-management)
- [Testing](#testing)
- [Performance](#performance)
- [Debugging](#debugging)
- [Git Workflow](#git-workflow)
- [Code Review](#code-review)

---

## Getting Started

### Prerequisites

- **Node.js** 18.0+ (recommended: 20.0+)
- **npm** 9.0+ or **yarn** 1.22+
- **Git** 2.30+
- **VS Code** (recommended) with extensions:
  - ES7+ React/Redux/React-Native snippets
  - TypeScript Importer
  - Tailwind CSS IntelliSense
  - Prettier - Code formatter
  - ESLint

### Initial Setup

1. **Clone and Install**
   ```bash
   git clone https://github.com/alviglobal/age-website.git
   cd age-website
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Verify Setup**
   - Open `http://localhost:5173`
   - Check browser console for errors
   - Run linting: `npm run lint`

---

## Development Environment

### Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── layout/         # Layout components
│   └── features/       # Feature-specific components
├── constants/          # Application constants
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── pages/              # Page components
├── types/              # TypeScript definitions
└── styles/             # Global styles
```

### Development Scripts

```bash
# Development
npm run dev              # Start dev server with HMR
npm run build            # Production build
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run type-check       # TypeScript checking

# Testing (when implemented)
npm run test             # Run tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
```

### VS Code Configuration

Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.includeLanguages": {
    "typescript": "typescript",
    "typescriptreact": "typescriptreact"
  }
}
```

---

## Coding Standards

### TypeScript Guidelines

1. **Strict Mode**: Always use strict TypeScript configuration
2. **Type Safety**: Avoid `any` type, use proper interfaces
3. **Null Safety**: Use optional chaining and nullish coalescing
4. **Interface Naming**: Use PascalCase for interfaces, prefix with `I` if needed

```typescript
// ✅ Good
interface UserSubmission {
  email: string;
  score: number;
  band: 'Explorer' | 'Experimenter' | 'Accelerator';
}

// ❌ Avoid
interface userSubmission {
  email: any;
  score: number;
  band: string;
}
```

### React Best Practices

1. **Functional Components**: Use functional components with hooks
2. **Props Interface**: Always define props interfaces
3. **Memoization**: Use `React.memo`, `useMemo`, `useCallback` appropriately
4. **Error Boundaries**: Implement error boundaries for robust error handling

```typescript
// ✅ Good
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}

const Button = React.memo<ButtonProps>(({ variant, onClick, children }) => {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <button className={`btn btn-${variant}`} onClick={handleClick}>
      {children}
    </button>
  );
});
```

### Naming Conventions

1. **Files**: PascalCase for components, camelCase for utilities
2. **Components**: PascalCase
3. **Functions**: camelCase
4. **Constants**: UPPER_SNAKE_CASE
5. **CSS Classes**: kebab-case (Tailwind)

```typescript
// ✅ Good
// File: UserProfile.tsx
const UserProfile = () => { /* ... */ };

// File: userUtils.ts
export const formatUserName = (user: User) => { /* ... */ };

// File: constants.ts
export const MAX_RETRY_ATTEMPTS = 3;
```

---

## Component Development

### Component Structure

```typescript
/**
 * @fileoverview ComponentName - Brief description
 * 
 * Detailed component description including:
 * - Purpose and functionality
 * - Props and their types
 * - Usage examples
 * - Accessibility considerations
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props interface for ComponentName
 */
interface ComponentNameProps {
  /** Description of prop */
  propName: string;
  /** Optional prop with default */
  optionalProp?: boolean;
  /** Event handler */
  onAction?: () => void;
}

/**
 * ComponentName - Brief description
 * 
 * @param props - Component props
 * @returns JSX element
 * 
 * @example
 * ```tsx
 * <ComponentName 
 *   propName="value"
 *   onAction={() => console.log('action')}
 * />
 * ```
 */
const ComponentName = React.memo<ComponentNameProps>(({
  propName,
  optionalProp = false,
  onAction
}) => {
  // State declarations
  const [state, setState] = useState<string>('');
  
  // Event handlers with useCallback
  const handleAction = useCallback(() => {
    onAction?.();
  }, [onAction]);
  
  // Render
  return (
    <div className={cn('base-classes', optionalProp && 'conditional-classes')}>
      {/* Component content */}
    </div>
  );
});

ComponentName.displayName = 'ComponentName';

export default ComponentName;
```

### Component Guidelines

1. **Single Responsibility**: Each component should have one clear purpose
2. **Composition**: Prefer composition over inheritance
3. **Accessibility**: Include proper ARIA labels and semantic HTML
4. **Performance**: Use memoization for expensive operations
5. **Testing**: Write testable components with clear interfaces

### UI Component Development

```typescript
// Use design system constants
import { HEADING_SIZES, MARGIN_BOTTOM, CARD_PADDING } from '@/constants';

const Card = ({ title, children }: CardProps) => (
  <div className={`${CARD_PADDING.default} ${MARGIN_BOTTOM.md}`}>
    <h3 className={HEADING_SIZES.h3}>{title}</h3>
    {children}
  </div>
);
```

---

## State Management

### Local State

Use `useState` for component-local state:

```typescript
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState<UserData | null>(null);
```

### Derived State

Use `useMemo` for expensive calculations:

```typescript
const processedData = useMemo(() => {
  return data?.map(item => ({
    ...item,
    processed: true
  }));
}, [data]);
```

### Event Handlers

Use `useCallback` for event handlers passed to child components:

```typescript
const handleSubmit = useCallback((formData: FormData) => {
  // Handle submission
}, [dependency]);
```

### Custom Hooks

Create custom hooks for reusable logic:

```typescript
/**
 * Custom hook for form validation
 */
const useFormValidation = (initialValues: FormValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const validate = useCallback(() => {
    // Validation logic
  }, [values]);
  
  return { values, errors, validate, setValues };
};
```

---

## Testing

### Testing Strategy

1. **Unit Tests**: Test individual functions and components
2. **Integration Tests**: Test component interactions
3. **E2E Tests**: Test complete user workflows
4. **Accessibility Tests**: Ensure WCAG compliance

### Component Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Testing Utilities

```typescript
// test-utils.tsx
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

const customRender = (ui: React.ReactElement) =>
  render(ui, { wrapper: AllTheProviders });

export * from '@testing-library/react';
export { customRender as render };
```

---

## Performance

### Optimization Techniques

1. **Code Splitting**: Use dynamic imports for route-based splitting
2. **Lazy Loading**: Load components and images on demand
3. **Memoization**: Use React.memo, useMemo, useCallback
4. **Bundle Analysis**: Monitor bundle size and dependencies

```typescript
// Code splitting
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// Lazy loading with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <LazyComponent />
</Suspense>
```

### Performance Monitoring

```typescript
// Performance measurement
const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
};
```

### Bundle Optimization

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
        }
      }
    }
  }
});
```

---

## Debugging

### Development Tools

1. **React DevTools**: Component inspection and profiling
2. **Redux DevTools**: State management debugging
3. **Network Tab**: API call monitoring
4. **Console**: Error logging and debugging

### Debugging Techniques

```typescript
// Conditional logging
if (import.meta.env.DEV) {
  console.log('Debug info:', data);
}

// Error boundaries
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
}

// Performance profiling
const ProfiledComponent = React.Profiler(({ id, onRender }) => {
  return <Component />;
});
```

### Common Issues

1. **Memory Leaks**: Clean up event listeners and timers
2. **Infinite Re-renders**: Check dependency arrays
3. **State Updates**: Use functional updates for state
4. **Async Operations**: Handle loading and error states

---

## Git Workflow

### Branch Strategy

```
main                 # Production branch
├── develop         # Development branch
├── feature/        # Feature branches
├── bugfix/         # Bug fix branches
└── hotfix/         # Hotfix branches
```

### Commit Messages

Use conventional commits:

```
feat: add user authentication
fix: resolve memory leak in component
docs: update API documentation
style: format code with prettier
refactor: extract utility functions
test: add unit tests for validation
chore: update dependencies
```

### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make Changes and Commit**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. **Push and Create PR**
   ```bash
   git push origin feature/new-feature
   ```

4. **Code Review**: Address feedback and make changes

5. **Merge**: Squash and merge to main branch

---

## Code Review

### Review Checklist

- [ ] **Functionality**: Code works as expected
- [ ] **Performance**: No performance regressions
- [ ] **Security**: No security vulnerabilities
- [ ] **Accessibility**: WCAG compliance maintained
- [ ] **Testing**: Adequate test coverage
- [ ] **Documentation**: Code is well documented
- [ ] **Standards**: Follows coding standards

### Review Guidelines

1. **Be Constructive**: Provide helpful feedback
2. **Be Specific**: Point out exact issues
3. **Be Respectful**: Maintain professional tone
4. **Be Thorough**: Check all aspects of the code
5. **Be Timely**: Respond to reviews promptly

### Automated Checks

- **ESLint**: Code quality and style
- **TypeScript**: Type checking
- **Prettier**: Code formatting
- **Tests**: Automated test suite
- **Build**: Production build verification

---

## Troubleshooting

### Common Development Issues

#### 1. Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 2. TypeScript Errors
```bash
# Check TypeScript configuration
npm run type-check
```

#### 3. ESLint Errors
```bash
# Fix auto-fixable issues
npm run lint:fix
```

#### 4. Environment Variables
```bash
# Check environment configuration
echo $VITE_SUPABASE_URL
```

### Getting Help

- **Documentation**: Check this guide and API docs
- **Issues**: Create GitHub issue for bugs
- **Discussions**: Use GitHub discussions for questions
- **Support**: Contact support@alviglobal.com

---

## Best Practices Summary

1. **Write Clean Code**: Follow SOLID principles
2. **Test Everything**: Maintain high test coverage
3. **Document Thoroughly**: Include JSDoc comments
4. **Optimize Performance**: Monitor and optimize
5. **Ensure Accessibility**: WCAG compliance
6. **Follow Standards**: Consistent coding style
7. **Review Code**: Thorough peer review process
8. **Monitor Quality**: Use automated tools

---

## Resources

- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide)
- [Testing Library](https://testing-library.com/docs)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref)

---

**Happy Coding! 🚀**
