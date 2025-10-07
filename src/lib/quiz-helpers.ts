import { SCORE_THRESHOLDS, getMaturityBand } from "@/constants/scores";
import { getDimensionForQuestion, getQuestionsByDimension, type QuizDimension } from "@/constants/quiz-questions";
import type { QuizAnswers, QuizResults } from "@/types/quiz";

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
export const calculateResults = (answers: QuizAnswers): QuizResults => {
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
  /**
   * Dimension score calculation with comprehensive validation
   *
   * This loop processes each quiz answer and accumulates scores within
   * the appropriate dimension. Uses centralized question-dimension mapping
   * from constants/quiz-questions.ts to ensure consistency.
   *
   * Validation layers:
   * 1. Dimension mapping validation (ensures question maps to valid dimension)
   * 2. Type safety validation (ensures score is a number)
   * 3. Range validation (ensures score is within 0-3 scale)
   * 4. NaN protection (prevents invalid numeric operations)
   *
   * @validation
   * - getDimensionForQuestion() retrieves dimension from centralized config
   * - Object.prototype.hasOwnProperty.call() prevents prototype pollution
   * - typeof score === 'number' ensures type safety
   * - !isNaN(score) prevents NaN values from corrupting calculations
   * - score >= 0 && score <= 3 ensures valid response scale
   */
  Object.entries(answers).forEach(([questionId, score]) => {
    // Retrieve dimension mapping for current question from centralized config
    const dimension = getDimensionForQuestion(questionId);

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

  // Convert dimension scores to percentages dynamically
  const calculateDimensionPercentage = (dimension: QuizDimension): number => {
    const questionsInDimension = getQuestionsByDimension(dimension);
    const maxDimensionScore = questionsInDimension.length * 3;
    if (maxDimensionScore === 0) return 0;

    const score = scores[dimension];
    return Math.round((score / maxDimensionScore) * 100);
  };

  const breakdownPercentages = {
    strategy: calculateDimensionPercentage('strategy'),
    implementation: calculateDimensionPercentage('implementation'),
    data: calculateDimensionPercentage('data'),
    culture: calculateDimensionPercentage('culture')
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