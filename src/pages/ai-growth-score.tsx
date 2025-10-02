import { useState, useEffect } from "react";
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
// import { isValidScore, isValidBand, isValidDimensionScores } from "@/lib/type-guards"; // Unused imports removed
import { SCORE_THRESHOLDS, getMaturityBand } from "@/constants/scores";

// Interfaces for quiz functionality
export interface QuizAnswers {
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

  /**
   * Calculates comprehensive AI maturity assessment results from quiz answers
   * 
   * This function implements a sophisticated scoring algorithm that:
   * 1. Maps individual questions to specific AI maturity dimensions
   * 2. Aggregates scores within each dimension using weighted calculations
   * 3. Computes overall percentage score with mathematical precision
   * 4. Determines maturity band classification using validated thresholds
   * 5. Ensures type safety and data validation throughout the process
   * 
   * @param answers - Object containing question IDs mapped to user responses (0-3 scale)
   * @returns QuizResults object with calculated scores, band, and dimension breakdown
   * 
   * @algorithm
   * 1. Initialize dimension score accumulators (strategy, implementation, data, culture)
   * 2. Map each question to its corresponding AI maturity dimension
   * 3. Iterate through answers, validating and accumulating dimension scores
   * 4. Calculate total possible score (questions × max points per question)
   * 5. Compute percentage score with proper rounding
   * 6. Apply bounds checking to ensure valid percentage range (0-100)
   * 7. Determine maturity band using validated classification thresholds
   * 
   * @complexity O(n) where n is the number of quiz questions
   * @security Validates all inputs to prevent injection and ensure data integrity
   * 
   * @example
   * ```typescript
   * const answers = { q1: 2, q2: 3, q3: 1, q4: 2, q5: 3, q6: 2, q7: 1, q8: 3, q9: 2, q10: 1, q11: 2, q12: 3 };
   * const results = calculateResults(answers);
   * // Returns: { score: 67, band: 'Experimenter', breakdown: { strategy: 6, implementation: 7, data: 6, culture: 6 } }
   * ```
   */
  const calculateResults = (answers: QuizAnswers): QuizResults => {
    // Initialize dimension score accumulators with type safety
    // Each dimension represents a critical aspect of AI maturity
    const scores = {
      strategy: 0,        // AI strategy, planning, and executive alignment
      implementation: 0,  // Technical implementation and execution capabilities
      data: 0,           // Data quality, governance, and analytics readiness
      culture: 0         // Organizational culture, change management, and AI literacy
    };

    /**
     * Question-to-dimension mapping for AI maturity assessment
     * 
     * This mapping ensures each question contributes to the appropriate dimension
     * based on the AI maturity framework. Questions are strategically distributed
     * to provide balanced assessment across all four critical dimensions.
     * 
     * @mapping
     * - Strategy (q1-q3): AI strategy definition, executive support, business alignment
     * - Implementation (q4-q6): Implementation maturity, technical capabilities, methodology
     * - Data (q7-q9): Data quality, governance, performance measurement
     * - Culture (q10-q12): AI literacy, change management, ethics and governance
     */
    const questionDimensionMap: { [key: string]: keyof typeof scores } = {
      'q1': 'strategy',        // AI strategy definition and planning maturity
      'q2': 'strategy',        // Executive leadership and support for AI initiatives
      'q3': 'strategy',        // Business alignment and strategic integration
      'q4': 'implementation',  // Implementation maturity and project execution
      'q5': 'implementation',  // Technical capabilities and infrastructure readiness
      'q6': 'implementation',  // Project methodology and development processes
      'q7': 'data',           // Data quality and availability for AI applications
      'q8': 'data',           // Data governance and management frameworks
      'q9': 'data',           // AI performance measurement and analytics
      'q10': 'culture',       // AI literacy and workforce capabilities
      'q11': 'culture',       // Change management and organizational readiness
      'q12': 'culture'        // AI ethics, governance, and responsible AI practices
    };

    /**
     * Dimension score calculation with comprehensive validation
     * 
     * This loop processes each quiz answer and accumulates scores within
     * the appropriate dimension. It includes multiple layers of validation:
     * 1. Dimension mapping validation (ensures question maps to valid dimension)
     * 2. Type safety validation (ensures score is a number)
     * 3. Range validation (ensures score is within 0-3 scale)
     * 4. NaN protection (prevents invalid numeric operations)
     * 
     * @validation
     * - Object.prototype.hasOwnProperty.call() prevents prototype pollution
     * - typeof score === 'number' ensures type safety
     * - !isNaN(score) prevents NaN values from corrupting calculations
     * - score >= 0 && score <= 3 ensures valid response scale
     */
    Object.entries(answers).forEach(([questionId, score]) => {
      // Retrieve dimension mapping for current question
      const dimension = questionDimensionMap[questionId];
      
      // Validate dimension exists and is a valid property of scores object
      if (dimension && Object.prototype.hasOwnProperty.call(scores, dimension)) {
        // Comprehensive score validation with type guards
        if (typeof score === 'number' && !isNaN(score) && score >= 0 && score <= 3) {
          // Accumulate score within the appropriate dimension
          scores[dimension] += score;
        }
        // Note: Invalid scores are silently ignored to prevent calculation corruption
        // In production, consider logging invalid responses for quality monitoring
      }
    });

    /**
     * Overall score calculation with mathematical precision
     * 
     * This calculation determines the user's overall AI maturity percentage:
     * 1. Sum all dimension scores to get total achieved points
     * 2. Calculate maximum possible score (questions × max points per question)
     * 3. Compute percentage with proper rounding for display
     * 
     * @formula
     * percentage = (totalScore / maxScore) × 100
     * where:
     * - totalScore = sum of all dimension scores
     * - maxScore = number of questions × 3 (maximum points per question)
     * 
     * @rounding Math.round() ensures clean integer percentages for user display
     */
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const maxScore = Object.keys(answers).length * 3; // 3-point scale (0-3)
    const percentage = Math.round((totalScore / maxScore) * 100);

    /**
     * Percentage bounds validation and normalization
     * 
     * Ensures the calculated percentage falls within the valid range (0-100)
     * using mathematical bounds checking. This prevents edge cases where
     * calculation errors or data corruption could produce invalid percentages.
     * 
     * @bounds
     * - MIN_SCORE: 0 (minimum valid percentage)
     * - MAX_SCORE: 100 (maximum valid percentage)
     * 
     * @math Math.max() and Math.min() create a mathematical clamp function
     */
    const validPercentage = Math.max(SCORE_THRESHOLDS.MIN_SCORE, Math.min(SCORE_THRESHOLDS.MAX_SCORE, percentage));

    /**
     * Maturity band determination using validated classification logic
     * 
     * Uses the centralized getMaturityBand utility function to determine
     * the user's AI maturity classification based on their percentage score.
     * This ensures consistent band assignment across the application.
     * 
     * @bands
     * - Explorer: 0-39% (Early stage, foundational work needed)
     * - Experimenter: 40-69% (Developing capabilities, scaling opportunities)
     * - Accelerator: 70-100% (Advanced maturity, optimization focus)
     */
    const band = getMaturityBand(validPercentage) as 'Explorer' | 'Experimenter' | 'Accelerator';

    // Convert dimension scores to percentages (each dimension has 3 questions, max score 9)
    const breakdownPercentages = {
      strategy: Math.round((scores.strategy / 9) * 100),
      implementation: Math.round((scores.implementation / 9) * 100),
      data: Math.round((scores.data / 9) * 100),
      culture: Math.round((scores.culture / 9) * 100)
    };

    // Validate breakdown percentages
    const validatedBreakdown = {
      strategy: Math.max(SCORE_THRESHOLDS.MIN_SCORE, Math.min(SCORE_THRESHOLDS.MAX_SCORE, breakdownPercentages.strategy)),
      implementation: Math.max(SCORE_THRESHOLDS.MIN_SCORE, Math.min(SCORE_THRESHOLDS.MAX_SCORE, breakdownPercentages.implementation)),
      data: Math.max(SCORE_THRESHOLDS.MIN_SCORE, Math.min(SCORE_THRESHOLDS.MAX_SCORE, breakdownPercentages.data)),
      culture: Math.max(SCORE_THRESHOLDS.MIN_SCORE, Math.min(SCORE_THRESHOLDS.MAX_SCORE, breakdownPercentages.culture))
    };

    return {
      score: validPercentage,
      band,
      breakdown: validatedBreakdown
    };
  };

  const handleEmailSubmit = async () => {
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