import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizResults } from "@/pages/ai-growth-score";
import { GeminiAPI } from "@/lib/geminiAPI";
import { 
  TrendingUp, 
  Target, 
  Database, 
  Users, 
  Calendar,
  CheckCircle2,
  ArrowRight,
  Mail,
  Loader2
} from "lucide-react";

interface AIGrowthResultsProps {
  results: QuizResults;
  userEmail: string;
  utmParams: {[key: string]: string};
  quizAnswers: {[key: string]: number};
  auditContent: string;
}

const AIGrowthResults = ({ results, userEmail, utmParams, quizAnswers, auditContent }: AIGrowthResultsProps) => {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const geminiAPI = useMemo(() => new GeminiAPI(), []);

  useEffect(() => {
    const generateRecommendations = async () => {
      try {
        const prompt = `Based on the following AI maturity assessment results, provide 3 specific, actionable recommendations for improvement:
        
        Overall Score: ${results.score}%
        Maturity Band: ${results.band}
        
        Dimension Scores:
        - AI Strategy: ${results.dimensions.strategy}%
        - Implementation: ${results.dimensions.implementation}%
        - Data Readiness: ${results.dimensions.data}%
        - Culture & Change: ${results.dimensions.culture}%
        
        Please provide 3 concise, specific recommendations that will help improve the areas with the lowest scores.
        Format each recommendation in a single sentence without numbering.`;

        const response = await geminiAPI.generateContent(prompt);
        const recommendations = response.split('\n').filter(r => r.trim().length > 0).slice(0, 3);
        setRecommendations(recommendations);
        
        // Save user data with complete information
        const userData = {
          timestamp: new Date().toISOString(),
          email: userEmail,
          score: results.score,
          band: results.band,
          dimensions: results.dimensions,
          recommendations: recommendations,
          utmParams: utmParams,
          auditContent: auditContent,
          quizAnswers: quizAnswers
        };

        try {
          const { saveUserData } = await import('@/lib/storage');
          await saveUserData(userData);
        } catch (error) {
          console.error('Error saving user data:', error);
        }
      } catch (error) {
        console.error('Error generating recommendations:', error);
        const defaultRecommendations = [
          'Develop a comprehensive AI strategy aligned with business goals',
          'Implement data governance and quality improvement processes',
          'Create an AI training program to build organizational capabilities'
        ];
        setRecommendations(defaultRecommendations);
        
        // Save user data with default recommendations
        const userData = {
          timestamp: new Date().toISOString(),
          email: userEmail,
          score: results.score,
          band: results.band,
          dimensions: results.dimensions,
          recommendations: defaultRecommendations,
          utmParams: utmParams,
          auditContent: auditContent,
          quizAnswers: quizAnswers
        };

        try {
          const { saveUserData } = await import('@/lib/storage');
          await saveUserData(userData);
        } catch (error) {
          console.error('Error saving user data:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    generateRecommendations();
  }, [results, geminiAPI, userEmail, utmParams, auditContent, quizAnswers]);

  const getBandColor = (band: string) => {
    switch (band) {
      case 'Accelerator': return 'text-green-600 bg-green-50 border-green-200';
      case 'Experimenter': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Explorer': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getBandDescription = (band: string) => {
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
  };

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

  const handleBookConsultation = () => {
    // GA4 event - consultation booking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'consultation_interest', {
        event_category: 'conversion',
        event_label: 'AI Growth Score Consultation',
        value: results.score,
        ...utmParams
      });
    }
    
    // Open consultation booking (could be Calendly or similar)
    window.open('https://calendly.com/alviglobal/ai-growth-consultation', '_blank');
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your AI Growth Score
          </h1>
          <p className="text-xl text-muted-foreground">
            Personalized insights for {userEmail}
          </p>
        </div>

        {/* Score Overview */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-medium">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-4">Overall Score</CardTitle>
              <div className="text-6xl font-bold text-primary mb-2">
                {results.score}%
              </div>
              <div className={`inline-flex px-4 py-2 rounded-full border ${getBandColor(results.band)}`}>
                <span className="font-semibold">{results.band}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                {getBandDescription(results.band)}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Dimension Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(results.dimensions).map(([key, score]) => {
                const Icon = dimensionIcons[key as keyof typeof dimensionIcons];
                const label = dimensionLabels[key as keyof typeof dimensionLabels];
                
                return (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Icon className="w-5 h-5 text-primary mr-2" />
                        <span className="font-medium">{label}</span>
                      </div>
                      <span className="font-semibold">{score}%</span>
                    </div>
                    <Progress value={score} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* AI-Generated Recommendations */}
        <Card className="shadow-medium mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Target className="w-6 h-6 text-primary mr-2" />
              AI-Powered Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">
                  Generating personalized recommendations...
                </span>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {recommendations.map((recommendation, index) => (
                  <div key={index} className="bg-muted/10 p-6 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-2">
                      {index + 1}
                    </div>
                    <p className="text-foreground font-medium">
                      {recommendation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="bg-gradient-hero rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Accelerate Your AI Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Get a personalized 30-minute strategy session with our AI growth specialists. 
            We'll dive deeper into your results and create a tailored roadmap for your organization.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="cta" 
              size="xl"
              onClick={handleBookConsultation}
              className="group min-w-[280px]"
            >
              <Calendar className="mr-2" />
              Book Strategy Session
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="cta-outline" 
              size="xl"
              className="group min-w-[280px]"
              onClick={() => window.location.href = 'mailto:hello@alviglobal.com?subject=AI Growth Score Results&body=Hi, I just completed the AI Growth Score assessment and would like to discuss my results.'}
            >
              <Mail className="mr-2" />
              Email Results
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* What's Included */}
        <div className="mt-12 bg-card p-8 rounded-lg shadow-soft">
          <h3 className="text-2xl font-bold text-center mb-8">
            What's Included in Your Strategy Session
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <CheckCircle2 className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Deep Dive Analysis</h4>
              <p className="text-muted-foreground text-sm">
                Detailed review of your assessment results and current AI maturity
              </p>
            </div>
            <div className="text-center">
              <CheckCircle2 className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Custom Roadmap</h4>
              <p className="text-muted-foreground text-sm">
                90-day action plan with prioritized initiatives and success metrics
              </p>
            </div>
            <div className="text-center">
              <CheckCircle2 className="w-8 h-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Resource Recommendations</h4>
              <p className="text-muted-foreground text-sm">
                Specific tools, partners, and capabilities needed for your next phase
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIGrowthResults;