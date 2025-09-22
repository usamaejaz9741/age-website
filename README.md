# AGE Website - AI Growth Engineering Platform

A modern, interactive website for AGE (AI Growth Engineering) that provides AI maturity assessments and growth consulting services. The platform features an AI-powered quiz that evaluates organizations' AI readiness across strategy, implementation, data, and culture dimensions.

## 🚀 Features

- **Interactive AI Growth Score Assessment**: 12-question quiz evaluating AI maturity
- **AI-Powered Recommendations**: Personalized insights generated using Google Gemini API
- **Lead Capture System**: Email collection with consent management
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Analytics Integration**: Google Analytics 4 tracking for user engagement
- **Growth Audit Booking**: Modal-based consultation scheduling

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite with SWC for fast compilation
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library
- **State Management**: React hooks and context
- **Routing**: React Router DOM
- **AI Integration**: Google Generative AI (Gemini)
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Deployment**: Vercel-ready configuration

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Landing page hero section
│   ├── AIGrowthQuiz.tsx # Interactive assessment quiz
│   ├── AIGrowthResults.tsx # Results display with AI recommendations
│   └── ...              # Other page sections
├── pages/               # Route components
│   ├── Index.tsx        # Main landing page
│   ├── ai-growth-score.tsx # Assessment page
│   └── NotFound.tsx     # 404 error page
├── lib/                 # Utility functions and services
│   ├── gemini.ts        # AI audit generation
│   ├── geminiAPI.ts     # Gemini API client
│   ├── storage.ts       # Data persistence utilities
│   └── utils.ts         # General utilities
├── types/               # TypeScript type definitions
├── hooks/               # Custom React hooks
└── assets/              # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google Gemini API key (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd age-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080`

## 📝 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🎯 Key Features Explained

### AI Growth Score Assessment

The assessment evaluates AI maturity across four dimensions:
- **Strategy**: AI strategy definition and executive support
- **Implementation**: Technical capabilities and project delivery
- **Data**: Data quality, governance, and monitoring
- **Culture**: AI literacy and change management

### AI-Powered Recommendations

Uses Google Gemini API to generate personalized recommendations based on:
- Overall maturity score
- Dimension-specific scores
- Industry best practices
- Current market trends

### Lead Capture & Analytics

- Email collection with GDPR-compliant consent
- Google Analytics 4 integration
- UTM parameter tracking
- User data persistence for follow-up

## 🎨 Design System

The project uses a custom design system built on Tailwind CSS:

- **Colors**: Resolution Blue (primary), Malibu (secondary)
- **Typography**: Kufam font family for headings
- **Spacing**: Consistent spacing scale
- **Shadows**: Soft, medium, and strong shadow variants
- **Animations**: Fade-in, slide-up, and scale-in effects

## 🔧 Configuration

### Vite Configuration
- Path aliases (`@/` for `src/`)
- SWC for fast compilation
- Manual chunk splitting for optimization
- Development server on port 8080

### Tailwind Configuration
- Custom color palette
- Extended spacing and typography
- Custom animations and keyframes
- CSS variables for theming

## 📊 Analytics & Tracking

The application includes comprehensive analytics tracking:
- Page views and user interactions
- Quiz completion rates
- Lead capture events
- UTM parameter attribution

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
# Deploy the dist/ folder to your hosting provider
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For support and questions:
- Email: hello@alviglobal.com
- Website: [alviglobal.com](https://alviglobal.com)

---

**Built with ❤️ by the AGE team**
