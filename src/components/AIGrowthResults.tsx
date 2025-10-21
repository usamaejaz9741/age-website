/**
 * @fileoverview AI Growth Results Component
 * 
 * Displays comprehensive results from the AI Growth Score assessment, including
 * personalized recommendations, dimension analysis, and consultation booking.
 * 
 * @component
 * @example
 * ```tsx
 * <AIGrowthResults 
 *   results={quizResults}
 *   userEmail="user@example.com"
 *   quizAnswers={answers}
 * />
 * ```
 * 
 * @features
 * - 📊 Interactive score visualization with animated progress bars
 * - 🎯 Detailed dimension breakdown with individual metrics
 * - 🤖 AI-generated personalized recommendations with fallback
 * - 📧 Email confirmation and audit delivery system
 * - 📅 Integrated consultation booking via Calendly
 * - 💾 Automatic data persistence to database with localStorage fallback
 * - 🎨 Responsive design with smooth animations
 * - ♿ Full accessibility support with ARIA labels
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

import { useState, useEffect, useMemo, memo, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBandColors } from "@/constants/colors";
import type { QuizResults } from "@/types/quiz";
import { GeminiAPI } from "@/lib/geminiAPI";
import { openCalendlyBooking } from "@/lib/calendly";
import { toast } from "@/components/ui/use-toast";
import { ERROR_MESSAGES } from "@/constants/messages";
import { getFallbackRecommendations } from "@/constants/recommendations";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { 
  TrendingUp, 
  Target, 
  Database, 
  Users, 
  Calendar,
  CheckCircle2,
  ArrowRight,
  Mail,
  ExternalLink
} from "lucide-react";
import { HEADING_SIZES, TEXT_SIZES, MARGIN_BOTTOM, ICON_SIZES, BORDER_RADIUS, SHADOWS, GAP, BACKGROUNDS, CARD_PADDING } from "@/constants/design-system";
import { generateMailtoLink } from "@/constants/contact";

/**
 * Props interface for the AIGrowthResults component
 * 
 * @interface AIGrowthResultsProps
 */
interface AIGrowthResultsProps {
  /** Quiz results containing score, band, and dimension breakdown */
  results: QuizResults;
  /** User's email address for follow-up and audit delivery */
  userEmail: string;
  /** UTM parameters for marketing attribution and analytics */
  utmParams: {[key: string]: string};
  /** Individual quiz answers for detailed analysis and recommendations */
  quizAnswers: {[key: string]: number};
  /** Generated AI audit content for comprehensive report */
  auditContent: string;
}

/**
 * AI Growth Results component that displays assessment results and recommendations
 * 
 * This component handles the complete results display workflow:
 * 1. Generates AI-powered recommendations based on quiz results
 * 2. Displays interactive score visualization and dimension breakdown
 * 3. Provides consultation booking and audit delivery options
 * 4. Persists user data to database with fallback to localStorage
 * 
 * @param props - Component props containing results, user data, and audit content
 * @returns JSX element displaying the comprehensive assessment results
 * 
 * @throws {Error} When AI recommendation generation fails (handled gracefully with fallback)
 */
