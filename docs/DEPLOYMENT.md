# 🚀 Deployment Guide

## Overview

This guide covers the complete deployment process for the Alvi Global Enterprises AI Growth Assessment Platform, from development to production environments.

## Table of Contents

- [Deployment Architecture](#deployment-architecture)
- [Environment Setup](#environment-setup)
- [Build Process](#build-process)
- [Vercel Deployment](#vercel-deployment)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Domain Configuration](#domain-configuration)
- [Monitoring](#monitoring)
- [Rollback Procedures](#rollback-procedures)
- [Troubleshooting](#troubleshooting)

---

## Deployment Architecture

### Production Stack

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vercel CDN    │    │   Supabase      │    │   Google AI     │
│   (Frontend)    │◄──►│   (Database)    │    │   (Gemini API)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Custom Domain │    │   Row-Level     │    │   Rate Limiting │
│   (alviglobal)  │    │   Security      │    │   & Monitoring  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Infrastructure Components

- **Frontend**: Vercel (Global CDN, Edge Functions)
- **Database**: Supabase (PostgreSQL with RLS)
- **AI Service**: Google Gemini 2.0 Flash API
- **Booking**: Calendly (External service)
- **Monitoring**: Vercel Analytics + Custom logging
- **Domain**: Custom domain with SSL/TLS

---

## Environment Setup

### Prerequisites

1. **Vercel Account**: [vercel.com](https://vercel.com)
2. **Supabase Project**: [supabase.com](https://supabase.com)
3. **Google Cloud Account**: For Gemini API access
4. **Domain Provider**: For custom domain setup
5. **GitHub Repository**: Connected to Vercel

### Required Accounts

```bash
# Service accounts and API keys needed:
- Vercel: Project deployment
- Supabase: Database and authentication
- Google Cloud: Gemini API access
- Calendly: Booking integration
- Domain: DNS configuration
```

---

## Build Process

### Local Build Testing

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 3. Run type checking
npm run type-check

# 4. Run linting
npm run lint

# 5. Build for production
npm run build

# 6. Preview production build
npm run preview
```

### Build Verification

```bash
# Check build output
ls -la dist/

# Verify bundle sizes
npm run build 2>&1 | grep -E "(built in|gzip)"

# Expected output:
# dist/index.html                           16.86 kB │ gzip:  4.23 kB
# dist/assets/index-DYayzfnk.css            92.02 kB │ gzip: 15.91 kB
# dist/assets/index-BHVz2p1B.js            227.70 kB │ gzip: 50.77 kB
```

### Build Optimization

```typescript
// vite.config.ts - Production optimizations
export default defineConfig({
  build: {
    // Enable minification
    minify: 'terser',
    
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          utils: ['clsx', 'tailwind-merge']
        }
      }
    },
    
    // Source maps for debugging
    sourcemap: false, // Disable in production for security
    
    // Asset optimization
    assetsInlineLimit: 4096,
    
    // CSS code splitting
    cssCodeSplit: true
  }
});
```

---

## Vercel Deployment

### Initial Deployment

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy from project directory
   vercel
   ```

2. **Configure Project**
   ```bash
   # Follow prompts:
   # - Set up and deploy? Y
   # - Which scope? [Your account]
   # - Link to existing project? N
   # - Project name: age-website
   # - Directory: ./
   # - Override settings? N
   ```

3. **Environment Variables**
   ```bash
   # Set production environment variables
   vercel env add VITE_SUPABASE_URL production
   vercel env add VITE_SUPABASE_ANON_KEY production
   vercel env add VITE_GEMINI_API_KEY production
   vercel env add VITE_CALENDLY_USERNAME production
   ```

### Automated Deployment

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Run type checking
        run: npm run type-check
      
      - name: Build application
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### Vercel Configuration

```json
// vercel.json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm ci",
  "devCommand": "npm run dev",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.supabase.co https://generativelanguage.googleapis.com;"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## Environment Variables

### Production Environment

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Google Gemini API
VITE_GEMINI_API_KEY=your-gemini-api-key

# Calendly Integration
VITE_CALENDLY_USERNAME=your-calendly-username

# Optional: Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

### Environment Variable Security

```typescript
// Environment validation
const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'VITE_GEMINI_API_KEY',
  'VITE_CALENDLY_USERNAME'
];

const validateEnvironment = () => {
  const missing = requiredEnvVars.filter(
    envVar => !import.meta.env[envVar]
  );
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

// Call in main.tsx
validateEnvironment();
```

### Vercel Environment Setup

```bash
# Set environment variables via CLI
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production
vercel env add VITE_GEMINI_API_KEY production
vercel env add VITE_CALENDLY_USERNAME production

# Verify environment variables
vercel env ls
```

---

## Database Setup

### Supabase Configuration

1. **Create Project**
   ```sql
   -- Create Supabase project at supabase.com
   -- Note down URL and anon key
   ```

2. **Database Schema**
   ```sql
   -- Enable Row Level Security
   ALTER TABLE user_submissions ENABLE ROW LEVEL SECURITY;

   -- Create RLS policies
   CREATE POLICY "Allow anonymous inserts" ON user_submissions
     FOR INSERT WITH CHECK (true);

   CREATE POLICY "Allow users to view their own submissions" ON user_submissions
     FOR SELECT USING (auth.uid()::text = email);
   ```

3. **API Configuration**
   ```typescript
   // lib/supabase.ts
   import { createClient } from '@supabase/supabase-js';
   
   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
   const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
   
   export const supabase = createClient(supabaseUrl, supabaseKey);
   ```

### Database Migrations

```sql
-- Migration: 001_initial_schema.sql
CREATE TABLE IF NOT EXISTS user_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  band TEXT NOT NULL CHECK (band IN ('Explorer', 'Experimenter', 'Accelerator')),
  dimensions JSONB NOT NULL,
  recommendations TEXT[],
  audit_content TEXT,
  quiz_answers JSONB,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_user_submissions_email ON user_submissions(email);
CREATE INDEX idx_user_submissions_created_at ON user_submissions(created_at);
```

---

## Domain Configuration

### Custom Domain Setup

1. **Add Domain in Vercel**
   ```bash
   # Add custom domain
   vercel domains add alviglobal.com
   vercel domains add www.alviglobal.com
   ```

2. **DNS Configuration**
   ```dns
   # A Record
   @ 300 IN A 76.76.19.61
   
   # CNAME Record
   www 300 IN CNAME cname.vercel-dns.com
   
   # Optional: Subdomain
   app 300 IN CNAME cname.vercel-dns.com
   ```

3. **SSL Certificate**
   ```bash
   # Vercel automatically provisions SSL certificates
   # Verify SSL is active
   curl -I https://alviglobal.com
   ```

### Domain Verification

```bash
# Test domain resolution
nslookup alviglobal.com
dig alviglobal.com

# Test SSL certificate
openssl s_client -connect alviglobal.com:443 -servername alviglobal.com

# Test HTTPS redirect
curl -I http://alviglobal.com
# Should return 301/302 redirect to HTTPS
```

---

## Monitoring

### Vercel Analytics

```typescript
// Enable Vercel Analytics
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <Router>
        {/* App content */}
      </Router>
      <Analytics />
    </>
  );
}
```

### Custom Monitoring

```typescript
// lib/monitoring.ts
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (import.meta.env.PROD) {
    // Send to analytics service
    console.log('Event:', eventName, properties);
    
    // Example: Send to custom analytics
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: eventName, properties })
    });
  }
};

