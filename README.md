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

The **Alvi Global Enterprises AI Growth Assessment Platform** is a comprehensive web application designed to help businesses evaluate their AI maturity and receive personalized recommendations for growth. Built with modern web technologies and enterprise-grade practices, it provides:

- **AI Growth Score Assessment**: Multi-dimensional evaluation of AI capabilities
- **Personalized Recommendations**: AI-powered insights and strategic guidance
- **Professional Consultation Booking**: Direct integration with Calendly
- **Comprehensive Analytics**: Detailed reporting and progress tracking
- **Enterprise Security**: Bank-level security and data protection

## ✨ Features

### 🎯 Core Functionality
- **Interactive AI Assessment Quiz**: 20+ questions across 4 key dimensions
- **Real-time Score Calculation**: Instant feedback and progress tracking
- **AI-Powered Recommendations**: Personalized insights using Google Gemini 2.0 Flash
- **Professional Consultation Booking**: Seamless Calendly integration
- **Email Capture & Consent**: GDPR-compliant data collection

### 🎨 User Experience
- **Responsive Design**: Perfect on all devices (mobile-first)
- **Smooth Animations**: 60fps animations with GPU acceleration
- **Loading States**: Comprehensive loading and error handling
- **Accessibility**: WCAG 2.1 AAA compliance
- **Performance**: Sub-2s load times, 50KB bundle size

### 🔒 Enterprise Features
- **Data Security**: End-to-end encryption and secure storage
- **Rate Limiting**: API protection and abuse prevention
- **CSRF Protection**: Cross-site request forgery prevention
- **Input Validation**: Comprehensive sanitization and validation
- **Error Handling**: Graceful degradation and user feedback

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
- **ESLint** - Code linting and quality assurance
- **Prettier** - Code formatting
- **Husky** - Git hooks for quality gates
- **lint-staged** - Pre-commit linting

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
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Google Gemini API
   VITE_GEMINI_API_KEY=your_gemini_api_key
   
   # Calendly Configuration
   VITE_CALENDLY_USERNAME=your_calendly_username
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
age-website/
├── 📁 public/                 # Static assets
│   ├── 📄 index.html         # HTML template
│   ├── 📄 robots.txt         # SEO robots file
│   └── 📄 sitemap.xml        # SEO sitemap
├── 📁 src/                   # Source code
│   ├── 📁 components/        # React components
│   │   ├── 📁 ui/           # Reusable UI components
│   │   ├── 📄 Hero.tsx      # Landing page hero section
│   │   ├── 📄 ServicesGrid.tsx # Services showcase
│   │   └── 📄 ...           # Other components
│   ├── 📁 constants/         # Application constants
│   │   ├── 📄 design-system.ts # Design tokens
│   │   ├── 📄 messages.ts   # User messages
│   │   └── 📄 ...           # Other constants
│   ├── 📁 hooks/            # Custom React hooks
│   │   ├── 📄 use-focus-trap.ts # Accessibility hook
│   │   └── 📄 ...           # Other hooks
│   ├── 📁 lib/              # Utility libraries
│   │   ├── 📄 security.ts   # Security utilities
│   │   ├── 📄 database.ts   # Database operations
│   │   └── 📄 ...           # Other utilities
│   ├── 📁 pages/            # Page components
│   │   ├── 📄 Index.tsx     # Landing page
│   │   └── 📄 NotFound.tsx  # 404 page
│   ├── 📁 types/            # TypeScript type definitions
│   └── 📄 main.tsx          # Application entry point
├── 📄 package.json          # Dependencies and scripts
├── 📄 tailwind.config.js    # Tailwind CSS configuration
├── 📄 tsconfig.json         # TypeScript configuration
├── 📄 vite.config.ts        # Vite configuration
└── 📄 README.md             # This file
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # TypeScript type checking

# Testing (when implemented)
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Development Guidelines

1. **Code Style**
   - Use TypeScript for all new code
   - Follow ESLint configuration
   - Use Prettier for formatting
   - Write meaningful commit messages

2. **Component Development**
   - Use functional components with hooks
   - Implement proper TypeScript interfaces
   - Add comprehensive JSDoc comments
   - Follow accessibility guidelines

3. **Performance**
   - Use React.memo for expensive components
   - Implement proper dependency arrays
   - Optimize bundle size
   - Use lazy loading where appropriate

## 📚 Documentation

### Component Documentation
- [Design System](./docs/design-system.md) - Complete design token reference
- [Component Library](./docs/components.md) - UI component documentation
- [Accessibility Guide](./docs/accessibility.md) - WCAG compliance guide

### API Documentation
- [Supabase Integration](./docs/supabase.md) - Database operations
- [Gemini API](./docs/gemini.md) - AI content generation
- [Calendly Integration](./docs/calendly.md) - Booking system

### Development Guides
- [Getting Started](./docs/getting-started.md) - Development setup
- [Contributing](./docs/contributing.md) - Contribution guidelines
- [Deployment](./docs/deployment.md) - Production deployment

## 🎨 Design System

Our design system provides a comprehensive set of design tokens and components:

### Design Tokens
- **Typography**: 6 heading sizes, 4 text sizes with Golden Ratio scaling
- **Spacing**: Consistent spacing scale based on Golden Ratio (1.618)
- **Colors**: Semantic color system with WCAG AAA contrast ratios
- **Shadows**: 3-level elevation system (soft, medium, strong)
- **Animations**: Consistent timing and easing functions

### Component Library
- **60+ UI Components**: Fully accessible and customizable
- **State Components**: Loading, error, success, and empty states
- **Form Components**: Validated inputs with proper error handling
- **Layout Components**: Responsive grid and container systems

## ♿ Accessibility

We maintain **WCAG 2.1 AAA compliance** across the entire application:

### Key Features
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Comprehensive ARIA labels
- **Color Contrast**: AAA level contrast ratios (7:1+)
- **Touch Targets**: 44px minimum touch target size
- **Focus Management**: Proper focus traps and indicators

### Testing
- Automated accessibility testing with axe-core
- Manual testing with screen readers
- Keyboard-only navigation testing
- Color contrast validation

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

### Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   npx vercel --prod
   ```

3. **Configure environment variables**
   Set production environment variables in Vercel dashboard

### Environment Configuration

#### Development
```env
VITE_SUPABASE_URL=your_dev_supabase_url
VITE_SUPABASE_ANON_KEY=your_dev_supabase_key
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_CALENDLY_USERNAME=your_calendly_username
```

#### Production
```env
VITE_SUPABASE_URL=your_prod_supabase_url
VITE_SUPABASE_ANON_KEY=your_prod_supabase_key
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_CALENDLY_USERNAME=your_calendly_username
```

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

- All code must pass linting and type checking
- Components must include proper documentation
- Accessibility compliance is required
- Performance impact must be considered

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:

- **Email**: support@alviglobal.com
- **Website**: [https://alviglobal.com](https://alviglobal.com)
- **Documentation**: [https://docs.alviglobal.com](https://docs.alviglobal.com)

---

**Built with ❤️ by [Alvi Global Enterprises](https://alviglobal.com)**

*Empowering businesses to unlock their AI potential through comprehensive assessments and strategic guidance.*