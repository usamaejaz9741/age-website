# 🚀 Alvi Global Enterprises - AI Growth Assessment Platform

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/alviglobal/age-website)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0+-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> **Enterprise-grade AI Growth Assessment Platform** - Helping businesses unlock their AI potential through comprehensive assessments, personalized recommendations, and strategic guidance.

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 Development](#-development)
- [📚 Documentation](#-documentation)
- [🎨 Design System](#-design-system)
- [♿ Accessibility](#-accessibility)
- [🔒 Security](#-security)
- [📊 Performance](#-performance)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🎯 Overview

The **Alvi Global Enterprises AI Growth Assessment Platform** is a comprehensive, enterprise-grade web application designed to help businesses evaluate their AI maturity and receive personalized recommendations for growth. Built with modern web technologies and enterprise-grade practices.

### What This Platform Does

1. **AI Maturity Assessment**: Interactive 12-question quiz evaluating AI capabilities across four dimensions:
   - 📊 **Strategy**: AI vision, executive alignment, business integration
   - 🔧 **Implementation**: Technical capabilities, methodology, execution
   - 📈 **Data**: Data quality, governance, analytics readiness
   - 👥 **Culture**: AI literacy, change management, ethics

2. **Personalized Recommendations**: AI-powered insights using Google Gemini 2.0 Flash
   - Dynamic recommendations based on assessment scores
   - Actionable next steps with ROI projections
   - Implementation timelines and resource requirements

3. **Professional Consultation**: Seamless Calendly integration for expert guidance
   - One-click booking with pre-filled user data
   - UTM tracking for marketing attribution
   - Automated follow-up workflows

4. **Data Persistence**: Secure storage with multiple fallback layers
   - Primary: Supabase PostgreSQL with Row-Level Security
   - Fallback: Browser localStorage with 90-day retention
   - Export: CSV export for analysis and reporting

### Key Capabilities

- ✅ **Real-time Score Calculation**: Instant feedback with dimension-specific breakdown
- ✅ **AI-Generated Audits**: Comprehensive 2000+ word audit reports
- ✅ **Email Capture & Consent**: GDPR-compliant data collection
- ✅ **Offline Capability**: Works without database using localStorage
- ✅ **Performance Optimized**: Sub-2s load times, 50KB bundle
- ✅ **Fully Accessible**: WCAG 2.1 AAA compliant

## ✨ Features

### 🎯 Core Functionality
- **Interactive AI Assessment**: 12 carefully crafted questions across 4 dimensions
  - Each question scored on 0-3 scale (No implementation → Advanced)
  - Real-time progress tracking with visual indicators
  - Smart navigation with validation
  
- **Real-time Score Calculation**: Sophisticated scoring algorithm
  - Overall maturity percentage (0-100%)
  - Band classification (Explorer, Experimenter, Accelerator)
  - Dimension-specific breakdown
  - Mathematical validation and bounds checking

- **AI-Powered Recommendations**: Intelligent insights using Gemini 2.0 Flash
  - Personalized based on quiz responses
  - Actionable next steps with priorities
  - Fallback recommendations if AI unavailable
  - Rate limiting and error handling

- **Professional Consultation**: Seamless Calendly integration
  - One-click booking with pre-filled data
  - UTM parameter tracking
  - Multiple booking sources (modal, header, results page)
  - Focus management for accessibility

- **Data Management**: Multi-layer persistence strategy
  - Primary: Supabase PostgreSQL with RLS
  - Fallback: localStorage with 90-day retention
  - Progressive quota handling (100 → 50 → 10 → 1 submissions)
  - CSV export functionality

### 🎨 User Experience
- **Responsive Design**: Mobile-first approach
  - Breakpoint: 768px (use-mobile hook)
  - Touch-optimized interactions (44px minimum targets)
  - Adaptive layouts and components

- **Smooth Animations**: 60fps performance
  - Scroll-triggered animations (Intersection Observer)
  - Animated counters with easing functions
  - Smooth page transitions
  - GPU-accelerated transforms

- **Loading States**: Comprehensive feedback
  - Intelligent preloader (1.2-4s adaptive)
  - Skeleton screens for content loading
  - Progress indicators for operations
  - Error boundaries with recovery options

- **Accessibility**: WCAG 2.1 AAA compliance
  - Keyboard navigation (Tab, Shift+Tab, Escape, Arrow keys)
  - Screen reader support (comprehensive ARIA labels)
  - Focus traps for modals
  - Color contrast 7:1+ on all elements
  - Reduced motion support

- **Performance**: Optimized for speed
  - First Contentful Paint: <1.5s
  - Largest Contentful Paint: <2.5s
  - Bundle size: 50KB gzipped
  - Code splitting and lazy loading
  - Image optimization (eager/lazy loading strategy)

### 🔒 Enterprise Features
- **Data Security**: Multi-layer protection
  - Input sanitization (DOMPurify)
  - Email validation and sanitization
  - CSRF token protection
  - SQL injection prevention via Supabase
  - XSS prevention (Content Security Policy)

- **Rate Limiting**: API abuse prevention
  - Sliding window algorithm (5 requests per minute)
  - Per-API-key tracking
  - Exponential backoff on errors
  - User-friendly error messages

- **Error Handling**: Graceful degradation
  - Try-catch blocks with typed errors
  - Error boundaries for React components
  - Fallback UI states
  - Detailed logging in development
  - Silent logging in production (security)

- **Monitoring & Analytics**:
  - Google Analytics 4 integration
  - Performance monitoring
  - Error tracking
  - User flow analytics

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with concurrent features
- **TypeScript 5.0+** - Type-safe development
- **Vite 5.0+** - Lightning-fast build tool with SWC
- **Tailwind CSS 3.0+** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library (Radix UI primitives)

### Backend & Services
- **Supabase** - PostgreSQL database with Row-Level Security
- **Google Gemini 2.0 Flash** - AI content generation
- **Calendly API** - Professional consultation booking
- **Vercel** - Deployment and hosting platform

### Development Tools
- **Vitest** - Fast unit testing with native ESM support
- **Playwright** - End-to-end testing framework
- **ESLint** - Code linting and quality assurance
- **TypeScript** - Static type checking
- **React Testing Library** - Component testing utilities

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0+ (recommended: 20.0+)
- **npm** 9.0+ or **yarn** 1.22+
- **Git** 2.30+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/alviglobal/age-website.git
   cd age-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp env.template .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # Supabase Configuration (Required for data persistence)
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Google Gemini API (Required for AI recommendations)
   VITE_GEMINI_API_KEY=AIzaSy...your_gemini_api_key
   ```
   
   **Getting your API keys:**
   - **Supabase**: Create a project at [supabase.com](https://supabase.com) and get your URL and anon key from Project Settings → API
   - **Gemini API**: Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Set up the database** (Optional but recommended)
   
   If you're using Supabase, run these SQL scripts in your Supabase SQL Editor:
   ```bash
   # 1. Create the audit_submissions table
   # Run: database-schema-fixed-final.sql
   
   # 2. Set up Row-Level Security policies
   # Run: database-policies-fixed-final.sql
   
   # 3. Apply security fixes
   # Run: database-views-security-fix.sql
   ```

6. **Run tests to verify setup**
   ```bash
   npm run test:run
   npm run lint
   npm run type-check
   ```

7. **Open your browser**
   Navigate to `http://localhost:5173`

### Troubleshooting Setup

**Common Issues:**

1. **"Supabase not configured" warning**
   - Ensure you've copied `env.template` to `.env.local`
   - Verify your Supabase URL and anon key are correct
   - Restart the dev server after changing environment variables

2. **"Gemini API key invalid" error**
   - Get a new API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Ensure the key starts with `AIzaSy`
   - Check for any trailing spaces in your `.env.local` file

3. **Tests failing**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again
   - Clear browser cache and restart dev server

See [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md) for more solutions.

## 📁 Project Structure

```
age-website/
├── 📁 public/                     # Static assets
│   ├── 📄 favicon.svg            # Site favicon
│   ├── 📄 robots.txt             # SEO robots file
│   ├── 📄 sitemap.xml            # SEO sitemap
│   └── 📁 assets/                # Images and media files
├── 📁 src/                       # Source code
│   ├── 📁 __tests__/            # Test suites (Vitest)
│   │   ├── 📁 components/       # Component tests
│   │   ├── 📁 hooks/           # Hook tests
│   │   ├── 📁 lib/             # Library/utility tests
│   │   └── 📄 setup.ts         # Test environment setup
│   ├── 📁 components/           # React components
│   │   ├── 📁 ui/              # shadcn/ui components (60+ components)
│   │   ├── 📄 AIGrowthQuiz.tsx # Assessment quiz component
│   │   ├── 📄 AIGrowthResults.tsx # Results display component
│   │   ├── 📄 ErrorBoundary.tsx # Error handling component
│   │   ├── 📄 Header.tsx       # Navigation header
│   │   ├── 📄 Footer.tsx       # Site footer
│   │   ├── 📄 Hero.tsx         # Landing page hero
│   │   └── 📄 ...              # Other business components
│   ├── 📁 constants/            # Application constants
│   │   ├── 📄 design-system.ts # Design tokens (spacing, typography)
│   │   ├── 📄 quiz-questions.ts # Quiz content and structure
│   │   ├── 📄 messages.ts      # User-facing messages
│   │   ├── 📄 scores.ts        # Scoring thresholds
│   │   └── 📄 ...              # Other constants
│   ├── 📁 hooks/               # Custom React hooks
│   │   ├── 📄 use-mobile.tsx   # Mobile viewport detection (92.59% coverage)
│   │   ├── 📄 use-intersection-observer.ts # Scroll detection (58.33%)
│   │   ├── 📄 use-focus-trap.ts # Accessibility focus management
│   │   └── 📄 ...              # Other hooks
│   ├── 📁 lib/                 # Utility libraries
│   │   ├── 📄 utils.ts         # General utilities (100% coverage)
│   │   ├── 📄 security.ts      # Security functions (64.8% coverage)
│   │   ├── 📄 database.ts      # Supabase operations (0% coverage)
│   │   ├── 📄 storage.ts       # Data persistence (76.85% coverage)
│   │   ├── 📄 geminiAPI.ts     # AI integration (88.99% coverage)
│   │   ├── 📄 image-utils.ts   # Image optimization (100% coverage)
│   │   ├── 📄 console-utils.ts # Logging utilities (60.81% coverage)
│   │   ├── 📄 error-handler.ts # Error handling (98.08% coverage)
│   │   ├── 📄 quiz-helpers.ts  # Quiz calculations (100% coverage)
│   │   └── 📄 ...              # Other utilities
│   ├── 📁 pages/               # Page components
│   │   ├── 📄 Index.tsx        # Landing page
│   │   ├── 📄 ai-growth-score.tsx # Assessment page
│   │   └── 📄 NotFound.tsx     # 404 error page
│   ├── 📁 types/               # TypeScript type definitions
│   │   ├── 📄 quiz.ts          # Quiz-related types
│   │   ├── 📄 gemini.d.ts      # Gemini API types
│   │   └── 📄 gtag.d.ts        # Google Analytics types
│   └── 📄 main.tsx             # Application entry point
├── 📁 e2e/                      # End-to-end tests (Playwright)
│   └── 📄 ai-growth-assessment.spec.ts
├── 📁 docs/                     # Comprehensive documentation
│   ├── 📄 DEVELOPMENT.md       # Development guide
│   ├── 📄 TESTING.md           # Testing strategy
│   ├── 📄 DEPLOYMENT.md        # Deployment instructions
│   ├── 📄 API.md               # API documentation
│   └── 📄 ...                  # Other guides
├── 📄 package.json             # Dependencies and npm scripts
├── 📄 tsconfig.json            # TypeScript configuration
├── 📄 vite.config.ts           # Vite build configuration
├── 📄 vitest.config.ts         # Vitest test configuration
├── 📄 playwright.config.ts     # Playwright E2E configuration
├── 📄 tailwind.config.ts       # Tailwind CSS configuration
├── 📄 eslint.config.js         # ESLint configuration
└── 📄 README.md                # This file
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server (Vite)
npm run build            # Build for production
npm run build:dev        # Build in development mode
npm run preview          # Preview production build locally

# Code Quality
npm run lint             # Run ESLint on all files
npm run type-check       # Run TypeScript type checking
npm run audit            # Run security audit
npm run security-check   # Check environment security

# Testing
npm run test             # Run tests in watch mode
npm run test:run         # Run all tests once
npm run test:ui          # Open Vitest UI
npm run test:coverage    # Run tests with coverage report
npm run test:e2e         # Run Playwright E2E tests
npm run test:e2e:ui      # Open Playwright UI
npm run test:e2e:headed  # Run E2E tests with browser visible
npm run test:all         # Run all tests (unit + E2E)
```

### Development Guidelines

1. **Code Style**
   - Use TypeScript for all new code (strict mode enabled)
   - Follow ESLint configuration (zero errors policy)
   - Write comprehensive JSDoc comments for all public functions
   - Write meaningful commit messages (conventional commits recommended)

2. **Component Development**
   - Use functional components with hooks
   - Implement proper TypeScript interfaces and prop types
   - Add comprehensive JSDoc documentation
   - Follow accessibility guidelines (WCAG 2.1 Level AAA)
   - Include unit tests for business logic
   - Use React.memo() for expensive components

3. **Testing Requirements**
   - Write tests for all new functions and components
   - Maintain >70% test coverage for critical business logic
   - Follow existing test patterns (see `src/__tests__/` for examples)
   - Run `npm run test:run` before committing
   - Ensure E2E tests pass with `npm run test:e2e`

4. **Performance**
   - Use React.memo for expensive components
   - Implement proper dependency arrays in hooks
   - Optimize bundle size (current: ~50KB gzipped)
   - Use lazy loading for non-critical routes
   - Profile with React DevTools before major changes

## 📚 Documentation

### Comprehensive Guides
All detailed documentation is available in the `docs/` directory:

- **[DEVELOPMENT.md](./docs/DEVELOPMENT.md)** - Complete development setup guide
- **[TESTING.md](./docs/TESTING.md)** - Testing strategy and guidelines
- **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Production deployment instructions
- **[API.md](./docs/API.md)** - API integration documentation
- **[ACCESSIBILITY.md](./docs/ACCESSIBILITY.md)** - WCAG compliance guide
- **[TYPESCRIPT.md](./docs/TYPESCRIPT.md)** - TypeScript patterns and best practices
- **[TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)** - Common issues and solutions
- **[MAINTENANCE.md](./docs/MAINTENANCE.md)** - Maintenance and update procedures

### Quick References
- **Test Coverage**: 16.52% overall (224 unit tests + E2E tests, all passing)
- **TypeScript**: Strict mode enabled, zero `any` types in production code
- **ESLint**: Zero errors, configured with React and TypeScript rules
- **Bundle Size**: ~150KB total, ~50KB gzipped
- **Performance**: LCP <2.5s, FID <100ms, CLS <0.1

## 🧪 Testing

### Test Infrastructure

We maintain a comprehensive test suite with multiple testing layers:

#### Unit Tests (Vitest + React Testing Library)
- **224 tests** across 13 test files
- **16.52% coverage** with focus on critical business logic
- **Test files**: `src/__tests__/**/*.test.{ts,tsx}`

**Key test suites:**
- ✅ **utils.test.ts** - CSS utility functions (15 tests, 100% coverage)
- ✅ **storage.test.ts** - Data persistence (20 tests, 76.85% coverage)
- ✅ **image-utils.test.ts** - Image optimization (19 tests, 100% coverage)
- ✅ **console-utils.test.ts** - Logging utilities (29 tests, 60.81% coverage)
- ✅ **use-mobile.test.tsx** - Mobile detection (14 tests, 92.59% coverage)
- ✅ **use-intersection-observer.test.tsx** - Scroll detection (18 tests, 58.33% coverage)
- ✅ **security.test.ts** - Security functions (24 tests)
- ✅ **error-handler.test.ts** - Error handling (26 tests, 98.08% coverage)
- ✅ **quiz-helpers.test.ts** - Quiz calculations (3 tests, 100% coverage)

#### E2E Tests (Playwright)
- **Full user flow testing** from quiz start to results
- **Cross-browser testing** (Chromium, Firefox, WebKit)
- **Visual regression testing** with screenshots
- **Network request validation**

### Running Tests

```bash
# Unit tests
npm run test              # Watch mode for development
npm run test:run          # Run once (CI mode)
npm run test:ui           # Interactive test UI
npm run test:coverage     # Generate coverage report

# E2E tests
npm run test:e2e          # Run E2E tests headless
npm run test:e2e:ui       # Interactive E2E UI
npm run test:e2e:headed   # Run with visible browser

# All tests
npm run test:all          # Run unit + E2E tests
```

### Test Coverage by Module

| Module | Coverage | Critical? | Notes |
|--------|----------|-----------|-------|
| `utils.ts` | 100% | ✅ High | Core utility functions |
| `image-utils.ts` | 100% | ✅ High | Image optimization |
| `quiz-helpers.ts` | 100% | ✅ High | Quiz score calculations |
| `error-handler.ts` | 98.08% | ✅ High | Error handling logic |
| `use-mobile.tsx` | 92.59% | ⚠️ Medium | Responsive detection |
| `geminiAPI.ts` | 88.99% | ✅ High | AI API integration |
| `storage.ts` | 76.85% | ⚠️ Medium | Data persistence |
| `security.ts` | 64.8% | ✅ High | Security functions |
| `console-utils.ts` | 60.81% | ⚠️ Low | Development tools |
| `use-intersection-observer.ts` | 58.33% | ⚠️ Low | Scroll animations |

**Coverage Goals:**
- Critical business logic: >70% coverage
- Utility functions: >80% coverage
- UI components: >50% coverage (focus on integration tests)

## 🏗️ Architecture

### Application Flow

```
┌─────────────┐
│  User Visit │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ Landing Page    │ ← Hero, Services, Case Studies, FAQ
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ Take Assessment │ ← 12 Questions, 4 Dimensions
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ Calculate Score │ ← quiz-helpers.ts (100% tested)
└──────┬──────────┘
       │
       ├─────────────────────────┐
       │                         │
       ▼                         ▼
┌─────────────┐         ┌─────────────────┐
│ Email Step  │         │ Generate AI     │
│             │────────→│ Recommendations │ ← Gemini API
└──────┬──────┘         └─────────────────┘
       │                         │
       ▼                         ▼
┌─────────────────────────────────┐
│ Display Results & Recommendations│
└──────┬──────────────────────────┘
       │
       ├──────────────┬──────────────┬─────────────┐
       │              │              │             │
       ▼              ▼              ▼             ▼
┌─────────┐   ┌──────────┐   ┌──────────┐  ┌─────────┐
│ Save to │   │ Save to  │   │ Download │  │ Book    │
│Supabase │   │localStorage   │ Audit    │  │Calendly │
└─────────┘   └──────────┘   └──────────┘  └─────────┘
```

### Key Design Patterns

1. **Error Boundaries**: All routes wrapped in ErrorBoundary with fallback UI
2. **Progressive Enhancement**: Works without database, enhanced with it
3. **Lazy Loading**: Non-critical routes loaded on demand
4. **Component Composition**: Small, reusable components with single responsibility
5. **Custom Hooks**: Shared logic extracted into testable hooks
6. **Type Safety**: Full TypeScript with strict mode, zero `any` in production

### Data Flow

```typescript
// Quiz Answering
User Input → QuizAnswers → calculateResults() → QuizResults

// Score Calculation
QuizResults = {
  score: number (0-100),      // Overall percentage
  band: string,               // Explorer | Experimenter | Accelerator
  breakdown: {                // Dimension scores
    strategy: number,
    implementation: number,
    data: number,
    culture: number
  }
}

// Data Persistence
QuizResults → UserSubmission → Database (Supabase) → Success/Fallback
                             → localStorage (Fallback)
                             → CSV Export (On demand)
```

### Database Schema

```sql
-- audit_submissions table
CREATE TABLE audit_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  email TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  band TEXT NOT NULL CHECK (band IN ('Explorer', 'Experimenter', 'Accelerator')),
  strategy_score INTEGER NOT NULL,
  implementation_score INTEGER NOT NULL,
  data_score INTEGER NOT NULL,
  culture_score INTEGER NOT NULL,
  recommendations TEXT[] NOT NULL DEFAULT '{}',
  audit_content TEXT,
  utm_params JSONB,
  quiz_answers JSONB,
  user_agent TEXT,
  referrer TEXT,
  ip_address INET
);

-- Row-Level Security (RLS) enabled
-- Policies: INSERT only, no SELECT/UPDATE/DELETE for anonymous users
```

## 🎨 Design System

Our design system provides a comprehensive set of design tokens and components:

### Design Tokens
- **Typography**: 6 heading sizes, 4 text sizes with Golden Ratio scaling (1.618)
  - `h1`: 4.236rem (largest)
  - `h2`: 3.236rem
  - `h3`: 2.618rem
  - `h4`: 2rem
  - `h5`: 1.618rem
  - `h6`: 1.272rem
  
- **Spacing**: Consistent spacing scale based on Golden Ratio
  - Base unit: 1rem (16px)
  - Scale: 0.382rem, 0.618rem, 1rem, 1.618rem, 2.618rem, 4.236rem
  
- **Colors**: Semantic color system with WCAG AAA contrast ratios
  - Primary: Resolution Blue (`hsl(var(--resolution-blue-600))`)
  - Success: Green (achievements, high scores)
  - Warning: Yellow (medium scores, caution)
  - Error: Red (failures, critical issues)
  - All combinations: 7:1+ contrast ratio

- **Shadows**: 3-level elevation system
  - Soft: Subtle depth for cards
  - Medium: Moderate elevation for modals
  - Strong: Maximum elevation for tooltips

- **Animations**: Consistent timing and easing
  - Duration: 200ms (default), 2000ms (counters)
  - Easing: ease-out-quart for smooth deceleration
  - Stagger: 100-200ms for sequential animations

### Component Library
- **60+ UI Components**: Built on Radix UI primitives
  - Accordion, Alert, Avatar, Badge, Button, Card, etc.
  - Full keyboard navigation
  - Screen reader support
  - Customizable with variants
  
- **Business Components**: Custom components for core features
  - AIGrowthQuiz: 12-question assessment interface
  - AIGrowthResults: Results display with AI recommendations
  - EmailStep: Email capture with validation
  - ErrorBoundary: Graceful error handling
  
- **State Components**: Comprehensive loading/error states
  - LoadingSpinner: Multiple sizes and variants
  - Skeleton: Content placeholders
  - EmptyState: No data fallbacks
  - ErrorMessage: Friendly error displays

## ♿ Accessibility

We maintain **WCAG 2.1 AAA compliance** across the entire application:

### Key Features
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Comprehensive ARIA labels
- **Color Contrast**: AAA level contrast ratios (7:1+)
- **Touch Targets**: 44px minimum touch target size
- **Focus Management**: Proper focus traps and indicators

### Testing
- **Unit Tests**: Vitest with React Testing Library
- **E2E Tests**: Playwright for full user flow testing
- **Accessibility Tests**: Automated with axe-core
- **Manual Testing**: Screen readers (NVDA, JAWS, VoiceOver)
- **Keyboard Navigation**: Full keyboard-only navigation support
- **Color Contrast**: All combinations meet WCAG AAA (7:1+)

## 🔒 Security

### Security Measures
- **Input Validation**: Comprehensive sanitization and validation
- **CSRF Protection**: Cross-site request forgery prevention
- **Rate Limiting**: API abuse prevention
- **XSS Prevention**: Content sanitization and CSP headers
- **Data Encryption**: End-to-end encryption for sensitive data

### Security Headers
```http
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

## 📊 Performance

### Performance Metrics
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **First Input Delay**: <100ms
- **Bundle Size**: 50.77 KB gzipped

### Optimization Techniques
- **Code Splitting**: Route-based and component-based splitting
- **Lazy Loading**: Images and components loaded on demand
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Image compression and format optimization
- **Caching**: Aggressive caching strategies

## 🚀 Deployment

### Pre-Deployment Checklist

Before deploying to production, ensure:

- ✅ All tests pass (`npm run test:all`)
- ✅ No linting errors (`npm run lint`)
- ✅ Type checking passes (`npm run type-check`)
- ✅ Build succeeds (`npm run build`)
- ✅ Preview works (`npm run preview`)
- ✅ Environment variables are set
- ✅ Database is configured with RLS policies
- ✅ Security audit passes (`npm run audit`)

### Production Deployment (Vercel)

1. **Build the application**
   ```bash
   npm run build
   ```
   
   This creates an optimized production build in the `dist/` directory.

2. **Deploy to Vercel** (Recommended)
   
   **Option A: GitHub Integration (Recommended)**
   - Connect your GitHub repository to Vercel
   - Automatic deployments on push to main
   - Preview deployments for pull requests
   
   **Option B: CLI Deployment**
   ```bash
   npx vercel --prod
   ```

3. **Configure environment variables**
   
   In Vercel Dashboard → Settings → Environment Variables, add:
   ```env
   VITE_SUPABASE_URL=https://your-prod-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_production_anon_key
   VITE_GEMINI_API_KEY=your_production_api_key
   ```

4. **Configure domain** (Optional)
   - Add custom domain in Vercel dashboard
   - Update DNS settings
   - SSL certificates are automatically provisioned

### Environment Configuration

#### Development (.env.local)
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-dev-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...your_dev_anon_key

# Google Gemini API  
VITE_GEMINI_API_KEY=AIzaSy...your_dev_api_key
```

#### Production (Vercel Environment Variables)
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-prod-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...your_prod_anon_key

# Google Gemini API
VITE_GEMINI_API_KEY=AIzaSy...your_prod_api_key
```

### Deployment Verification

After deployment, verify:

1. **Functionality**: Complete a test quiz submission
2. **Performance**: Check Lighthouse scores (should be 90+)
3. **Security**: Verify HTTPS and security headers
4. **Analytics**: Confirm Google Analytics tracking
5. **Database**: Test Supabase connection and data persistence
6. **API**: Verify Gemini API generates recommendations

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed deployment instructions.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/contributing.md) for details.

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run lint
   npm run type-check
   ```
5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Review Process

- ✅ All code must pass ESLint (zero errors)
- ✅ TypeScript type checking must pass (zero errors)
- ✅ All tests must pass (unit + E2E)
- ✅ Components must include JSDoc documentation
- ✅ Accessibility compliance is required (WCAG 2.1 AAA)
- ✅ Performance impact must be assessed
- ✅ Test coverage should not decrease
- ✅ Security best practices must be followed

## 🔌 API Integration

### Supabase (Database)

**Purpose**: Secure data persistence for quiz submissions

**Setup**:
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Copy URL and anon key from Project Settings → API
4. Run SQL scripts from project root:
   - `database-schema-fixed-final.sql` - Create tables
   - `database-policies-fixed-final.sql` - Set up RLS
   - `database-views-security-fix.sql` - Apply security fixes

**Usage**:
```typescript
import { saveSubmissionToDatabase } from '@/lib/database';

await saveSubmissionToDatabase({
  email: 'user@example.com',
  score: 75,
  band: 'Accelerator',
  dimensions: { strategy: 80, implementation: 70, data: 75, culture: 80 },
  recommendations: ['...']
});
```

### Google Gemini API (AI Recommendations)

**Purpose**: Generate personalized AI recommendations

**Setup**:
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create new API key
3. Add to `.env.local` as `VITE_GEMINI_API_KEY`

**Usage**:
```typescript
import { GeminiAPI } from '@/lib/geminiAPI';

const api = new GeminiAPI();
const recommendations = await api.generateRecommendations(quizData);
```

**Features**:
- Rate limiting: 5 requests/minute
- Retry logic: 3 attempts with exponential backoff
- Timeout: 60s per request
- Fallback: Static recommendations if API unavailable

### Calendly (Consultation Booking)

**Purpose**: Professional consultation scheduling

**Setup**: Configure Calendly URL in `src/lib/calendly.ts`

**Usage**:
```typescript
import { openCalendlyBooking } from '@/lib/calendly';

openCalendlyBooking(
  { name: 'John Doe', email: 'john@example.com' },
  { utmSource: 'quiz-results', utmMedium: 'button' }
);
```

**Features**:
- Pre-fill user data
- UTM parameter tracking
- Focus management
- Screen reader announcements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support & Contact

For support, questions, or consultation:

- **Website**: [https://alviglobal.com](https://alviglobal.com)
- **Email**: hello@alviglobal.com
- **LinkedIn**: [Alvi Global Enterprises](https://linkedin.com/company/alvi-global-enterprises)
- **Documentation**: See `docs/` directory for detailed guides

### Reporting Issues

- **Bug Reports**: Open an issue on GitHub with:
  - Clear description of the problem
  - Steps to reproduce
  - Expected vs actual behavior
  - Screenshots if applicable
  - Browser/device information

- **Feature Requests**: Open an issue labeled `enhancement`

- **Security Issues**: Email security@alviglobal.com directly (do not open public issues)

---

## 🙏 Acknowledgments

- **shadcn/ui** - Beautiful, accessible component system
- **Radix UI** - Headless UI primitives
- **Tailwind CSS** - Utility-first CSS framework
- **Vercel** - Deployment platform
- **Supabase** - Backend as a Service
- **Google Gemini** - AI model for recommendations

---

**Built with ❤️ by [Alvi Global Enterprises](https://alviglobal.com)**

*Empowering businesses to unlock their AI potential through comprehensive assessments and strategic guidance.*

---

## 📚 Additional Resources

- [Component Storybook](https://storybook.alviglobal.com) (Coming soon)
- [API Documentation](./docs/API.md)
- [Architecture Decision Records](./docs/adr/) (Coming soon)
- [Changelog](./CHANGELOG.md) (Coming soon)