// Usage
trackEvent('assessment_completed', {
  score: 75,
  band: 'Accelerator',
  duration: 1200
});
```

### Error Tracking

```typescript
// lib/error-tracking.ts
export const trackError = (error: Error, context?: string) => {
  if (import.meta.env.PROD) {
    // Send to error tracking service (e.g., Sentry)
    console.error('Error tracked:', error, context);
    
    // Example: Send to custom error service
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        context,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      })
    });
  }
};
```

### Performance Monitoring

```typescript
// lib/performance.ts
export const measurePerformance = (name: string) => {
  if (import.meta.env.PROD && 'performance' in window) {
    const start = performance.now();
    
    return {
      end: () => {
        const duration = performance.now() - start;
        console.log(`${name} took ${duration.toFixed(2)}ms`);
        
        // Send to performance monitoring
        trackEvent('performance_metric', {
          name,
          duration,
          timestamp: Date.now()
        });
      }
    };
  }
  
  return { end: () => {} };
};

// Usage
const measure = measurePerformance('assessment_load');
// ... do work ...
measure.end();
```

---

## Rollback Procedures

### Vercel Rollback

```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]

# Rollback to specific deployment
vercel rollback https://age-website-abc123.vercel.app
```

### Database Rollback

```sql
-- If database changes need rollback
-- Restore from backup or revert migrations

