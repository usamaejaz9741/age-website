# 🚀 Alvi Global Enterprises - AI Growth Assessment Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0+-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-38bdf8.svg)](https://tailwindcss.com/)

> **Enterprise-grade AI Growth Assessment Platform** - Helping businesses unlock their AI potential through comprehensive assessments, personalized recommendations, and strategic guidance.

## 🎯 Overview

The **Alvi Global Enterprises AI Growth Assessment Platform** helps businesses evaluate their AI maturity and receive personalized recommendations for growth.

### Key Features

- **AI Maturity Assessment**: 12-question quiz across 4 dimensions (Strategy, Implementation, Data, Culture)
- **Personalized Recommendations**: AI-powered insights using Google Gemini 2.0 Flash
- **Professional Consultation**: Seamless Calendly integration for expert guidance
- **Data Persistence**: Secure Supabase PostgreSQL with localStorage fallback
- **Performance Optimized**: Sub-2s load times, 50KB bundle, WCAG 2.1 AAA compliant

## 🛠️ Tech Stack

**Frontend:** React 18 • TypeScript 5.0+ • Vite 5.0+ • Tailwind CSS 3.0+ • shadcn/ui  
**Backend:** Supabase • Google Gemini 2.0 Flash • Calendly API  
**Testing:** Vitest • Playwright • ESLint

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0+ (recommended: 20.0+)
- npm 9.0+ or yarn 1.22+

### Installation

1. **Clone and install**

   ```bash
   git clone https://github.com/alviglobal/age-website.git
   cd age-website
   npm install
   ```

2. **Set up environment variables**

   ```bash
   cp env.template .env.local
   ```

   Edit `.env.local`:

   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GEMINI_API_KEY=AIzaSy...your_gemini_api_key
   ```

   **Get your API keys:**

   - **Supabase**: [supabase.com](https://supabase.com) → Project Settings → API
   - **Gemini**: [Google AI Studio](https://makersuite.google.com/app/apikey)

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Set up database** (Optional)
   Run SQL scripts in Supabase SQL Editor:

   - `docs/database/database-schema-fixed-final.sql`
   - `docs/database/database-policies-fixed-final.sql`
   - `docs/database/database-views-security-fix.sql`

5. **Verify setup**

   ```bash
   npm run test:run
   npm run lint
   npm run type-check
   ```

6. **Open browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
age-website/
├── public/           # Static assets
├── src/
│   ├── components/   # React components (60+ UI components)
│   ├── constants/    # App constants (quiz questions, scores, messages)
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility libraries (security, database, AI)
│   ├── pages/        # Page components
│   └── types/        # TypeScript definitions
├── e2e/              # Playwright E2E tests
├── docs/             # Documentation
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── database/     # Database SQL scripts
├── COLORS.md         # Color system guide
└── README.md         # This file
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking

# Testing
npm run test             # Run tests in watch mode
npm run test:run         # Run all tests once
npm run test:coverage    # Generate coverage report
npm run test:e2e         # Run E2E tests
npm run test:all         # Run all tests
```

### Development Guidelines

1. **Code Style**

   - Use TypeScript strict mode
   - Follow ESLint configuration
   - Write JSDoc comments for public functions
   - Use conventional commits

2. **Component Development**

   - Functional components with hooks
   - Proper TypeScript interfaces
   - WCAG 2.1 AAA accessibility
   - Include unit tests for business logic

3. **Testing**
   - Write tests for new functions
   - Maintain >70% coverage for critical logic
   - Run `npm run test:run` before committing

## 📚 Documentation

- **[API.md](./docs/API.md)** - API integration guide
- **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Deployment instructions
- **[COLORS.md](./COLORS.md)** - Color system reference
- **[Database Scripts](./docs/database/)** - SQL setup files

## 🧪 Testing

### Test Infrastructure

- **224 unit tests** (Vitest + React Testing Library)
- **16.52% coverage** with focus on critical business logic
- **E2E tests** (Playwright) for full user flow testing

### Key Test Suites

| Module             | Coverage | Tests |
| ------------------ | -------- | ----- |
| `utils.ts`         | 100%     | 15    |
| `image-utils.ts`   | 100%     | 19    |
| `quiz-helpers.ts`  | 100%     | 3     |
| `error-handler.ts` | 98.08%   | 26    |
| `use-mobile.tsx`   | 92.59%   | 14    |
| `geminiAPI.ts`     | 88.99%   | -     |
| `storage.ts`       | 76.85%   | 20    |

### Running Tests

```bash
npm run test              # Watch mode
npm run test:run          # Run once
npm run test:coverage     # With coverage
npm run test:e2e          # E2E tests
npm run test:all          # All tests
```

## ♿ Accessibility

**WCAG 2.1 AAA compliant** with:

- Full keyboard navigation
- Comprehensive ARIA labels
- 7:1+ color contrast ratios
- 44px minimum touch targets
- Screen reader support
- Reduced motion support

## 🔒 Security

- Input sanitization (DOMPurify)
- Email validation
- CSRF protection
- SQL injection prevention (Supabase)
- XSS prevention (CSP headers)
- Rate limiting (5 req/min)

## 📊 Performance

- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Bundle Size**: 50KB gzipped
- **Lighthouse Score**: 90+

## 🚀 Deployment

### Pre-Deployment Checklist

- ✅ All tests pass (`npm run test:all`)
- ✅ No linting errors (`npm run lint`)
- ✅ Type checking passes (`npm run type-check`)
- ✅ Build succeeds (`npm run build`)
- ✅ Environment variables configured

### Deploy to Vercel

1. **Build**

   ```bash
   npm run build
   ```

2. **Deploy**

   ```bash
   npx vercel --prod
   ```

   Or connect GitHub repo for automatic deployments.

3. **Configure environment variables** in Vercel Dashboard:
   ```env
   VITE_SUPABASE_URL=https://your-prod-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_production_anon_key
   VITE_GEMINI_API_KEY=your_production_api_key
   ```

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed instructions.

## 🎨 Design System

### Colors

All colors centralized in `src/index.css` (lines 627-817). See [COLORS.md](./COLORS.md) for quick reference.

**Primary:** Resolution Blue (`hsl(224 100% 48%)`)  
**Accent:** Malibu (`hsl(199 98% 52%)`)  
**Semantic:** Success (Green), Destructive (Red)

### Typography

Golden Ratio (1.618) progression:

- Headings: h1-h6 (6rem to 1.272rem)
- Body: Base 1rem with fluid scaling
- Line heights: 1.1 (tight) to 1.8 (loose)

### Components

60+ UI components built on Radix UI primitives with full keyboard navigation and screen reader support.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make changes and test (`npm run test:all`)
4. Commit (`git commit -m 'Add amazing feature'`)
5. Push (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with ❤️ by Alvi Global Enterprises**
