/**
 * AI Growth Quiz Component
 * 
 * This component provides an interactive quiz for assessing AI maturity across
 * four key dimensions: Strategy, Implementation, Data, and Culture.
 * 
 * Features:
 * - 12 comprehensive questions covering AI maturity
 * - Progress tracking with visual progress bar
 * - Responsive design with mobile optimization
 * - Smooth navigation between questions
 * - Answer validation and state management
 * - Accessibility features for screen readers
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { QuizAnswers } from "@/pages/ai-growth-score";

/**
 * Interface for quiz question structure
 */
interface QuizQuestion {
  id: string;
  question: string;
  options: {
    text: string;
    score: number;
  }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'How clearly defined is your organization\'s AI strategy?',
    options: [
      { text: 'No formal AI strategy exists', score: 0 },
      { text: 'AI initiatives are ad-hoc with some planning', score: 1 },
      { text: 'We have a documented AI strategy with clear objectives', score: 2 },
      { text: 'AI strategy is integrated into overall business strategy with metrics', score: 3 }
    ]
  },
  {
    id: 'q2',
    question: 'What level of executive support exists for AI initiatives?',
    options: [
      { text: 'Limited or no executive engagement', score: 0 },
      { text: 'Some interest but no dedicated resources', score: 1 },
      { text: 'Strong support with allocated budget', score: 2 },
      { text: 'AI is a CEO/board-level priority with dedicated leadership', score: 3 }
    ]
  },
  {
    id: 'q3',
    question: 'How well do your AI initiatives align with business outcomes?',
    options: [
      { text: 'AI projects are mainly experimental with unclear ROI', score: 0 },
      { text: 'Some alignment but limited measurement', score: 1 },
      { text: 'Most AI projects target specific business metrics', score: 2 },
      { text: 'All AI initiatives directly tie to revenue/cost reduction goals', score: 3 }
    ]
  },
  {
    id: 'q4',
    question: 'What is your current AI implementation maturity?',
    options: [
      { text: 'No AI tools or systems in production', score: 0 },
      { text: 'Testing AI tools or running small pilots', score: 1 },
      { text: 'Several AI solutions deployed in specific functions', score: 2 },
      { text: 'AI integrated across multiple business processes', score: 3 }
    ]
  },
  {
    id: 'q5',
    question: 'How would you rate your team\'s AI/ML technical capabilities?',
    options: [
      { text: 'Limited technical AI expertise internally', score: 0 },
      { text: 'Some technical skills but rely heavily on vendors', score: 1 },
      { text: 'Solid internal capabilities with external support', score: 2 },
      { text: 'Strong in-house AI/ML team with proven delivery', score: 3 }
    ]
  },
  {
    id: 'q6',
    question: 'How robust is your AI project delivery methodology?',
    options: [
      { text: 'No standardized approach to AI projects', score: 0 },
      { text: 'Basic project management with some AI considerations', score: 1 },
      { text: 'Established AI project methodology with templates', score: 2 },
      { text: 'Mature AI-first delivery framework with continuous improvement', score: 3 }
    ]
  },
  {
    id: 'q7',
    question: 'What is the quality and accessibility of your data?',
    options: [
      { text: 'Data is fragmented, poor quality, or hard to access', score: 0 },
      { text: 'Some clean data available but requires significant work', score: 1 },
      { text: 'Most data is clean and accessible with some gaps', score: 2 },
      { text: 'High-quality, well-governed data readily available for AI', score: 3 }
    ]
  },
  {
    id: 'q8',
    question: 'How mature is your data governance and privacy framework?',
    options: [
      { text: 'Limited data governance with privacy concerns', score: 0 },
      { text: 'Basic data policies but inconsistent enforcement', score: 1 },
      { text: 'Strong data governance with clear privacy protocols', score: 2 },
      { text: 'Advanced data governance enabling secure AI innovation', score: 3 }
    ]
  },
  {
    id: 'q9',
    question: 'How effectively do you measure and monitor AI performance?',
    options: [
      { text: 'No systematic measurement of AI outcomes', score: 0 },
      { text: 'Basic tracking of technical metrics only', score: 1 },
      { text: 'Regular monitoring of business and technical metrics', score: 2 },
      { text: 'Real-time dashboards with automated alerts and optimization', score: 3 }
    ]
  },
  {
    id: 'q10',
    question: 'What is your organization\'s AI literacy level?',
    options: [
      { text: 'Limited understanding of AI across the organization', score: 0 },
      { text: 'Some awareness but significant knowledge gaps', score: 1 },
      { text: 'Good AI literacy in key roles with ongoing training', score: 2 },
      { text: 'High AI fluency across all levels with continuous learning', score: 3 }
    ]
  },
  {
    id: 'q11',
    question: 'How readily does your culture embrace AI-driven change?',
    options: [
      { text: 'Significant resistance to AI adoption', score: 0 },
      { text: 'Mixed reception with some skepticism', score: 1 },
      { text: 'Generally positive attitude with change management support', score: 2 },
      { text: 'Enthusiastic adoption with AI-first mindset', score: 3 }
    ]
  },
  {
    id: 'q12',
    question: 'How well do you manage AI ethics and responsible AI practices?',
    options: [
      { text: 'No formal consideration of AI ethics or bias', score: 0 },
      { text: 'Awareness of issues but no systematic approach', score: 1 },
      { text: 'Clear ethical guidelines with regular reviews', score: 2 },
      { text: 'Comprehensive responsible AI framework with ongoing monitoring', score: 3 }
    ]
  }
];