-- Example: Drop problematic table
DROP TABLE IF EXISTS problematic_table;

-- Restore from backup
-- (Use Supabase dashboard or CLI)
```

### Emergency Procedures

1. **Immediate Rollback**
   ```bash
   # Quick rollback to last known good deployment
   vercel rollback --prod
   ```

2. **Disable Features**
   ```typescript
   // Feature flags for emergency disable
   const FEATURE_FLAGS = {
     AI_RECOMMENDATIONS: import.meta.env.VITE_ENABLE_AI !== 'false',
     CALENDLY_BOOKING: import.meta.env.VITE_ENABLE_CALENDLY !== 'false'
   };
   ```

3. **Maintenance Mode**
   ```typescript
   // Maintenance mode component
   const MaintenanceMode = () => (
     <div className="min-h-screen flex items-center justify-center">
       <div className="text-center">
         <h1 className="text-2xl font-bold mb-4">Maintenance Mode</h1>
         <p>We're performing scheduled maintenance. Please check back soon.</p>
       </div>
     </div>
   );
   ```

---

## Troubleshooting

### Common Deployment Issues

#### 1. Build Failures

```bash
# Check build logs
vercel logs [deployment-url]

# Common fixes:
npm ci                    # Clean install
npm run type-check       # Fix TypeScript errors
npm run lint:fix         # Fix linting issues
```

#### 2. Environment Variable Issues

```bash
# Verify environment variables
vercel env ls

# Check if variables are set
vercel env pull .env.local
```

#### 3. Database Connection Issues

```typescript
// Test database connection
const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('user_submissions')
      .select('count')
      .limit(1);
    
    if (error) throw error;
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};
```

#### 4. API Integration Issues

```typescript
// Test Gemini API
const testGeminiAPI = async () => {
  try {
    const geminiAPI = new GeminiAPI();
    const response = await geminiAPI.generateContent('Test prompt');
    console.log('Gemini API working:', response);
  } catch (error) {
    console.error('Gemini API error:', error);
  }
};
```

### Performance Issues

```bash
# Check bundle size
npm run build 2>&1 | grep -E "(gzip|kB)"

# Analyze bundle
npx vite-bundle-analyzer dist

# Check Core Web Vitals
# Use Google PageSpeed Insights or Lighthouse
```

### Security Issues

```bash
# Check security headers
curl -I https://alviglobal.com

# Verify HTTPS
openssl s_client -connect alviglobal.com:443

# Check CSP
curl -s https://alviglobal.com | grep -i "content-security-policy"
```

---

## Deployment Checklist

### Pre-Deployment

- [ ] All tests passing
- [ ] Linting and type checking clean
- [ ] Build successful locally
- [ ] Environment variables configured
- [ ] Database schema up to date
- [ ] Security headers configured
- [ ] Performance optimized

### Post-Deployment

- [ ] Site loads correctly
- [ ] All features working
- [ ] Database connections working
- [ ] API integrations working
- [ ] SSL certificate active
- [ ] Analytics tracking
- [ ] Error monitoring active
- [ ] Performance metrics good

### Monitoring

- [ ] Uptime monitoring
- [ ] Error rate monitoring
- [ ] Performance monitoring
- [ ] User analytics
- [ ] Security monitoring
- [ ] Database monitoring

---

## Support

For deployment issues:

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Supabase Support**: [supabase.com/support](https://supabase.com/support)
- **Project Support**: support@alviglobal.com
- **Documentation**: [docs.alviglobal.com](https://docs.alviglobal.com)

---

**Deployment Complete! 🚀**

*Your AI Growth Assessment Platform is now live and ready to help businesses unlock their AI potential.*
