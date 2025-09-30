# 📘 TypeScript Documentation

## Overview

This document provides comprehensive TypeScript documentation for the Alvi Global Enterprises AI Growth Assessment Platform, including type definitions, interfaces, and best practices.

## Table of Contents

- [Type Definitions](#type-definitions)
- [Interface Documentation](#interface-documentation)
- [Utility Types](#utility-types)
- [API Types](#api-types)
- [Component Props](#component-props)
- [Best Practices](#best-practices)
- [Type Guards](#type-guards)
- [Generic Types](#generic-types)

---

## Type Definitions

### Core Application Types

```typescript
// types/index.ts

/**
 * Maturity bands for AI growth assessment
 */
export type MaturityBand = 'Explorer' | 'Experimenter' | 'Accelerator';

/**
 * Assessment dimensions with scores
 */
export interface AssessmentDimensions {
  /** Strategy and planning score (0-100) */
  strategy: number;
  /** Implementation and execution score (0-100) */
  implementation: number;
  /** Data and analytics score (0-100) */
  data: number;
  /** People and culture score (0-100) */
  people: number;
}

/**
 * Complete quiz results
 */
export interface QuizResults {
  /** Overall assessment score (0-100) */
  score: number;
  /** Maturity band classification */
  band: MaturityBand;
  /** Dimension breakdown */
  breakdown: AssessmentDimensions;
  /** Generated recommendations */
  recommendations?: string[];
  /** AI audit content */
  auditContent?: string;
}

/**
 * User submission data
 */
export interface UserSubmission {
  /** User's email address */
  email: string;
  /** Assessment score */
  score: number;
  /** Maturity band */
  band: MaturityBand;
  /** Dimension scores */
  dimensions: AssessmentDimensions;
  /** AI recommendations */
  recommendations?: string[];
  /** Audit content */
  auditContent?: string;
  /** Quiz answers */
  quizAnswers?: { [key: string]: number };
  /** Additional metadata */
  metadata?: {
    userAgent?: string;
    referrer?: string;
    timestamp?: string;
  };
}
```

### API Response Types

```typescript
// types/api.ts

/**
 * Standard API response wrapper
 */
export interface APIResponse<T = any> {
  /** Request success status */
  success: boolean;
  /** Response data */
  data?: T;
  /** Error message if failed */
  error?: string;
  /** Error code for programmatic handling */
  code?: string;
  /** Response timestamp */
  timestamp?: string;
}

/**
 * Database submission format
 */
export interface DatabaseSubmission {
  id: string;
  email: string;
  score: number;
  band: string;
  dimensions: string; // JSON string
  recommendations: string[] | null;
  audit_content: string | null;
  quiz_answers: string | null; // JSON string
  metadata: string | null; // JSON string
  created_at: string;
  updated_at: string;
}

/**
 * Gemini API request format
 */
export interface GeminiRequest {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
}

/**
 * Gemini API response format
 */
export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}
```

---

## Interface Documentation

### Component Props Interfaces

```typescript
// types/components.ts

/**
 * Props for the AI Growth Results component
 */
export interface AIGrowthResultsProps {
  /** Quiz results containing score, band, and dimension breakdown */
  results: QuizResults;
  /** User's email address for personalization */
  userEmail: string;
  /** UTM parameters for tracking */
  utmParams?: UTMParams;
  /** Quiz answers for context */
  quizAnswers: { [key: string]: number };
  /** Generated audit content */
  auditContent: string;
}

/**
 * Props for the Email Step component
 */
export interface EmailStepProps {
  /** Callback when email is submitted */
  onEmailSubmit: (email: string, hasConsent: boolean) => void;
  /** Loading state */
  isLoading?: boolean;
  /** Initial email value */
  initialEmail?: string;
  /** UTM parameters */
  utmParams?: UTMParams;
}

/**
 * Props for the Growth Audit Modal
 */
export interface GrowthAuditModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
}

/**
 * UTM parameters for tracking
 */
export interface UTMParams {
  utmCampaign?: string;
  utmSource?: string;
  utmMedium?: string;
  utmContent?: string;
  utmTerm?: string;
}
```

### Hook Interfaces

```typescript
// types/hooks.ts

/**
 * Options for the focus trap hook
 */
export interface UseFocusTrapOptions {
  /** Whether the focus trap is active */
  isActive?: boolean;
  /** Whether to restore focus to previously focused element */
  restoreFocus?: boolean;
  /** Custom selector for focusable elements */
  focusableSelector?: string;
}

/**
 * Return type for the focus trap hook
 */
export type UseFocusTrapReturn = React.RefObject<HTMLElement>;

/**
 * Options for form validation hook
 */
export interface UseFormValidationOptions {
  /** Initial form values */
  initialValues: Record<string, any>;
  /** Validation rules */
  validationRules: ValidationRules;
  /** Submit handler */
  onSubmit: (values: Record<string, any>) => void | Promise<void>;
}

/**
 * Validation rules structure
 */
export interface ValidationRules {
  [fieldName: string]: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => string | null;
  };
}
```

---

## Utility Types

### Common Utility Types

```typescript
// types/utils.ts

/**
 * Make all properties optional
 */
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

/**
 * Make all properties required
 */
export type Required<T> = {
  [P in keyof T]-?: T[P];
};

/**
 * Pick specific properties from a type
 */
export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

/**
 * Omit specific properties from a type
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Make all properties readonly
 */
export type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

/**
 * Extract the type of array elements
 */
export type ArrayElement<T> = T extends (infer U)[] ? U : never;

/**
 * Extract the return type of a function
 */
export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

/**
 * Extract the parameter types of a function
 */
export type Parameters<T> = T extends (...args: infer P) => any ? P : never;
```

### Application-Specific Utility Types

```typescript
// types/application.ts

/**
 * Extract dimension keys from AssessmentDimensions
 */
export type DimensionKey = keyof AssessmentDimensions;

/**
 * Extract dimension values from AssessmentDimensions
 */
export type DimensionValue = AssessmentDimensions[DimensionKey];

/**
 * Create a type with all string values
 */
export type StringRecord<T> = {
  [K in keyof T]: string;
};

/**
 * Create a type with all number values
 */
export type NumberRecord<T> = {
  [K in keyof T]: number;
};

/**
 * Create a type with all boolean values
 */
export type BooleanRecord<T> = {
  [K in keyof T]: boolean;
};

/**
 * Make specific properties optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make specific properties required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
```

---

## API Types

### Supabase Types

```typescript
// types/supabase.ts

/**
 * Supabase client configuration
 */
export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

/**
 * Supabase error response
 */
export interface SupabaseError {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
}

/**
 * Supabase response wrapper
 */
export interface SupabaseResponse<T> {
  data: T | null;
  error: SupabaseError | null;
}

/**
 * Database table row type
 */
export interface DatabaseRow {
  id: string;
  created_at: string;
  updated_at: string;
}

/**
 * User submissions table row
 */
export interface UserSubmissionsRow extends DatabaseRow {
  email: string;
  score: number;
  band: string;
  dimensions: string; // JSON
  recommendations: string[] | null;
  audit_content: string | null;
  quiz_answers: string | null; // JSON
  metadata: string | null; // JSON
}
```

### External API Types

```typescript
// types/external.ts

/**
 * Calendly prefill data
 */
export interface CalendlyPrefillData {
  name?: string;
  email?: string;
  customAnswers?: {
    [key: string]: string;
  };
}

/**
 * Calendly event data
 */
export interface CalendlyEvent {
  event_type: string;
  start_time: string;
  end_time: string;
  timezone: string;
  location?: {
    type: string;
    location: string;
  };
}

/**
 * Google Analytics event
 */
export interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

/**
 * Error tracking event
 */
export interface ErrorEvent {
  message: string;
  stack?: string;
  context?: string;
  timestamp: string;
  userAgent: string;
  url: string;
  userId?: string;
}
```

---

## Component Props

### UI Component Props

```typescript
// types/ui.ts

/**
 * Base button props
 */
export interface BaseButtonProps {
  /** Button variant */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'cta' | 'cta-secondary' | 'cta-outline';
  /** Button size */
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'icon';
  /** Whether button is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Button content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Input field props
 */
export interface InputProps {
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  /** Input value */
  value?: string;
  /** Change handler */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Whether input is required */
  required?: boolean;
  /** Input name */
  name?: string;
  /** Input ID */
  id?: string;
  /** Additional CSS classes */
  className?: string;
  /** ARIA attributes */
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
}

/**
 * Card component props
 */
export interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: () => void;
  /** Whether card is interactive */
  interactive?: boolean;
  /** Card variant */
  variant?: 'default' | 'outlined' | 'elevated';
}
```

### Layout Component Props

```typescript
// types/layout.ts

/**
 * Page template props
 */
export interface PageTemplateProps {
  /** Page title */
  pageTitle: string;
  /** Page description */
  pageDescription?: string;
  /** Page keywords */
  pageKeywords?: string;
  /** Canonical URL */
  canonicalUrl?: string;
  /** Page type for structured data */
  pageType?: string;
  /** Structured data */
  structuredData?: Record<string, any>;
  /** Custom meta tags */
  customMeta?: Array<{ name: string; content: string }>;
  /** Page content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Section template props
 */
export interface SectionTemplateProps {
  /** Section content */
  children: React.ReactNode;
  /** Section ID */
  id?: string;
  /** Background variant */
  variant?: 'default' | 'muted' | 'gradient' | 'transparent' | 'card' | 'hero' | 'accent';
  /** Padding size */
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none';
  /** Maximum width */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';
  /** Additional CSS classes */
  className?: string;
  /** Animation settings */
  animate?: boolean;
  animationDelay?: number;
  animationType?: 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';
}
```

---

## Best Practices

### Type Safety Guidelines

```typescript
// ✅ Good: Explicit typing
interface User {
  id: string;
  name: string;
  email: string;
}

const createUser = (userData: Omit<User, 'id'>): User => {
  return {
    id: generateId(),
    ...userData
  };
};

// ❌ Avoid: Any types
const createUser = (userData: any): any => {
  return {
    id: generateId(),
    ...userData
  };
};
```

### Interface Design

```typescript
// ✅ Good: Specific, focused interfaces
interface EmailValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

interface UserRegistrationData {
  email: string;
  password: string;
  confirmPassword: string;
}

// ❌ Avoid: Overly broad interfaces
interface UserData {
  email: string;
  password: string;
  confirmPassword: string;
  isValid: boolean;
  errorMessage?: string;
  // ... many other unrelated fields
}
```

### Generic Type Usage

```typescript
// ✅ Good: Reusable generic types
interface APIResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

// Usage
type UserResponse = APIResponse<User>;
type UsersResponse = APIResponse<PaginatedResponse<User>>;
```

### Union Types

```typescript
// ✅ Good: Specific union types
type LoadingState = 'idle' | 'loading' | 'success' | 'error';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

// ❌ Avoid: String unions without constraints
type Status = string;
```

---

## Type Guards

### Runtime Type Checking

```typescript
// types/guards.ts

/**
 * Type guard for MaturityBand
 */
export function isMaturityBand(value: unknown): value is MaturityBand {
  return typeof value === 'string' && 
    ['Explorer', 'Experimenter', 'Accelerator'].includes(value);
}

/**
 * Type guard for AssessmentDimensions
 */
export function isAssessmentDimensions(value: unknown): value is AssessmentDimensions {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.strategy === 'number' &&
    typeof obj.implementation === 'number' &&
    typeof obj.data === 'number' &&
    typeof obj.people === 'number' &&
    obj.strategy >= 0 && obj.strategy <= 100 &&
    obj.implementation >= 0 && obj.implementation <= 100 &&
    obj.data >= 0 && obj.data <= 100 &&
    obj.people >= 0 && obj.people <= 100
  );
}

/**
 * Type guard for QuizResults
 */
export function isQuizResults(value: unknown): value is QuizResults {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.score === 'number' &&
    obj.score >= 0 && obj.score <= 100 &&
    isMaturityBand(obj.band) &&
    isAssessmentDimensions(obj.breakdown)
  );
}

/**
 * Type guard for UserSubmission
 */
export function isUserSubmission(value: unknown): value is UserSubmission {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.email === 'string' &&
    typeof obj.score === 'number' &&
    isMaturityBand(obj.band) &&
    isAssessmentDimensions(obj.dimensions)
  );
}
```

### Utility Type Guards

```typescript
/**
 * Check if value is a string
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Check if value is a number
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Check if value is a boolean
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * Check if value is an object
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Check if value is an array
 */
export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}
```

---

## Generic Types

### Reusable Generic Interfaces

```typescript
// types/generics.ts

/**
 * Generic form field props
 */
export interface FormFieldProps<T = string> {
  value: T;
  onChange: (value: T) => void;
  error?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

/**
 * Generic API hook return type
 */
export interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Generic pagination props
 */
export interface PaginationProps<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

/**
 * Generic filter props
 */
export interface FilterProps<T> {
  filters: Partial<T>;
  onFilterChange: (filters: Partial<T>) => void;
  onClearFilters: () => void;
}

/**
 * Generic sort props
 */
export interface SortProps<T> {
  sortBy: keyof T | null;
  sortOrder: 'asc' | 'desc';
  onSortChange: (sortBy: keyof T, sortOrder: 'asc' | 'desc') => void;
}
```

### Advanced Generic Types

```typescript
/**
 * Extract keys from an object type
 */
export type KeysOf<T> = keyof T;

/**
 * Extract values from an object type
 */
export type ValuesOf<T> = T[keyof T];

/**
 * Make all properties optional except specified ones
 */
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

/**
 * Make all properties required except specified ones
 */
export type RequiredExcept<T, K extends keyof T> = Required<T> & Partial<Pick<T, K>>;

/**
 * Deep partial type
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Deep readonly type
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
```

---

## TypeScript Configuration

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    
    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    
    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    
    /* Path mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Type Checking Scripts

```json
// package.json
{
  "scripts": {
    "type-check": "tsc --noEmit",
    "type-check:watch": "tsc --noEmit --watch",
    "type-check:strict": "tsc --noEmit --strict"
  }
}
```

---

## Documentation Standards

### JSDoc Comments

```typescript
/**
 * Calculates the overall AI maturity score from dimension scores
 * 
 * @param dimensions - Object containing scores for each dimension
 * @returns The calculated overall score (0-100)
 * 
 * @example
 * ```typescript
 * const score = calculateOverallScore({
 *   strategy: 80,
 *   implementation: 70,
 *   data: 75,
 *   people: 85
 * });
 * console.log(score); // 77.5
 * ```
 * 
 * @throws {Error} When dimension scores are invalid
 * 
 * @since 1.0.0
 */
export function calculateOverallScore(dimensions: AssessmentDimensions): number {
  // Implementation
}
```

### Interface Documentation

```typescript
/**
 * Configuration options for the AI assessment system
 * 
 * @interface AssessmentConfig
 * @property {number} maxQuestions - Maximum number of questions to display
 * @property {number} timeLimit - Time limit in minutes (0 = no limit)
 * @property {boolean} allowSkipping - Whether users can skip questions
 * @property {string[]} requiredDimensions - Dimensions that must be completed
 */
export interface AssessmentConfig {
  /** Maximum number of questions to display */
  maxQuestions: number;
  /** Time limit in minutes (0 = no limit) */
  timeLimit: number;
  /** Whether users can skip questions */
  allowSkipping: boolean;
  /** Dimensions that must be completed */
  requiredDimensions: DimensionKey[];
}
```

---

## Troubleshooting

### Common TypeScript Issues

#### 1. Type Assertion Errors

```typescript
// ❌ Problem: Unsafe type assertion
const user = data as User;

// ✅ Solution: Use type guards
if (isUser(data)) {
  const user = data; // Type is now User
}

// ✅ Alternative: Use type assertion with unknown
const user = data as unknown as User;
```

#### 2. Generic Type Constraints

```typescript
// ❌ Problem: Generic without constraints
function processData<T>(data: T): T {
  return data.someProperty; // Error: Property doesn't exist
}

// ✅ Solution: Add constraints
function processData<T extends { someProperty: string }>(data: T): T {
  return data.someProperty; // OK
}
```

#### 3. Optional Property Access

```typescript
// ❌ Problem: Unsafe property access
const name = user.profile.name; // Error if profile is undefined

// ✅ Solution: Use optional chaining
const name = user.profile?.name;

// ✅ Alternative: Use nullish coalescing
const name = user.profile?.name ?? 'Unknown';
```

---

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [Advanced TypeScript Patterns](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

---

**TypeScript Documentation Complete! 📘**

*Comprehensive type safety and developer experience for the AI Growth Assessment Platform.*
