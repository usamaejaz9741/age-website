# 🔧 Troubleshooting Guide

## Overview

This comprehensive troubleshooting guide covers common issues, error scenarios, and solutions for the Alvi Global Enterprises AI Growth Assessment Platform. It provides step-by-step solutions for developers, administrators, and end-users.

## Table of Contents

- [Quick Reference](#quick-reference)
- [Development Issues](#development-issues)
- [Build and Deployment Issues](#build-and-deployment-issues)
- [Runtime Errors](#runtime-errors)
- [API Integration Issues](#api-integration-issues)
- [Database Issues](#database-issues)
- [Performance Issues](#performance-issues)
- [Security Issues](#security-issues)
- [Browser Compatibility](#browser-compatibility)
- [Network Issues](#network-issues)
- [Monitoring and Debugging](#monitoring-and-debugging)

---

## Quick Reference

### Emergency Procedures

| Issue | Quick Fix | Full Solution |
|-------|-----------|---------------|
| Site not loading | Check Vercel status | [Deployment Issues](#deployment-issues) |
| AI not working | Verify API keys | [API Integration Issues](#api-integration-issues) |
| Database errors | Check Supabase status | [Database Issues](#database-issues) |
| Build failures | Clear cache | [Build Issues](#build-and-deployment-issues) |
| Performance issues | Check bundle size | [Performance Issues](#performance-issues) |

### Common Error Codes

| Error Code | Description | Solution |
|------------|-------------|----------|
| `ERR_NETWORK` | Network connection failed | Check internet connection |
| `ERR_TIMEOUT` | Request timeout | Retry or check API status |
| `ERR_ABORTED` | Request cancelled | User cancelled or component unmounted |
| `ERR_INVALID_RESPONSE` | Invalid API response | Check API endpoint and data format |
| `ERR_RATE_LIMIT` | Rate limit exceeded | Wait and retry |

---

## Development Issues

### Environment Setup Problems

#### Issue: Node.js Version Mismatch
```bash
# Error: Node.js version not supported
error: The engine "node" is incompatible with this module
```

**Solution:**
```bash
# Check current Node.js version
node --version

# Install correct version (18.0+)
nvm install 20
nvm use 20

# Or use npx to run with specific version
npx --node-version=20 npm install
```

#### Issue: Package Installation Failures
```bash
# Error: npm install fails
npm ERR! peer dep missing
```

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall with legacy peer deps
npm install --legacy-peer-deps

# Or use yarn instead
yarn install
```

#### Issue: TypeScript Compilation Errors
```bash
# Error: TypeScript compilation fails
error TS2307: Cannot find module
```

**Solution:**
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Install missing type definitions
npm install --save-dev @types/node @types/react

# Check path mappings in tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Development Server Issues

#### Issue: Vite Dev Server Not Starting
```bash
# Error: Port already in use
Error: listen EADDRINUSE: address already in use :::5173
```

**Solution:**
```bash
# Kill process using port 5173
npx kill-port 5173

# Or use different port
npm run dev -- --port 3000

# Or find and kill the process
lsof -ti:5173 | xargs kill -9
```

#### Issue: Hot Module Replacement (HMR) Not Working
```bash
# Error: HMR connection failed
WebSocket connection failed
```

**Solution:**
```bash
# Check Vite configuration
# vite.config.ts
export default defineConfig({
  server: {
    hmr: {
      port: 24678,
    },
  },
});

# Or disable HMR temporarily
npm run dev -- --no-hmr
```

### Code Quality Issues

#### Issue: ESLint Errors
```bash
# Error: ESLint configuration issues
ESLint couldn't find the config
```

**Solution:**
```bash
# Check ESLint configuration
npx eslint --print-config src/main.tsx

# Fix auto-fixable issues
npm run lint:fix

# Check for missing dependencies
npm install --save-dev eslint-config-prettier
```

#### Issue: Prettier Formatting Conflicts
```bash
# Error: Prettier and ESLint conflicts
Delete `;` prettier/prettier
```

**Solution:**
```bash
# Install prettier ESLint config
npm install --save-dev eslint-config-prettier

# Update .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'prettier', // Add this
  ],
};
```

---

## Build and Deployment Issues

### Build Failures

#### Issue: Build Memory Issues
```bash
# Error: JavaScript heap out of memory
FATAL ERROR: Ineffective mark-compacts near heap limit
```

**Solution:**
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"

# Or run build with increased memory
node --max-old-space-size=4096 node_modules/.bin/vite build

# Update package.json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' vite build"
  }
}
```

#### Issue: TypeScript Build Errors
```bash
# Error: TypeScript compilation fails during build
error TS2304: Cannot find name 'React'
```

**Solution:**
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Install missing React types
npm install --save-dev @types/react @types/react-dom

# Update tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "types": ["vite/client"]
  }
}
```

#### Issue: Asset Optimization Failures
```bash
# Error: Asset optimization fails
Error: Cannot optimize image
```

**Solution:**
```bash
# Check image formats and sizes
# Ensure images are in supported formats (PNG, JPG, WebP)
# Optimize images before adding to project

# Use Vite's asset handling
import logoUrl from './logo.png?url'

# Or use dynamic imports
const logo = await import('./logo.png')
```

### Vercel Deployment Issues

#### Issue: Vercel Build Failures
```bash
# Error: Vercel build fails
Build failed: Command "npm run build" exited with 1
```

**Solution:**
```bash
# Check Vercel build logs
vercel logs [deployment-url]

# Test build locally
npm run build

# Check environment variables
vercel env ls

# Verify Node.js version in vercel.json
{
  "functions": {
    "app/api/**/*.js": {
      "runtime": "nodejs18.x"
    }
  }
}
```

#### Issue: Environment Variables Not Available
```bash
# Error: Environment variables undefined
ReferenceError: import.meta.env is not defined
```

**Solution:**
```bash
# Check environment variable names (must start with VITE_)
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key

# Verify in Vercel dashboard
vercel env pull .env.local

# Check variable access
console.log(import.meta.env.VITE_SUPABASE_URL)
```

---

## Runtime Errors

### React Component Errors

#### Issue: Component Not Rendering
```bash
# Error: Component fails to render
TypeError: Cannot read property 'map' of undefined
```

**Solution:**
```typescript
// Add null checks and default values
const MyComponent = ({ items = [] }) => {
  if (!items || !Array.isArray(items)) {
    return <div>No items available</div>;
  }
  
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};
```

#### Issue: State Update Errors
```bash
# Error: State update on unmounted component
Warning: Can't perform a React state update on an unmounted component
```

**Solution:**
```typescript
// Use cleanup in useEffect
useEffect(() => {
  let isMounted = true;
  
  const fetchData = async () => {
    const data = await api.getData();
    if (isMounted) {
      setData(data);
    }
  };
  
  fetchData();
  
  return () => {
    isMounted = false;
  };
}, []);
```

#### Issue: Memory Leaks
```bash
# Error: Memory usage increasing over time
Memory leak detected
```

**Solution:**
```typescript
// Clean up event listeners and timers
useEffect(() => {
  const handleResize = () => {
    // Handle resize
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

// Clean up intervals
useEffect(() => {
  const interval = setInterval(() => {
    // Do something
  }, 1000);
  
  return () => clearInterval(interval);
}, []);
```

### JavaScript Runtime Errors

#### Issue: Undefined Variable Errors
```bash
# Error: Variable is not defined
ReferenceError: variable is not defined
```

**Solution:**
```typescript
// Add proper variable declarations
const myVariable = 'value';

// Use optional chaining
const value = data?.property?.nested;

// Use nullish coalescing
const defaultValue = data?.value ?? 'default';
```

#### Issue: Async/Await Errors
```bash
# Error: Unhandled promise rejection
UnhandledPromiseRejectionWarning
```

**Solution:**
```typescript
// Proper error handling
try {
  const result = await asyncFunction();
  return result;
} catch (error) {
  console.error('Async operation failed:', error);
  throw error;
}

// Or use .catch()
asyncFunction()
  .then(result => {
    // Handle success
  })
  .catch(error => {
    // Handle error
  });
```

---

## API Integration Issues

### Supabase Connection Issues

#### Issue: Supabase Connection Failed
```bash
# Error: Supabase connection error
Error: Invalid API key
```

**Solution:**
```typescript
// Check Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase configuration missing');
}

// Test connection
const { data, error } = await supabase
  .from('user_submissions')
  .select('count')
  .limit(1);

if (error) {
  console.error('Supabase connection failed:', error);
}
```

#### Issue: Row Level Security (RLS) Errors
```bash
# Error: RLS policy violation
Error: new row violates row-level security policy
```

**Solution:**
```sql
-- Check RLS policies in Supabase
SELECT * FROM pg_policies WHERE tablename = 'user_submissions';

-- Create appropriate policies
CREATE POLICY "Allow anonymous inserts" ON user_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow users to view their own submissions" ON user_submissions
  FOR SELECT USING (auth.uid()::text = email);
```

### Gemini API Issues

#### Issue: Gemini API Authentication Failed
```bash
# Error: API authentication failed
Error: 401 Unauthorized
```

**Solution:**
```typescript
// Check API key configuration
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('Gemini API key not configured');
}

// Test API connection
const geminiAPI = new GeminiAPI();
try {
  const response = await geminiAPI.generateContent('Test prompt');
  console.log('API connection successful');
} catch (error) {
  console.error('API connection failed:', error);
}
```

#### Issue: Rate Limiting
```bash
# Error: Rate limit exceeded
Error: 429 Too Many Requests
```

**Solution:**
```typescript
// Implement rate limiting
const rateLimiter = {
  requests: new Map(),
  
  isAllowed(clientId: string): boolean {
    const now = Date.now();
    const clientRequests = this.requests.get(clientId) || [];
    
    // Remove requests older than 1 minute
    const recentRequests = clientRequests.filter(
      time => now - time < 60000
    );
    
    if (recentRequests.length >= 10) {
      return false;
    }
    
    recentRequests.push(now);
    this.requests.set(clientId, recentRequests);
    return true;
  }
};
```

### Calendly Integration Issues

#### Issue: Calendly Widget Not Loading
```bash
# Error: Calendly widget fails to load
Error: Failed to load Calendly widget
```

**Solution:**
```typescript
// Check Calendly configuration
const username = import.meta.env.VITE_CALENDLY_USERNAME;

if (!username) {
  console.error('Calendly username not configured');
  return;
}

// Test widget URL
const testUrl = `https://calendly.com/${username}`;
console.log('Calendly URL:', testUrl);

// Ensure proper widget initialization
useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://assets.calendly.com/assets/external/widget.js';
  script.async = true;
  document.head.appendChild(script);
  
  return () => {
    document.head.removeChild(script);
  };
}, []);
```

---

## Database Issues

### Connection Problems

#### Issue: Database Connection Timeout
```bash
# Error: Connection timeout
Error: Connection timeout after 10000ms
```

**Solution:**
```typescript
// Increase timeout settings
const supabase = createClient(url, key, {
  db: {
    schema: 'public',
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: { 'x-my-custom-header': 'my-app-name' },
  },
});

// Implement retry logic
const retryOperation = async (operation: () => Promise<any>, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
```

#### Issue: Database Query Failures
```bash
# Error: Query execution failed
Error: relation "user_submissions" does not exist
```

**Solution:**
```sql
-- Check if table exists
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'user_submissions';

-- Create table if missing
CREATE TABLE user_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  score INTEGER NOT NULL,
  band TEXT NOT NULL,
  dimensions JSONB NOT NULL,
  recommendations TEXT[],
  audit_content TEXT,
  quiz_answers JSONB,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Data Integrity Issues

#### Issue: Data Validation Failures
```bash
# Error: Data validation failed
Error: Invalid data format
```

**Solution:**
```typescript
// Implement data validation
const validateSubmission = (data: any): UserSubmission => {
  if (!data.email || typeof data.email !== 'string') {
    throw new Error('Invalid email');
  }
  
  if (typeof data.score !== 'number' || data.score < 0 || data.score > 100) {
    throw new Error('Invalid score');
  }
  
  if (!['Explorer', 'Experimenter', 'Accelerator'].includes(data.band)) {
    throw new Error('Invalid band');
  }
  
  return data as UserSubmission;
};
```

---

## Performance Issues

### Bundle Size Issues

#### Issue: Large Bundle Size
```bash
# Warning: Bundle size too large
Bundle size: 2.5MB (exceeds 1MB limit)
```

**Solution:**
```typescript
// Implement code splitting
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// Use dynamic imports
const loadModule = async () => {
  const module = await import('./heavy-module');
  return module.default;
};

// Optimize imports
import { specificFunction } from 'large-library';
// Instead of: import * from 'large-library';
```

#### Issue: Slow Initial Load
```bash
# Issue: Slow first contentful paint
FCP: 3.2s (target: <1.5s)
```

**Solution:**
```typescript
// Implement lazy loading
const LazyImage = ({ src, alt }: { src: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <img
      src={loaded ? src : 'placeholder.jpg'}
      alt={alt}
      onLoad={() => setLoaded(true)}
      loading="lazy"
    />
  );
};

// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  // Expensive rendering logic
});
```

### Memory Issues

#### Issue: Memory Leaks
```bash
# Issue: Memory usage increasing
Memory usage: 150MB (increasing over time)
```

**Solution:**
```typescript
// Clean up subscriptions
useEffect(() => {
  const subscription = eventEmitter.subscribe(handleEvent);
  
  return () => {
    subscription.unsubscribe();
  };
}, []);

// Use WeakMap for object references
const cache = new WeakMap();

// Implement proper cleanup
useEffect(() => {
  const controller = new AbortController();
  
  fetch('/api/data', { signal: controller.signal })
    .then(response => response.json())
    .then(setData);
  
  return () => {
    controller.abort();
  };
}, []);
```

---

## Security Issues

### Authentication Issues

#### Issue: CSRF Token Validation Failed
```bash
# Error: CSRF token validation failed
Error: Invalid CSRF token
```

**Solution:**
```typescript
// Implement proper CSRF protection
const getCSRFToken = () => {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
};

// Include CSRF token in requests
const submitForm = async (data: FormData) => {
  const csrfToken = getCSRFToken();
  
  const response = await fetch('/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    },
    body: JSON.stringify(data),
  });
};
```

#### Issue: XSS Vulnerabilities
```bash
# Warning: Potential XSS vulnerability
Dangerous use of innerHTML
```

**Solution:**
```typescript
// Sanitize user input
const sanitizeHtml = (input: string): string => {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

// Use safe alternatives to innerHTML
const SafeComponent = ({ content }: { content: string }) => {
  const sanitizedContent = sanitizeHtml(content);
  
  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};
```

### Data Validation Issues

#### Issue: Input Validation Bypass
```bash
# Error: Invalid input bypassed validation
Error: Malicious input detected
```

**Solution:**
```typescript
// Implement comprehensive validation
const validateInput = (input: unknown): string => {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }
  
  if (input.length > 1000) {
    throw new Error('Input too long');
  }
  
  if (/<script|javascript:|data:/i.test(input)) {
    throw new Error('Potentially malicious input detected');
  }
  
  return input.trim();
};
```

---

## Browser Compatibility

### Modern Browser Issues

#### Issue: ES6+ Features Not Supported
```bash
# Error: Arrow functions not supported
SyntaxError: Unexpected token =>
```

**Solution:**
```typescript
// Use Babel for transpilation
// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: ['> 1%', 'last 2 versions', 'not dead']
      }
    }]
  ]
};

// Or use polyfills
import 'core-js/stable';
import 'regenerator-runtime/runtime';
```

#### Issue: CSS Grid Not Supported
```bash
# Issue: CSS Grid not supported in older browsers
Grid layout not working
```

**Solution:**
```css
/* Use fallback for older browsers */
.container {
  display: flex; /* Fallback */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

/* Use @supports for progressive enhancement */
@supports (display: grid) {
  .container {
    display: grid;
  }
}
```

### Mobile Browser Issues

#### Issue: Touch Events Not Working
```bash
# Issue: Touch events not responding
Touch events not firing
```

**Solution:**
```typescript
// Add touch event support
const handleTouch = (event: TouchEvent) => {
  event.preventDefault();
  const touch = event.touches[0];
  // Handle touch
};

// Add proper touch event listeners
useEffect(() => {
  const element = ref.current;
  if (element) {
    element.addEventListener('touchstart', handleTouch, { passive: false });
    return () => {
      element.removeEventListener('touchstart', handleTouch);
    };
  }
}, []);
```

---

## Network Issues

### Connectivity Problems

#### Issue: Network Request Failures
```bash
# Error: Network request failed
Error: Failed to fetch
```

**Solution:**
```typescript
// Implement retry logic with exponential backoff
const fetchWithRetry = async (url: string, options: RequestInit, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return response;
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
};
```

#### Issue: CORS Errors
```bash
# Error: CORS policy violation
Error: Access to fetch at '...' from origin '...' has been blocked by CORS policy
```

**Solution:**
```typescript
// Configure CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://yourdomain.com',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Use proxy for development
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
```

---

## Monitoring and Debugging

### Error Tracking

#### Issue: Errors Not Being Tracked
```bash
# Issue: Errors not appearing in monitoring
No error reports in monitoring dashboard
```

**Solution:**
```typescript
// Implement error tracking
const trackError = (error: Error, context?: string) => {
  // Send to error tracking service
  if (import.meta.env.PROD) {
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        context,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      }),
    });
  }
};

// Global error handler
window.addEventListener('error', (event) => {
  trackError(event.error, 'Global error handler');
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  trackError(new Error(event.reason), 'Unhandled promise rejection');
});
```

### Performance Monitoring

#### Issue: Performance Metrics Not Available
```bash
# Issue: No performance data
Performance metrics not being collected
```

**Solution:**
```typescript
// Implement performance monitoring
const trackPerformance = (name: string, startTime: number) => {
  const endTime = performance.now();
  const duration = endTime - startTime;
  
  // Send to analytics
  if (import.meta.env.PROD) {
    fetch('/api/performance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        duration,
        timestamp: Date.now(),
      }),
    });
  }
};

// Use Performance API
const measurePerformance = (name: string, fn: () => void) => {
  const startTime = performance.now();
  fn();
  trackPerformance(name, startTime);
};
```

### Debugging Tools

#### Issue: Debugging Information Not Available
```bash
# Issue: No debugging information
Debug logs not appearing
```

**Solution:**
```typescript
// Implement debug logging
const debugLog = (message: string, data?: any) => {
  if (import.meta.env.DEV) {
    console.log(`[DEBUG] ${message}`, data);
  }
};

// Use React DevTools
// Install React Developer Tools browser extension

// Use Redux DevTools
// Install Redux DevTools browser extension

// Use Network tab in browser DevTools
// Monitor API requests and responses
```

---

## Getting Help

### Support Channels

1. **Documentation**: Check this guide and other docs
2. **GitHub Issues**: Create an issue for bugs
3. **GitHub Discussions**: Ask questions and get help
4. **Email Support**: support@alviglobal.com
5. **Community**: Join our developer community

### Reporting Issues

When reporting issues, include:

1. **Environment Information**:
   - Operating System
   - Node.js version
   - Browser version
   - Package versions

2. **Error Details**:
   - Complete error message
   - Stack trace
   - Steps to reproduce
   - Expected vs actual behavior

3. **Code Context**:
   - Relevant code snippets
   - Configuration files
   - Environment variables (sanitized)

### Emergency Contacts

- **Critical Issues**: support@alviglobal.com
- **Security Issues**: security@alviglobal.com
- **Infrastructure**: ops@alviglobal.com

---

**Troubleshooting Guide Complete! 🔧**

*Comprehensive solutions for all common issues in the AI Growth Assessment Platform.*