const AIGrowthResults = memo(({ results, userEmail, utmParams, quizAnswers, auditContent }: AIGrowthResultsProps) => {
  // State for managing recommendations and loading status
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Ref to track if component is mounted (prevents state updates after unmount)
  const isMounted = useRef(true);
  
  // Initialize Gemini API client for generating recommendations
  const geminiAPI = useMemo(() => new GeminiAPI(), []);

  useEffect(() => {
    // Set mounted flag
    isMounted.current = true;
    
    // Create AbortController for request cancellation
    const abortController = new AbortController();
    
    const generateRecommendations = async () => {
      try {
        const prompt = `Based on the following AI maturity assessment results, provide 3 specific, actionable recommendations for improvement:
        
        Overall Score: ${results.score}%
        Maturity Band: ${results.band}
        
        Dimension Scores:
        - AI Strategy: ${results.breakdown.strategy}%
        - Implementation: ${results.breakdown.implementation}%
        - Data Readiness: ${results.breakdown.data}%
        - Culture & Change: ${results.breakdown.culture}%
        
        Please provide 3 concise, specific recommendations that will help improve the areas with the lowest scores.
        Format each recommendation in a single sentence without numbering.`;

        const response = await geminiAPI.generateContent(prompt, abortController.signal);
        const recommendations = response.split('\n').filter(r => r.trim().length > 0).slice(0, 3);
        
        // Only update state if component is still mounted
        if (!isMounted.current) return;
        
        setRecommendations(recommendations);
        
        // Save user data with complete information
        const userData = {
          timestamp: new Date().toISOString(),
          email: userEmail,
          score: results.score,
          band: results.band,
          dimensions: results.breakdown,
          recommendations: recommendations,
          utmParams: utmParams,
          auditContent: auditContent,
          quizAnswers: quizAnswers
        };

        try {
          const { saveUserData } = await import('@/lib/storage');
          await saveUserData(userData);
        } catch (saveError) {
          // Error saving fallback data - non-critical, already logged elsewhere
          if (import.meta.env.DEV) {
            console.error('Error saving fallback user data:', saveError);
          }
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Error generating recommendations:', error);
        }
        
        // Only proceed if component is still mounted
        if (!isMounted.current) return;
        
        // Show user-friendly notification about AI service
        if (error instanceof Error && error.message.includes('temporarily unavailable')) {
          toast({
            title: ERROR_MESSAGES.AI_UNAVAILABLE,
            description: ERROR_MESSAGES.AI_UNAVAILABLE_DESCRIPTION,
            variant: "default",
          });
        }
        
        // Get context-aware fallback recommendations based on score
        const defaultRecommendations = Array.from(getFallbackRecommendations(results.score));
        
        setRecommendations(defaultRecommendations);
        
        // Save user data with default recommendations
        const userData = {
          timestamp: new Date().toISOString(),
          email: userEmail,
          score: results.score,
          band: results.band,
          dimensions: results.breakdown,
          recommendations: defaultRecommendations,
          utmParams: utmParams,
          auditContent: auditContent,
          quizAnswers: quizAnswers
        };

        try {
          const { saveUserData } = await import('@/lib/storage');
          await saveUserData(userData);
        } catch (fallbackSaveError) {
          // Error saving fallback user data - non-critical
          if (import.meta.env.DEV) {
            console.error('Error saving fallback user data:', fallbackSaveError);
          }
        }
      } finally {
        // Only update loading state if component is still mounted
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    generateRecommendations();
    
    // Cleanup function to prevent state updates after unmount and cancel in-flight requests
    return () => {
      isMounted.current = false;
      abortController.abort(); // Cancel any in-flight API requests
    };
  }, [results, geminiAPI, userEmail, utmParams, auditContent, quizAnswers]);

  const getBandColor = useCallback((band: string) => {
    const colors = getBandColors(band);
    return `${colors.text} ${colors.bg} ${colors.border}`;
  }, []);

  const getBandDescription = useCallback((band: string) => {
    switch (band) {
      case 'Accelerator':
        return 'You\'re leading the AI transformation with mature capabilities and strong execution. Focus on optimization and scaling successful initiatives.';
      case 'Experimenter':
        return 'You\'re making solid progress with AI adoption. You have good foundations and are ready to scale proven use cases across the organization.';
      case 'Explorer':
        return 'You\'re at the beginning of your AI journey with significant opportunities ahead. Focus on building foundational capabilities and running targeted pilots.';
      default:
        return '';
    }
  }, []);

  const dimensionIcons = {
    strategy: TrendingUp,
    implementation: Target,
    data: Database,
    culture: Users
  };

  const dimensionLabels = {
    strategy: 'AI Strategy',
    implementation: 'Implementation',
    data: 'Data Readiness',
    culture: 'Culture & Change'
  };

  const handleBookConsultation = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Open Calendly in new tab for AI Growth Consultation
    openCalendlyBooking(
      {
        // Pre-fill with user email if available
        email: userEmail
      },
      {
        utmCampaign: 'ai-growth-score-results',
        utmSource: 'age-website',
        utmMedium: 'assessment',
        utmContent: `score-${results.score}-band-${results.band}`,
        utmTerm: 'consultation-booking'
      },
      'AI Growth Score Results'
    );
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className={`text-center ${MARGIN_BOTTOM.section} animate-fade-in`}>
          <h1 className={`${HEADING_SIZES.h1} text-foreground ${MARGIN_BOTTOM.medium}`}>
            Your AI Growth Score
          </h1>
          <p className={`${TEXT_SIZES.large} text-muted-foreground`}>
            Personalized insights for {userEmail}
          </p>
        </div>

        {/* Score Overview */}
        <div className={`grid md:grid-cols-2 ${GAP.large} ${MARGIN_BOTTOM.large}`}>
          <Card className={SHADOWS.medium}>
            <CardHeader className="text-center">
              <CardTitle className={`${HEADING_SIZES.h3} ${MARGIN_BOTTOM.small}`}>Overall Score</CardTitle>
              <div className={`text-6xl font-bold text-primary ${MARGIN_BOTTOM.xs}`}>
                {results.score}%
              </div>
              <div className={`inline-flex px-4 py-2 rounded-full border ${getBandColor(results.band)}`}>
                <span className="font-semibold">{results.band}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className={`${TEXT_SIZES.base} text-muted-foreground text-center`}>
                {getBandDescription(results.band)}
              </p>
            </CardContent>
          </Card>

          <Card className={SHADOWS.medium}>
            <CardHeader>
              <CardTitle className={`${HEADING_SIZES.h3} ${MARGIN_BOTTOM.small}`}>Dimension Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(results.breakdown).map(([key, score]) => {
                const Icon = dimensionIcons[key as keyof typeof dimensionIcons];
                const label = dimensionLabels[key as keyof typeof dimensionLabels];
                const scoreValue = score as number;
                
                // Assign different colors to different dimensions using Tailwind classes
                const dimensionColorClasses = {
                  strategy: 'text-icon-purple',
                  implementation: 'text-icon-blue',
                  data: 'text-icon-green',
                  culture: 'text-icon-indigo'
                };
                
                return (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Icon 
                          className={`${ICON_SIZES.default} ${dimensionColorClasses[key as keyof typeof dimensionColorClasses]} mr-2`}
                        />
                        <span className={`${TEXT_SIZES.base} font-medium`}>{label}</span>
                      </div>
                      <span className={`${TEXT_SIZES.base} font-semibold`}>{scoreValue}%</span>
                    </div>
                    <Progress value={scoreValue} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* AI-Generated Recommendations */}
        <Card className={`${SHADOWS.medium} ${MARGIN_BOTTOM.large}`}>
          <CardHeader>
            <CardTitle className={`${HEADING_SIZES.h3} flex items-center`}>
              <Target className={`${ICON_SIZES.medium} mr-2 text-icon-blue`} />
              AI-Powered Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <LoadingSpinner
                size="lg"
                message="Generating personalized recommendations..."
                description="This may take a few moments"
                className="py-12"
              />
            ) : (
              <div className={`grid md:grid-cols-3 ${GAP.medium}`}>
                {recommendations.map((recommendation, index) => (
                  <div key={index} className={`bg-muted/10 ${CARD_PADDING.medium} ${BORDER_RADIUS.xl}`}>
                    <div className={`${HEADING_SIZES.h3} text-primary ${MARGIN_BOTTOM.xs}`}>
                      {index + 1}
                    </div>
                    <p className={`${TEXT_SIZES.base} text-foreground font-medium`}>
                      {recommendation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className={`${BACKGROUNDS.heroGradient} ${BORDER_RADIUS.xl} p-8 text-center`}>
          <h2 className={`${HEADING_SIZES.h2} text-foreground ${MARGIN_BOTTOM.small}`}>
            Ready to Accelerate Your AI Journey?
          </h2>
          <p className={`${TEXT_SIZES.large} text-muted-foreground ${MARGIN_BOTTOM.large} max-w-3xl mx-auto`}>
            Get a personalized 30-minute strategy session with our AI growth specialists. 
            We'll dive deeper into your results and create a tailored roadmap for your organization.
          </p>
          
          <div className={`flex flex-col sm:flex-row ${GAP.small} justify-center items-center`}>
                <Button
                  type="button"
                  variant="cta"
                  size="xl"
                  onClick={handleBookConsultation}
                  className="group min-w-[280px]"
                >
                <Calendar className="mr-2" />
                Book Free Consultation
                <ExternalLink className={`${ICON_SIZES.xs} ml-2`} />
              </Button>
            
            <Button 
              variant="cta-outline" 
              size="xl"
              className="group min-w-[280px]"
              onClick={() => {
                window.location.href = generateMailtoLink('growthScoreResults');
              }}
              aria-label="Send email to discuss AI Growth Score results"
            >
              <Mail className="mr-2" />
              Email Results
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* What's Included */}
        <div className={`mt-12 bg-gradient-card ${CARD_PADDING.large} ${BORDER_RADIUS.xl} ${SHADOWS.soft}`}>
          <h3 className={`${HEADING_SIZES.h3} text-center ${MARGIN_BOTTOM.large}`}>
            What's Included in Your Strategy Session
          </h3>
          <div className={`grid md:grid-cols-3 ${GAP.medium}`}>
            <div className="text-center">
              <CheckCircle2 className={`${ICON_SIZES.large} mx-auto my-auto ${MARGIN_BOTTOM.small} text-[var(--icon-green)] flex-shrink-0`} />
              <h4 className={`${HEADING_SIZES.h5} ${MARGIN_BOTTOM.xs}`}>Deep Dive Analysis</h4>
              <p className={`${TEXT_SIZES.small} text-muted-foreground`}>
                Detailed review of your assessment results and current AI maturity
              </p>
            </div>
            <div className="text-center">
              <CheckCircle2 className={`${ICON_SIZES.large} mx-auto my-auto ${MARGIN_BOTTOM.small} text-[var(--icon-green)] flex-shrink-0`} />
              <h4 className={`${HEADING_SIZES.h5} ${MARGIN_BOTTOM.xs}`}>Custom Roadmap</h4>
              <p className={`${TEXT_SIZES.small} text-muted-foreground`}>
                90-day action plan with prioritized initiatives and success metrics
              </p>
            </div>
            <div className="text-center">
              <CheckCircle2 className={`${ICON_SIZES.large} mx-auto my-auto ${MARGIN_BOTTOM.small} text-[var(--icon-green)] flex-shrink-0`} />
              <h4 className={`${HEADING_SIZES.h5} ${MARGIN_BOTTOM.xs}`}>Resource Recommendations</h4>
              <p className={`${TEXT_SIZES.small} text-muted-foreground`}>
                Specific tools, partners, and capabilities needed for your next phase
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

AIGrowthResults.displayName = 'AIGrowthResults';

export default AIGrowthResults;