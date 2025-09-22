# Architecture Documentation

## System Overview

The AGE website is a modern React application that provides AI-powered business assessments and growth consulting services. The architecture follows a component-based, service-oriented design with clear separation of concerns.

## High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   AI Services   │    │   Analytics     │
│   (React SPA)   │◄──►│   (Gemini API)  │    │   (Google GA4)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │
         ▼
┌─────────────────┐
│   Data Storage  │
│   (Local JSON)  │
└─────────────────┘
```

## Frontend Architecture

### Component Hierarchy
```
App
├── QueryClientProvider
├── TooltipProvider
├── BrowserRouter
│   ├── Routes
│   │   ├── Index (Landing Page)
│   │   │   ├── Header
│   │   │   ├── Hero
│   │   │   ├── ProofBar
│   │   │   ├── ValuePillars
│   │   │   ├── ServicesGrid
│   │   │   ├── CaseStudies
│   │   │   ├── HowWeWork
│   │   │   ├── Industries
│   │   │   ├── ContentTeaser
│   │   │   ├── Footer
│   │   │   └── GrowthAuditModal
│   │   ├── AIGrowthScore (Assessment Page)
│   │   │   ├── Header
│   │   │   ├── AIGrowthQuiz
│   │   │   ├── EmailStep
│   │   │   ├── AIGrowthResults
│   │   │   ├── AIGrowthFAQ
│   │   │   └── Footer
│   │   └── NotFound (404 Page)
│   └── Toaster Components
└── Global Styles
```

### State Management
- **Local State**: React hooks (useState, useEffect)
- **Server State**: React Query for API calls
- **Global State**: Context providers for shared state
- **Form State**: React Hook Form with Zod validation

### Routing
- **Client-side routing**: React Router DOM
- **Route structure**:
  - `/` - Landing page
  - `/ai-growth-score` - Assessment page
  - `*` - 404 page

## Data Flow

### Assessment Flow
```
User Input → Quiz Component → State Management → AI Processing → Results Display
     │              │              │              │              │
     ▼              ▼              ▼              ▼              ▼
Form Data → Answer Storage → Score Calculation → Gemini API → UI Update
```

### AI Integration Flow
```
User Answers → Score Calculation → Prompt Generation → Gemini API → Response Processing → UI Display
```

## Service Layer

### AI Services
- **GeminiAPI**: Direct API client for Gemini
- **generateAIAudit**: High-level audit generation
- **sendAuditEmail**: Email delivery service

### Data Services
- **saveUserData**: User submission persistence
- **exportToCSV**: Data export functionality
- **storage utilities**: File system operations

### Analytics Services
- **Google Analytics 4**: User behavior tracking
- **Event tracking**: Custom event implementation
- **UTM parameter handling**: Marketing attribution

## Design System

### Color Palette
- **Primary**: Resolution Blue (#0050ff)
- **Secondary**: Malibu (#60cdff)
- **Neutral**: Black/White with opacity variants
- **Semantic**: Success, Error, Warning colors

### Typography
- **Headings**: Kufam font family
- **Body**: System font stack
- **Scale**: Custom font size variables

### Spacing System
- **Base unit**: 4px
- **Scale**: xs, sm, md, lg, xl, 2xl, 3xl, 4xl
- **Responsive**: Mobile-first approach

### Component Library
- **Base**: shadcn/ui components
- **Custom**: AGE-specific components
- **Patterns**: Consistent interaction patterns

## Performance Considerations

### Bundle Optimization
- **Code splitting**: Route-based splitting
- **Vendor chunks**: Separate third-party libraries
- **Tree shaking**: Remove unused code
- **Compression**: Gzip/Brotli compression

### Runtime Performance
- **Lazy loading**: Component-level lazy loading
- **Memoization**: React.memo for expensive components
- **Virtual scrolling**: For large lists
- **Image optimization**: WebP format, lazy loading

### Caching Strategy
- **Static assets**: Long-term caching
- **API responses**: React Query caching
- **Service worker**: Offline functionality
- **CDN**: Global content delivery

## Security Architecture

### Client-Side Security
- **Input validation**: Zod schema validation
- **XSS prevention**: React's built-in protection
- **CSRF protection**: Same-origin policy
- **Content Security Policy**: Strict CSP headers

### API Security
- **API key management**: Environment variables
- **Rate limiting**: Client-side throttling
- **Error handling**: Secure error messages
- **Data sanitization**: Input sanitization

### Data Privacy
- **GDPR compliance**: Consent management
- **Data minimization**: Collect only necessary data
- **Encryption**: HTTPS for all communications
- **Retention policies**: Data lifecycle management

## Scalability Considerations

### Horizontal Scaling
- **Stateless design**: No server-side sessions
- **CDN distribution**: Global content delivery
- **Load balancing**: Multiple server instances
- **Database sharding**: Data distribution

### Vertical Scaling
- **Resource optimization**: Efficient algorithms
- **Memory management**: Proper cleanup
- **CPU optimization**: Efficient rendering
- **Storage optimization**: Compressed assets

## Monitoring and Observability

### Application Monitoring
- **Error tracking**: Sentry integration
- **Performance monitoring**: Core Web Vitals
- **User analytics**: Google Analytics 4
- **Custom metrics**: Business KPIs

### Infrastructure Monitoring
- **Server health**: Uptime monitoring
- **API performance**: Response time tracking
- **Resource usage**: CPU, memory, storage
- **Security monitoring**: Threat detection

## Deployment Architecture

### Build Process
- **Development**: Vite dev server
- **Production**: Vite build with optimizations
- **Testing**: Jest and React Testing Library
- **Linting**: ESLint with TypeScript rules

### Hosting
- **Static hosting**: Vercel/Netlify
- **CDN**: Global edge locations
- **SSL**: Automatic HTTPS
- **Custom domains**: DNS configuration

### CI/CD Pipeline
- **Source control**: Git with GitHub
- **Automated testing**: Pull request checks
- **Deployment**: Automatic production deploys
- **Rollback**: Quick rollback capabilities
