/**
 * AI Growth Score Assessment Page
 * 
 * This page provides an interactive AI maturity assessment that evaluates organizations
 * across four key dimensions: Strategy, Implementation, Data, and Culture.
 * 
 * Features:
 * - Multi-step assessment flow (Hero → Quiz → Email → Results)
 * - 12-question quiz with scoring algorithm
 * - AI-powered personalized recommendations using Gemini API
 * - Email capture with consent management
 * - Google Analytics tracking for user engagement
 * - UTM parameter tracking for marketing attribution
 * 
 * Assessment Flow:
 * 1. Hero section with assessment introduction
 * 2. Interactive quiz with progress tracking
 * 3. Email capture for results delivery
 * 4. Results display with AI-generated recommendations
 * 5. Call-to-action for consultation booking
 */

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIGrowthQuiz from "@/components/AIGrowthQuiz";
import AIGrowthResults from "@/components/AIGrowthResults";
import AIGrowthFAQ from "@/components/AIGrowthFAQ";
import EmailStep from "@/components/EmailStep";
import { generateAIAudit, sendAuditEmail, type AuditData } from "@/lib/gemini";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, TrendingUp, Target, Zap } from "lucide-react";

/**
 * Interface for storing quiz answers
 * Maps question IDs to their selected score values (0-3)
 */
export interface QuizAnswers {
  [key: string]: number;
}

/**
 * Interface for quiz results after calculation
 * Contains overall score, maturity band, dimension breakdown, and recommendations
 */
export interface QuizResults {
  /** Overall AI maturity score (0-100) */
  score: number;
  /** Maturity band based on score ranges */
  band: 'Explorer' | 'Experimenter' | 'Accelerator';
  /** Individual dimension scores */
  dimensions: {
    strategy: number;
    implementation: number;
    data: number;
    culture: number;
  };
  /** AI-generated personalized recommendations */
  recommendations: string[];
}

/**
 * Main AI Growth Score assessment component
 * 
 * Manages the multi-step assessment flow and handles all user interactions,
 * data processing, and AI integration for generating personalized recommendations.
 */
