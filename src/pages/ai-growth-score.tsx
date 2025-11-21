/**
 * @fileoverview AI Growth Score Assessment Page
 * 
 * This page hosts the multi-step AI maturity assessment flow, including:
 * 1. Hero section with value proposition
 * 2. Interactive quiz interface
 * 3. Email capture for lead generation
 * 4. Results display with AI-generated recommendations
 * 
 * @component
 * @route /ai-growth-score
 */

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import PageTemplate from "@/components/PageTemplate";
import SectionTemplate from "@/components/SectionTemplate";
import { AnimatedCard } from "@/components/ui/animated-card";
import AIGrowthQuiz from "@/components/AIGrowthQuiz";
import AIGrowthResults from "@/components/AIGrowthResults";
import AIGrowthFAQ from "@/components/AIGrowthFAQ";
import EmailStep from "@/components/EmailStep";
import { generateQuizAudit, type QuizAuditData } from "@/lib/gemini";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Target, Zap } from "lucide-react";
import { calculateResults } from "@/lib/quiz-helpers";
import type { QuizAnswers, QuizResults } from "@/types/quiz";

/**
 * AI Growth Score Page Component
 * 
 * Manages the state and transitions between different steps of the assessment:
 * - Hero: Introduction and start button
 * - Quiz: Interactive questions
 * - Email: Lead capture form
 * - Results: Score display and recommendations
 */
const AIGrowthScore = () => {
  const [currentStep, setCurrentStep] = useState<'hero' | 'quiz' | 'email' | 'results'>('hero');
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({});
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [hasConsent, setHasConsent] = useState(false);
  const [isGeneratingAudit, setIsGeneratingAudit] = useState(false);
  const [auditContent, setAuditContent] = useState<string>('');
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});

  /**
   * Extract and sanitize UTM parameters from URL on mount
   * Used for marketing attribution and analytics
   */
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        // Security: Sanitize UTM parameters to prevent XSS
        // Limit length and remove potentially dangerous characters
        const sanitized = value
          .trim()
          .substring(0, 100) // Limit length
          .replace(/[<>"'`]/g, ''); // Remove dangerous characters
        utm[param] = sanitized;
      }
    });
    
    setUtmParams(utm);
  }, []);

  /**
   * Start the quiz flow
   * Transitions from Hero to Quiz step
   */
  const startQuiz = useCallback(() => {
    setCurrentStep('quiz');
  }, []);

  /**
   * Handle quiz completion
   * Calculates results and transitions to Email step
   * 
   * @param answers - The user's answers to the quiz
   */
  const handleQuizComplete = useCallback((answers: QuizAnswers) => {
    setQuizAnswers(answers);
    
    // Calculate results
    const results = calculateResults(answers);
    setQuizResults(results);
    
    // Move to email step
    setCurrentStep('email');
  }, []);

  /**
   * Handle email submission and audit generation
   * Generates personalized AI audit and transitions to Results step
   */
  const handleEmailSubmit = useCallback(async () => {
    if (!userEmail || !hasConsent || !quizResults) return;

    setIsGeneratingAudit(true);
    
    // Create AbortController for request cancellation (not currently used, but prepared for future use)
    const abortController = new AbortController();
    
    try {
      // Generate AI audit
      const auditData: QuizAuditData = {
        email: userEmail,
        score: quizResults.score,
        band: quizResults.band,
        dimensions: quizResults.breakdown,
        quizAnswers: quizAnswers
      };

      const audit = await generateQuizAudit(auditData, abortController.signal);
      setAuditContent(audit);
      
      // Move to results
      setCurrentStep('results');
    } catch (error) {
      // Handle abort error separately
      if (error instanceof Error && error.name === 'AbortError') {
        // Request was cancelled - don't proceed
        return;
      }
      
      // Log error for debugging
      console.error("Error generating audit:", error);
      
      // Show error toast
      toast.error("There was an issue generating your personalized audit.", {
        description: "We've provided general results instead. Please try again later for the full report.",
        duration: 5000,
      });
      
      // Error generating audit - handled gracefully
      // Still move to results with fallback content
      setAuditContent('Thank you for completing the assessment. Your results are ready!');
      setCurrentStep('results');
    } finally {
      setIsGeneratingAudit(false);
    }
  }, [userEmail, hasConsent, quizResults, quizAnswers]);

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

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight animate-fade-in">
            Discover Your<br />
            AI <span className="text-primary font-bold">Growth Score</span>
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