/**
 * Props interface for AIGrowthQuiz component
 */
interface AIGrowthQuizProps {
  /** Callback function called when quiz is completed with all answers */
  onComplete: (answers: QuizAnswers) => void;
}

/**
 * AI Growth Quiz component for assessing AI maturity
 * 
 * This component renders an interactive quiz with 12 questions covering
 * four key dimensions of AI maturity: Strategy, Implementation, Data, and Culture.
 * 
 * Features:
 * - Progressive question navigation with validation
 * - Visual progress tracking
 * - Responsive design for all screen sizes
 * - Accessibility features for keyboard navigation
 * - Answer state management and persistence
 * 
 * @param onComplete - Callback function called when quiz is completed
 */
const AIGrowthQuiz = ({ onComplete }: AIGrowthQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const question = quizQuestions[currentQuestion];

  /**
   * Handle option selection for current question
   * 
   * @param score - Selected option score (0-3)
   */
  const handleOptionSelect = (score: number) => {
    setSelectedOption(score);
    setAnswers(prev => ({
      ...prev,
      [question.id]: score
    }));
  };

  /**
   * Handle navigation to next question or completion
   * Validates that an option is selected before proceeding
   */
  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(answers[quizQuestions[currentQuestion + 1].id] ?? null);
    } else {
      onComplete(answers);
    }
  };

  /**
   * Handle navigation to previous question
   * Restores the previously selected option for that question
   */
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedOption(answers[quizQuestions[currentQuestion - 1].id] ?? null);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-foreground">AI Growth Score Assessment</h1>
            <span className="text-muted-foreground">
              {currentQuestion + 1} of {quizQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <div className="bg-card rounded-lg shadow-medium p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-6 sm:mb-8 leading-relaxed">
            {question.question}
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option.score)}
                className={`w-full p-3 sm:p-4 text-left rounded-lg border-2 transition-all duration-200 hover:shadow-soft touch-manipulation ${
                  selectedOption === option.score
                    ? 'border-primary bg-primary/5 text-foreground'
                    : 'border-input bg-background text-muted-foreground hover:border-primary/50'
                }`}
              >
                <div className="flex items-start sm:items-center">
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 sm:mr-4 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0 ${
                    selectedOption === option.score
                      ? 'border-primary bg-primary'
                      : 'border-input bg-background'
                  }`} style={{ minWidth: '20px', minHeight: '20px' }}>
                    {selectedOption === option.score && (
                      <div className="w-2 h-2 bg-white rounded-full" style={{ minWidth: '8px', minHeight: '8px' }} />
                    )}
                  </div>
                  <span className="text-sm sm:text-base leading-relaxed">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button
            variant="cta"
            onClick={handleNext}
            disabled={selectedOption === null}
            className="flex items-center"
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Complete Assessment' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIGrowthQuiz;