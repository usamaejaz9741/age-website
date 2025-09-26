import { useState, useEffect } from "react";
import PageTemplate from "@/components/PageTemplate";
import SectionTemplate from "@/components/SectionTemplate";
import { AnimatedCard } from "@/components/ui/animated-card";
import AIGrowthQuiz from "@/components/AIGrowthQuiz";
import AIGrowthResults from "@/components/AIGrowthResults";
import AIGrowthFAQ from "@/components/AIGrowthFAQ";
import EmailStep from "@/components/EmailStep";
import { generateQuizAudit, sendAuditEmail, type QuizAuditData } from "@/lib/gemini";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Target, Zap } from "lucide-react";

// Interfaces for quiz functionality
interface QuizAnswers {
  [questionId: string]: number;
}

export interface QuizResults {
  score: number;
  band: 'Explorer' | 'Experimenter' | 'Accelerator';
  breakdown: {
    strategy: number;
    implementation: number;
    data: number;
    culture: number;
  };
}

const AIGrowthScore = () => {
  const [currentStep, setCurrentStep] = useState<'hero' | 'quiz' | 'email' | 'results'>('hero');
  const [isIndicatorExpanded, setIsIndicatorExpanded] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({});
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [hasConsent, setHasConsent] = useState(false);
  const [isGeneratingAudit, setIsGeneratingAudit] = useState(false);
  const [auditContent, setAuditContent] = useState<string>('');
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});

  // Extract UTM parameters from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      const value = urlParams.get(param);
      if (value) utm[param] = value;
    });
    
    setUtmParams(utm);
  }, []);

  const startQuiz = () => {
    setCurrentStep('quiz');
  };

  const handleQuizComplete = (answers: QuizAnswers) => {
    setQuizAnswers(answers);
    
    // Calculate results
    const results = calculateResults(answers);
    setQuizResults(results);
    
    // Move to email step
    setCurrentStep('email');
  };

  const calculateResults = (answers: QuizAnswers): QuizResults => {
    const scores = {
      strategy: 0,
      implementation: 0,
      data: 0,
      culture: 0
    };

    // Map question IDs to dimensions
    const questionDimensionMap: { [key: string]: keyof typeof scores } = {
      'q1': 'strategy',    // AI strategy definition
      'q2': 'strategy',    // Executive support
      'q3': 'strategy',    // Business alignment
      'q4': 'implementation', // Implementation maturity
      'q5': 'implementation', // Technical capabilities
      'q6': 'implementation', // Project methodology
      'q7': 'data',        // Data quality
      'q8': 'data',        // Data governance
      'q9': 'data',        // AI performance measurement
      'q10': 'culture',    // AI literacy
      'q11': 'culture',    // Change management
      'q12': 'culture'     // AI ethics
    };

    // Calculate dimension scores
    Object.entries(answers).forEach(([questionId, score]) => {
      const dimension = questionDimensionMap[questionId];
      if (dimension && Object.prototype.hasOwnProperty.call(scores, dimension)) {
        scores[dimension] += score as number;
      }
    });

    // Calculate total score
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const maxScore = Object.keys(answers).length * 3; // 3-point scale (0-3)
    const percentage = Math.round((totalScore / maxScore) * 100);

    // Determine band
    let band: 'Explorer' | 'Experimenter' | 'Accelerator';
    if (percentage < 40) {
      band = 'Explorer';
    } else if (percentage < 70) {
      band = 'Experimenter';
    } else {
      band = 'Accelerator';
    }

    // Convert dimension scores to percentages (each dimension has 3 questions, max score 9)
    const breakdownPercentages = {
      strategy: Math.round((scores.strategy / 9) * 100),
      implementation: Math.round((scores.implementation / 9) * 100),
      data: Math.round((scores.data / 9) * 100),
      culture: Math.round((scores.culture / 9) * 100)
    };

    // Debug logging
    console.log('Quiz Calculation Debug:', {
      answers,
      rawScores: scores,
      breakdownPercentages,
      totalScore,
      maxScore,
      percentage,
      band
    });

    return {
      score: percentage,
      band,
      breakdown: breakdownPercentages
    };
  };

  const handleEmailSubmit = async () => {
    if (!userEmail || !hasConsent || !quizResults) return;

    setIsGeneratingAudit(true);
    
    try {
      // Generate AI audit
      const auditData: QuizAuditData = {
        email: userEmail,
        score: quizResults.score,
        band: quizResults.band,
        breakdown: quizResults.breakdown,
        answers: quizAnswers
      };

      const audit = await generateQuizAudit(auditData);
      setAuditContent(audit);
      
      // Move to results
      setCurrentStep('results');
    } catch (error) {
      // Error generating audit - handled gracefully
      // Still move to results with fallback content
      setAuditContent('Thank you for completing the assessment. Your results are ready!');
      setCurrentStep('results');
    } finally {
      setIsGeneratingAudit(false);
    }
  };

  return (
    <PageTemplate 
      pageTitle="AI Growth Score Assessment"
      pageDescription="Discover your AI maturity level with our comprehensive 3-minute assessment across strategy, implementation, data, and culture dimensions."
      pageKeywords="AI assessment, AI maturity, AI readiness, AI growth score, AI strategy, AI implementation, AI culture, AI data, business transformation, AI consulting, digital transformation, AI evaluation, AI benchmarking, AI roadmap, AI planning"
      canonicalUrl="https://alviglobal.com/ai-growth-score"
      ogImage="https://alviglobal.com/og-image-ai-assessment.jpg"
      twitterCard="summary_large_image"
      pageType="Service"
      structuredData={{
        "@type": "Service",
        "name": "AI Growth Score Assessment",
        "description": "Comprehensive 3-minute assessment across strategy, implementation, data, and culture dimensions",
        "provider": {
          "@type": "Organization",
          "name": "Alvi Global Enterprises"
        },
        "serviceType": "AI Assessment",
        "areaServed": {
          "@type": "Country",
          "name": "Pakistan"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "audience": {
          "@type": "BusinessAudience",
          "audienceType": "Business professionals and organizations"
        }
      }}
      customMeta={[
        { name: "google-site-verification", content: "your-google-verification-code" },
        { name: "msvalidate.01", content: "your-bing-verification-code" },
        { property: "article:author", content: "Alvi Global Enterprises" },
        { property: "article:publisher", content: "https://alviglobal.com" }
      ]}
    >
      {currentStep === 'hero' && (
        <SectionTemplate variant="gradient" padding="xl" maxWidth="7xl" align="center">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 max-w-full">
              <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse flex-shrink-0" />
              <span className="hidden sm:inline">
                Live from ITCN Asia 2025 • Karachi Expo Centre • Sept 23-25
              </span>
              <button 
                className="sm:hidden text-left cursor-pointer rounded-full px-2 -mx-2 py-1 -my-1"
                onClick={() => setIsIndicatorExpanded(!isIndicatorExpanded)}
                aria-label="Toggle full event details"
              >
                <span className={isIndicatorExpanded ? '' : 'truncate max-w-[200px] block'}>
                  {isIndicatorExpanded 
                    ? 'Live from ITCN Asia 2025 • Karachi Expo Centre • Sept 23-25'
                    : 'Live from ITCN Asia 2025 • Karachi • Sept 23-25'
                  }
                </span>
              </button>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight animate-fade-in">
            Discover Your AI{" "}
            <span className="text-primary font-bold">Growth Score</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed animate-fade-in">
            A 3-minute diagnostic that reveals your AI readiness across strategy, implementation, 
            data, and culture. Get your personalized roadmap to AI-driven growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-slide-up">
            <Button
              size="xl"
              variant="cta"
              onClick={startQuiz}
              className="group w-full sm:min-w-[280px] sm:w-auto"
            >
              Start Free Assessment
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[
              {
                icon: TrendingUp,
                title: "5-Minute Quiz",
                description: "Quick assessment of your AI readiness across key dimensions",
                iconColor: "var(--icon-purple)",
                bgColor: "var(--icon-purple-bg)"
              },
              {
                icon: Target,
                title: "AI Growth Score",
                description: "Benchmark your maturity level against industry standards",
                iconColor: "var(--icon-blue)",
                bgColor: "var(--icon-blue-bg)"
              },
              {
                icon: Zap,
                title: "Action Plan",
                description: "Get personalized recommendations to accelerate growth",
                iconColor: "var(--icon-green)",
                bgColor: "var(--icon-green-bg)"
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <AnimatedCard
                  key={feature.title}
                  delay={index * 100}
                  direction="up"
                  className="p-4 sm:p-6 md:p-8 bg-gradient-card rounded-xl shadow-soft hover:shadow-medium transition-all duration-500 ease-gentle hover:-translate-y-1"
                >
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 ease-bounce"
                    style={{ backgroundColor: feature.bgColor }}
                  >
                    <Icon className="w-8 h-8" style={{ color: feature.iconColor }} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 leading-tight">{feature.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                </AnimatedCard>
              );
            })}
          </div>
        </SectionTemplate>
      )}
      
      {currentStep === 'quiz' && (
        <AIGrowthQuiz onComplete={handleQuizComplete} />
      )}
      
      {currentStep === 'email' && (
        <SectionTemplate variant="default" padding="lg" maxWidth="md" align="center">
          <div className="min-h-screen flex items-center justify-center">
            <AnimatedCard
              delay={0}
              direction="up"
              className="w-full p-8 bg-gradient-card rounded-xl shadow-soft hover:shadow-medium transition-all duration-500 ease-gentle"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 leading-tight">Almost there!</h2>
              <p className="text-lg text-muted-foreground text-center mb-8 leading-relaxed">
                Enter your work email to receive your AI Growth Score and personalized insights.
              </p>
              
              <EmailStep
                email={userEmail}
                setEmail={setUserEmail}
                hasConsent={hasConsent}
                setHasConsent={setHasConsent}
                onSubmit={handleEmailSubmit}
                isLoading={isGeneratingAudit}
              />
            </AnimatedCard>
          </div>
        </SectionTemplate>
      )}
      
      {currentStep === 'results' && quizResults && (
        <AIGrowthResults 
          results={quizResults}
          userEmail={userEmail}
          utmParams={utmParams}
          quizAnswers={quizAnswers}
          auditContent={auditContent}
        />
      )}

      {currentStep === 'hero' && (
        <AIGrowthFAQ />
      )}
    </PageTemplate>
  );
};

export default AIGrowthScore;