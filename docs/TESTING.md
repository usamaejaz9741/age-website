# 🧪 Testing Documentation

## Overview

Comprehensive testing strategy for the AI Growth Assessment Platform, covering unit tests, integration tests, accessibility tests, and end-to-end testing.

## Table of Contents

- [Testing Strategy](#testing-strategy)
- [Unit Testing](#unit-testing)
- [Integration Testing](#integration-testing)
- [Accessibility Testing](#accessibility-testing)
- [End-to-End Testing](#end-to-end-testing)
- [Performance Testing](#performance-testing)
- [Test Configuration](#test-configuration)

---

## Testing Strategy

### Testing Pyramid

```
    /\
   /  \     E2E Tests (5%)
  /____\    
 /      \   Integration Tests (15%)
/________\  
            Unit Tests (80%)
```

### Test Categories

1. **Unit Tests**: Individual functions and components
2. **Integration Tests**: Component interactions and API calls
3. **Accessibility Tests**: WCAG compliance and screen reader support
4. **End-to-End Tests**: Complete user workflows
5. **Performance Tests**: Load times and bundle size

---

## Unit Testing

### Component Testing

```typescript
// Example: Button component test
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
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
  
  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Utility Function Testing

```typescript
// Example: Score calculation test
import { calculateResults } from './scoreCalculator';

describe('Score Calculation', () => {
  it('calculates correct overall score', () => {
    const answers = { q1: 2, q2: 3, q3: 1 };
    const result = calculateResults(answers);
    
    expect(result.score).toBe(67);
    expect(result.band).toBe('Experimenter');
  });
  
  it('handles invalid input gracefully', () => {
    const invalidAnswers = { q1: 'invalid', q2: 5 };
    expect(() => calculateResults(invalidAnswers)).toThrow('Invalid input');
  });
});
```

---

## Integration Testing

### API Integration Tests

```typescript
// Example: Supabase integration test
import { saveUserSubmission } from './database';

describe('Database Integration', () => {
  it('saves user submission successfully', async () => {
    const submission = {
      email: 'test@example.com',
      score: 75,
      band: 'Accelerator',
      dimensions: { strategy: 80, implementation: 70, data: 75, culture: 80 }
    };
    
    const result = await saveUserSubmission(submission);
    expect(result.success).toBe(true);
    expect(result.id).toBeDefined();
  });
  
  it('handles database errors gracefully', async () => {
    const invalidSubmission = { email: 'invalid' };
    
    const result = await saveUserSubmission(invalidSubmission);
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
```

### Component Integration Tests

```typescript
// Example: Quiz flow integration test
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QuizFlow } from './QuizFlow';

describe('Quiz Flow Integration', () => {
  it('completes full quiz flow', async () => {
    render(<QuizFlow />);
    
    // Answer first question
    fireEvent.click(screen.getByLabelText('Option 1'));
    fireEvent.click(screen.getByText('Next'));
    
    // Answer second question
    fireEvent.click(screen.getByLabelText('Option 2'));
    fireEvent.click(screen.getByText('Next'));
    
    // Complete quiz
    fireEvent.click(screen.getByText('Complete Quiz'));
    
    await waitFor(() => {
      expect(screen.getByText('Quiz Complete')).toBeInTheDocument();
    });
  });
});
```

---

## Accessibility Testing

### Automated Accessibility Tests

```typescript
// Example: Accessibility test with jest-axe
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MyComponent } from './MyComponent';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<MyComponent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('should have proper heading structure', () => {
    render(<MyComponent />);
    
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();
  });
  
  it('should support keyboard navigation', () => {
    render(<MyComponent />);
    
    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();
  });
});
```

---

## End-to-End Testing

### Playwright E2E Tests

```typescript
// Example: Complete assessment flow E2E test
import { test, expect } from '@playwright/test';

test('complete AI assessment flow', async ({ page }) => {
  // Navigate to assessment
  await page.goto('/ai-growth-score');
  
  // Complete quiz
  await page.click('[data-testid="quiz-start"]');
  
  for (let i = 1; i <= 12; i++) {
    await page.click(`[data-testid="question-${i}-option-2"]`);
    await page.click('[data-testid="next-question"]');
  }
  
  // Submit email
  await page.fill('[data-testid="email-input"]', 'test@example.com');
  await page.check('[data-testid="consent-checkbox"]');
  await page.click('[data-testid="submit-email"]');
  
  // Verify results
  await expect(page.locator('[data-testid="results-score"]')).toBeVisible();
  await expect(page.locator('[data-testid="results-band"]')).toContainText('Experimenter');
});
```

---

## Performance Testing

### Bundle Size Testing

```typescript
// Example: Bundle size test
import { getBundleSize } from './bundleAnalyzer';

describe('Bundle Size Tests', () => {
  it('should not exceed size limits', () => {
    const bundleSize = getBundleSize();
    
    expect(bundleSize.main).toBeLessThan(500000); // 500KB
    expect(bundleSize.vendor).toBeLessThan(1000000); // 1MB
  });
});
```

### Performance Metrics

```typescript
// Example: Performance test
import { measurePerformance } from './performanceUtils';

describe('Performance Tests', () => {
  it('should load within performance budget', async () => {
    const metrics = await measurePerformance('/');
    
    expect(metrics.firstContentfulPaint).toBeLessThan(1500);
    expect(metrics.largestContentfulPaint).toBeLessThan(2500);
    expect(metrics.cumulativeLayoutShift).toBeLessThan(0.1);
  });
});
```

---

## Test Configuration

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### Test Setup

```typescript
// src/setupTests.ts
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

configure({ testIdAttribute: 'data-testid' });

// Mock environment variables
process.env.VITE_SUPABASE_URL = 'https://test.supabase.co';
process.env.VITE_SUPABASE_ANON_KEY = 'test-key';
```

---

**Testing Documentation Complete! 🧪**

*Comprehensive testing strategy ensuring quality and reliability of the AI Growth Assessment Platform.*