const AIGrowthScore = () => {
  // Current step in the assessment flow
  const [currentStep, setCurrentStep] = useState<'hero' | 'quiz' | 'email' | 'results'>('hero');
  
  // User's quiz answers (question ID → score mapping)
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({});
  
  // User's email address for results delivery
  const [userEmail, setUserEmail] = useState('');
  
  // GDPR consent for email communications
  const [hasConsent, setHasConsent] = useState(false);
  
  // Calculated quiz results with AI recommendations
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  
  // UTM parameters for marketing attribution
  const [utmParams, setUtmParams] = useState<{[key: string]: string}>({});
  
  // Loading state for AI audit generation
  const [isGeneratingAudit, setIsGeneratingAudit] = useState(false);
  
  // Generated audit content
  const [auditContent, setAuditContent] = useState<string>('');
  
  // State for mobile indicator text expansion
  const [isIndicatorExpanded, setIsIndicatorExpanded] = useState(false);

  /**
   * Handles email submission and AI audit generation
   * 
   * This function:
   * 1. Validates user input and consent
   * 2. Calculates quiz results
   * 3. Generates AI-powered audit using Gemini API
   * 4. Sends email with audit results
   * 5. Tracks conversion in Google Analytics
   * 6. Transitions to results view
   */
  const handleEmailSubmit = async () => {
    console.log('=== EMAIL SUBMIT CLICKED ===');
    console.log('Email:', userEmail);
    console.log('Has Consent:', hasConsent);
    console.log('Is Generating:', isGeneratingAudit);
    console.log('Quiz Answers:', quizAnswers);
    
    // Validate required fields and prevent duplicate submissions
    if (!userEmail || !hasConsent || isGeneratingAudit) {
      console.log('Validation failed - missing email, consent, or already generating');
      return;
    }
    
    console.log('Starting audit generation...');
    setIsGeneratingAudit(true);
    
    try {
      // Calculate quiz results based on user answers
      console.log('Calculating quiz results...');
      const results = calculateResults(quizAnswers);
      console.log('Quiz results:', results);
      setQuizResults(results);

      // Prepare data for AI audit generation
      // Note: Using default values for company details as they're not collected in the current form
      // Future enhancement: Add company name, industry, and revenue fields to the assessment
      const auditData: AuditData = {
        companyName: "Your Company", // Default placeholder - could be enhanced with form collection
        industry: "Technology", // Default placeholder - could be enhanced with industry selection
        currentState: {
          strategy: results.dimensions.strategy,
          implementation: results.dimensions.implementation,
          data: results.dimensions.data,
          culture: results.dimensions.culture,
        },
        monthlyRevenue: "$100k-$500k", // Default placeholder - could be enhanced with revenue range selection
        goals: ["Implement AI automation", "Increase efficiency"],
      };
      
      // Generate comprehensive AI audit using Gemini API
      console.log('Generating AI audit...');
      const generatedAuditContent = await generateAIAudit(auditData);
      console.log('Audit generated successfully');
      setAuditContent(generatedAuditContent);
      
      // Send audit results to user's email (logs for manual sending)
      console.log('Saving audit data...');
      await sendAuditEmail(userEmail, generatedAuditContent);
      
      // Track successful lead capture in Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'lead_captured', {
          event_category: 'conversion',
          event_label: 'AI Growth Score Email',
          value: results.score,
          ...utmParams
        });
      }
      
      // Transition to results view
      console.log('Transitioning to results view...');
      setCurrentStep('results');
      console.log('=== EMAIL SUBMIT COMPLETED SUCCESSFULLY ===');
    } catch (error) {
      console.error('Error generating audit:', error);
      console.error('Full error details:', error);
      
      // Show user-friendly error message
      // Note: In a production environment, you might want to show a toast notification
      // or redirect to an error page with retry functionality
      alert('Sorry, there was an error generating your AI audit. Please try again or contact support if the issue persists.');
    } finally {
      setIsGeneratingAudit(false);
    }
  };

  /**
   * Calculates the score for a specific dimension based on related questions
   * 
   * @param answers - User's quiz answers
   * @param questions - Array of question IDs for this dimension
   * @returns Percentage score (0-100) for the dimension
   */
  const calculateDimensionScore = (answers: QuizAnswers, questions: string[]): number => {
    // Get scores for all questions in this dimension (default to 0 if not answered)
    const scores = questions.map(q => answers[q] || 0);
    const total = scores.reduce((sum, score) => sum + score, 0);
    const maxPossible = questions.length * 3; // Each question has max score of 3
    return Math.round((total / maxPossible) * 100);
  };

  /**
   * Generates personalized recommendations based on maturity band and dimension scores
   * 
   * @param band - User's maturity band (Explorer, Experimenter, Accelerator)
   * @param dimensions - Individual dimension scores
   * @returns Array of up to 3 actionable recommendations
   */
  const getRecommendations = (band: QuizResults['band'], dimensions: { [key: string]: number }): string[] => {
    const recommendations: string[] = [];
    
    // Add recommendations for dimensions with low scores (< 60%)
    Object.entries(dimensions).forEach(([dimension, score]) => {
      if (score < 60) {
        switch (dimension) {
          case 'strategy':
            recommendations.push("Develop a comprehensive AI strategy aligned with business objectives");
            break;
          case 'implementation':
            recommendations.push("Start with pilot projects to demonstrate AI value");
            break;
          case 'data':
            recommendations.push("Improve data quality and governance practices");
            break;
          case 'culture':
            recommendations.push("Foster an AI-first culture through training and communication");
            break;
        }
      }
    });

    // Add band-specific recommendations based on maturity level
    switch (band) {
      case 'Explorer':
        recommendations.push("Begin with AI readiness assessment and strategy development");
        break;
      case 'Experimenter':
        recommendations.push("Scale successful pilots and build internal AI capabilities");
        break;
      case 'Accelerator':
        recommendations.push("Optimize AI operations and explore advanced use cases");
        break;
    }

    // Return top 3 most relevant recommendations
    return recommendations.slice(0, 3);
  };

  /**
   * Calculates final quiz results including overall score, maturity band, and recommendations
   * 
   * @param answers - User's quiz answers
   * @returns Complete quiz results with scoring and recommendations
   */
  const calculateResults = (answers: QuizAnswers): QuizResults => {
    // Map question IDs to their respective dimensions
    const questionMap = {
      strategy: ['q1', 'q2', 'q3'],        // Questions 1-3: AI strategy and planning
      implementation: ['q4', 'q5', 'q6'],  // Questions 4-6: Technical implementation
      data: ['q7', 'q8', 'q9'],            // Questions 7-9: Data readiness and governance
      culture: ['q10', 'q11', 'q12']       // Questions 10-12: Culture and change management
    };

    // Calculate individual dimension scores
    const dimensions = {
      strategy: calculateDimensionScore(answers, questionMap.strategy),
      implementation: calculateDimensionScore(answers, questionMap.implementation),
      data: calculateDimensionScore(answers, questionMap.data),
      culture: calculateDimensionScore(answers, questionMap.culture)
    };

    // Calculate overall AI maturity score (average of all dimensions)
    const totalScore = Object.values(dimensions).reduce((sum, score) => sum + score, 0);
    const score = Math.round(totalScore / 4);

    // Determine maturity band based on overall score
    let band: QuizResults['band'];
    if (score >= 75) band = 'Accelerator';      // Advanced AI maturity
    else if (score >= 50) band = 'Experimenter'; // Intermediate AI maturity
    else band = 'Explorer';                     // Early stage AI maturity

    // Generate personalized recommendations based on results
    const recommendations = getRecommendations(band, dimensions);

    return {
      score,
      band,
      dimensions,
      recommendations
    };
  };

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
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'AI Growth Score',
        page_location: window.location.href,
        ...utms
      });
    }
  }, []);

  const startQuiz = () => {
    setCurrentStep('quiz');
    
    // GA4 event - quiz start
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'quiz_start', {
        event_category: 'engagement',
        event_label: 'AI Growth Score Quiz',
        ...utmParams
      });
    }
  };

  const handleQuizComplete = (answers: QuizAnswers) => {
    console.log('=== QUIZ COMPLETED ===');
    console.log('Quiz answers received:', answers);
    setQuizAnswers(answers);
    setCurrentStep('email');
    console.log('Moved to email step');
    
    // GA4 event - quiz complete
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'quiz_complete', {
        event_category: 'engagement',
        event_label: 'AI Growth Score Quiz',
        ...utmParams
      });
    }
  };

  // State and handlers for the email step will be managed in the EmailStep component

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20">
        {currentStep === 'hero' && (
          <div className="max-w-7xl mx-auto px-6 text-center">
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

            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6 animate-fade-in">
              Discover Your AI{" "}
              <span className="text-primary">Growth Score</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-in">
              A 3-minute diagnostic that reveals your AI readiness across strategy, implementation, 
              data, and culture. Get your personalized roadmap to AI-driven growth.
            </p>
            
            <Button
              size="xl"
              variant="cta"
              onClick={startQuiz}
              className="animate-fade-in"
            >
              Start Free Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <div className="grid md:grid-cols-3 gap-8 mt-20">
              {[
                {
                  icon: TrendingUp,
                  title: "5-Minute Quiz",
                  description: "Quick assessment of your AI readiness across key dimensions"
                },
                {
                  icon: Target,
                  title: "AI Growth Score",
                  description: "Benchmark your maturity level against industry standards"
                },
                {
                  icon: Zap,
                  title: "Action Plan",
                  description: "Get personalized recommendations to accelerate growth"
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="p-6 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {currentStep === 'quiz' && (
          <AIGrowthQuiz onComplete={handleQuizComplete} />
        )}
        
        {currentStep === 'email' && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md mx-auto p-8 bg-card rounded-lg shadow-medium animate-fade-in">
              <h2 className="text-2xl font-heading font-bold text-center mb-6">Almost there!</h2>
              <p className="text-muted-foreground text-center mb-8">
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
            </div>
          </div>
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
      </main>

      <Footer />
    </div>
  );
};

export default AIGrowthScore;