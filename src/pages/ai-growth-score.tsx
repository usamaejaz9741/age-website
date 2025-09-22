import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIGrowthQuiz from "@/components/AIGrowthQuiz";
import AIGrowthResults from "@/components/AIGrowthResults";
import AIGrowthFAQ from "@/components/AIGrowthFAQ";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, TrendingUp, Target, Zap } from "lucide-react";

export interface QuizAnswers {
  [key: string]: number;
}

export interface QuizResults {
  score: number;
  band: 'Explorer' | 'Experimenter' | 'Accelerator';
  dimensions: {
    strategy: number;
    implementation: number;
    data: number;
    culture: number;
  };
  recommendations: string[];
}

const AIGrowthScore = () => {
  const [currentStep, setCurrentStep] = useState<'hero' | 'quiz' | 'email' | 'results'>('hero');
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({});
  const [userEmail, setUserEmail] = useState('');
  const [hasConsent, setHasConsent] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  const [utmParams, setUtmParams] = useState<{[key: string]: string}>({});

  // Capture UTM parameters on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const utms: {[key: string]: string} = {};
    
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      const value = urlParams.get(param);
      if (value) utms[param] = value;
    });
    
    setUtmParams(utms);
    
    // GA4 event - page view
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: 'AI Growth Score',
        page_location: window.location.href,
        ...utms
      });
    }
  }, []);

  const startQuiz = () => {
    setCurrentStep('quiz');
    
    // GA4 event - quiz start
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'quiz_start', {
        event_category: 'engagement',
        event_label: 'AI Growth Score Quiz',
        ...utmParams
      });
    }
  };

  const handleQuizComplete = (answers: QuizAnswers) => {
    setQuizAnswers(answers);
    setCurrentStep('email');
    
    // GA4 event - quiz complete
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'quiz_complete', {
        event_category: 'engagement',
        event_label: 'AI Growth Score Quiz',
        ...utmParams
      });
    }
  };

  const handleEmailSubmit = (email: string, consent: boolean) => {
    setUserEmail(email);
    setHasConsent(consent);
    
    // Calculate results
    const results = calculateResults(quizAnswers);
    setQuizResults(results);
    setCurrentStep('results');
    
    // GA4 event - lead captured
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'lead_captured', {
        event_category: 'conversion',
        event_label: 'AI Growth Score Email',
        value: results.score,
        ...utmParams
      });
    }
  };

  const calculateResults = (answers: QuizAnswers): QuizResults => {
    const totalQuestions = Object.keys(answers).length;
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const percentage = Math.round((totalScore / (totalQuestions * 3)) * 100);
    
    let band: 'Explorer' | 'Experimenter' | 'Accelerator';
    if (percentage >= 75) band = 'Accelerator';
    else if (percentage >= 50) band = 'Experimenter';
    else band = 'Explorer';
    
    // Calculate dimension scores (simplified grouping)
    const dimensions = {
      strategy: Math.round(((answers.q1 + answers.q2 + answers.q3) / 9) * 100),
      implementation: Math.round(((answers.q4 + answers.q5 + answers.q6) / 9) * 100),
      data: Math.round(((answers.q7 + answers.q8 + answers.q9) / 9) * 100),
      culture: Math.round(((answers.q10 + answers.q11 + answers.q12) / 9) * 100),
    };
    
    const recommendations = getRecommendations(band, dimensions);
    
    return {
      score: percentage,
      band,
      dimensions,
      recommendations
    };
  };

  const getRecommendations = (band: string, dimensions: { [key: string]: number }) => {
    const lowDimensions = Object.entries(dimensions)
      .filter(([_, score]) => (score as number) < 60)
      .sort(([_, a], [__, b]) => (a as number) - (b as number))
      .slice(0, 3);
    
    const recommendationMap: {[key: string]: string} = {
      strategy: "Develop a comprehensive AI strategy aligned with business objectives",
      implementation: "Focus on pilot projects and gradual AI implementation",
      data: "Improve data quality and governance for AI initiatives",
      culture: "Build AI literacy and change management capabilities"
    };
    
    return lowDimensions.map(([dim, _]) => recommendationMap[dim]);
  };

  const renderHero = () => (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="animate-fade-in mb-8">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
            Live from ITCN Asia 2025 • Karachi Expo Centre • Sept 23-25
          </div>
        </div>
        
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Get Your{" "}
            <span className="text-primary font-extrabold">AI Growth Score</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
            A 3-minute diagnostic that reveals your AI readiness across strategy, implementation, 
            data, and culture. Get your personalized roadmap to AI-driven growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up mb-16">
            <Button 
              variant="cta" 
              size="xl"
              className="group min-w-[280px]"
              onClick={startQuiz}
            >
              <TrendingUp className="mr-2" />
              Start AI Growth Audit
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="cta-outline" 
              size="xl"
              className="group min-w-[280px]"
              onClick={() => document.getElementById('what-you-get')?.scrollIntoView({ behavior: 'smooth' })}
            >
              What You'll Get
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center bg-card p-6 rounded-lg shadow-soft">
              <CheckCircle2 className="w-6 h-6 text-primary mr-3" />
              <span className="text-muted-foreground">12 strategic questions</span>
            </div>
            <div className="flex items-center justify-center bg-card p-6 rounded-lg shadow-soft">
              <Target className="w-6 h-6 text-primary mr-3" />
              <span className="text-muted-foreground">Instant AI readiness score</span>
            </div>
            <div className="flex items-center justify-center bg-card p-6 rounded-lg shadow-soft">
              <Zap className="w-6 h-6 text-primary mr-3" />
              <span className="text-muted-foreground">Personalized roadmap</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-pulse-soft">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );

  const renderWhatYouGet = () => (
    <section id="what-you-get" className="py-20 bg-muted/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            What You'll Get
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive AI readiness assessment tailored for senior operators
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Growth Score</h3>
            <p className="text-muted-foreground">Your overall AI readiness percentage and growth band classification</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Dimension Breakdown</h3>
            <p className="text-muted-foreground">Detailed scores across strategy, implementation, data, and culture</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Top 3 Priorities</h3>
            <p className="text-muted-foreground">Actionable recommendations ranked by impact and feasibility</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Expert Consultation</h3>
            <p className="text-muted-foreground">Optional 30-minute strategy session with our AI growth specialists</p>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {currentStep === 'hero' && (
        <>
          {renderHero()}
          {renderWhatYouGet()}
          <AIGrowthFAQ />
        </>
      )}
      
      {currentStep === 'quiz' && (
        <AIGrowthQuiz onComplete={handleQuizComplete} />
      )}
      
      {currentStep === 'email' && (
        <div className="min-h-screen flex items-center justify-center pt-16">
          <EmailCapture onSubmit={handleEmailSubmit} />
        </div>
      )}
      
      {currentStep === 'results' && quizResults && (
        <AIGrowthResults 
          results={quizResults} 
          userEmail={userEmail} 
          utmParams={utmParams}
        />
      )}
      
      <Footer />
    </div>
  );
};

const EmailCapture = ({ onSubmit }: { onSubmit: (email: string, consent: boolean) => void }) => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const businessDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    return !businessDomains.includes(domain);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please use your work email address');
      return;
    }
    
    if (!consent) {
      setError('Please consent to receive your results and insights');
      return;
    }
    
    onSubmit(email, consent);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-card rounded-lg shadow-medium">
      <h2 className="text-2xl font-bold text-center mb-6">Almost there!</h2>
      <p className="text-muted-foreground text-center mb-8">
        Enter your work email to receive your AI Growth Score and personalized insights.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="your.name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>
        
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1"
            required
          />
          <label htmlFor="consent" className="text-sm text-muted-foreground">
            I consent to receive my AI Growth Score results and occasional insights from AGE. 
            You can unsubscribe anytime.
          </label>
        </div>
        
        {error && (
          <p className="text-destructive text-sm">{error}</p>
        )}
        
        <Button type="submit" variant="cta" className="w-full">
          Get My AI Growth Score
        </Button>
      </form>
    </div>
  );
};

export default AIGrowthScore;