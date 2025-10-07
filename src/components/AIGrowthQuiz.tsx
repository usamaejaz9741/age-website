/**
 * @fileoverview AI Growth Quiz Component
 * 
 * Interactive assessment tool for evaluating AI maturity across four critical dimensions:
 * Strategy, Implementation, Data, and Culture. Provides comprehensive evaluation with
 * real-time progress tracking and accessibility support.
 * 
 * @component
 * @example
 * ```tsx
 * <AIGrowthQuiz onComplete={(answers) => handleQuizComplete(answers)} />
 * ```
 * 
 * @features
 * - 📝 12 comprehensive questions covering all AI maturity aspects
 * - 📊 Real-time progress tracking with visual progress bar
 * - 📱 Fully responsive design with mobile-first approach
 * - ⚡ Smooth navigation with keyboard and touch support
 * - ✅ Answer validation and state management
 * - ♿ Full accessibility support with ARIA labels and screen reader compatibility
 * - 🎨 Consistent design with animated transitions
 * - 🔄 Optimized performance with React.memo and useCallback
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

import { useState, memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { QuizAnswers } from "@/pages/ai-growth-score";
import { quizQuestions } from "@/constants/quiz-questions";

// Quiz questions are now imported from @/constants/quiz-questions
// This ensures consistency between question content and dimension scoring

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
const AIGrowthQuiz = memo(({ onComplete }: AIGrowthQuizProps) => {
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
  const handleOptionSelect = useCallback((score: number) => {
    // Validate score is within valid range
    if (typeof score !== 'number' || score < 0 || score > 3 || !Number.isInteger(score)) {
      console.error('Invalid quiz score:', score);
      return;
    }
    
    setSelectedOption(score);
    setAnswers((prev: QuizAnswers) => ({
      ...prev,
      [question?.id || '']: score
    }));
  }, [question?.id]);

  /**
   * Handle navigation to next question or completion
   * Validates that an option is selected before proceeding
   */
  const handleNext = useCallback(() => {
    if (currentQuestion < quizQuestions.length - 1) {
      const nextQuestion = quizQuestions[currentQuestion + 1];
      if (nextQuestion) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(answers[nextQuestion.id] ?? null);
      }
    } else {
      onComplete(answers);
    }
  }, [currentQuestion, answers, onComplete]);

  /**
   * Handle navigation to previous question
   * Restores the previously selected option for that question
   */
  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      const prevQuestion = quizQuestions[currentQuestion - 1];
      if (prevQuestion) {
        setCurrentQuestion(prev => prev - 1);
        setSelectedOption(answers[prevQuestion.id] ?? null);
      }
    }
  }, [currentQuestion, answers]);

  // Early return if question is not found
  if (!question) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Quiz Error</h1>
            <p className="text-muted-foreground">Unable to load quiz question. Please refresh the page.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">AI Growth Score Assessment</h1>
            <span className="text-muted-foreground whitespace-nowrap">
              {currentQuestion + 1} of {quizQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <div className="bg-gradient-card rounded-xl shadow-medium p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-6 sm:mb-8 leading-tight" id={`question-${currentQuestion}`}>
            {question.question}
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option.score)}
                className={`w-full p-4 sm:p-5 text-left rounded-xl border-2 transition-all duration-300 ease-out hover:shadow-soft touch-manipulation focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-[0.98] min-h-[60px] flex items-center quiz-option-button ${
                  selectedOption === option.score
                    ? 'border-primary bg-primary/5 shadow-soft quiz-option-selected ring-2 ring-primary/20'
                    : 'border-input bg-background hover:border-primary/50 hover:bg-primary/2 quiz-option-unselected'
                }`}
                style={{
                  color: 'hsl(var(--resolution-blue-600)) !important'
                }}
                aria-pressed={selectedOption === option.score}
                aria-describedby={`option-${index}-description`}
                aria-labelledby={`question-${currentQuestion}`}
                role="radio"
                tabIndex={0}
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
                  <span id={`option-${index}-description`} className="text-sm sm:text-base leading-relaxed">{option.text}</span>
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
});

AIGrowthQuiz.displayName = 'AIGrowthQuiz';

export default AIGrowthQuiz;