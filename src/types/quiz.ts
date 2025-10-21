/**
 * @fileoverview Quiz Type Definitions
 * 
 * Type definitions for the AI Growth Score assessment quiz system.
 * These types ensure type safety across quiz components, calculation logic,
 * and result display.
 * 
 * @module types/quiz
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

/**
 * Quiz answers data structure
 * 
 * Maps question IDs to user-selected answer scores. Each answer is scored
 * on a 0-3 scale representing the maturity level for that specific question.
 * 
 * @interface QuizAnswers
 * 
 * @property {number} [questionId] - Score for each question (0-3)
 *   - 0: No implementation / Not started
 *   - 1: Basic / Ad-hoc implementation
 *   - 2: Defined / Repeatable implementation
 *   - 3: Optimized / Advanced implementation
 * 
 * @example
 * ```typescript
 * const answers: QuizAnswers = {
 *   'q1': 2,  // Strategy question - Defined level
 *   'q2': 3,  // Strategy question - Advanced level
 *   'q3': 1,  // Strategy question - Basic level
 *   // ... more answers
 * };
 * ```
 */
export interface QuizAnswers {
  [questionId: string]: number;
}

/**
 * Quiz results data structure
 * 
 * Contains calculated assessment results including overall score,
 * maturity band classification, and dimension-specific breakdown.
 * 
 * @interface QuizResults
 * 
 * @property {number} score - Overall AI maturity percentage score (0-100)
 * @property {string} band - Maturity band classification
 *   - 'Explorer': 0-39% - Early stage AI journey, foundational work needed
 *   - 'Experimenter': 40-69% - Developing capabilities, scaling opportunities
 *   - 'Accelerator': 70-100% - Advanced maturity, optimization focus
 * @property {object} breakdown - Dimension-specific scores (0-100 for each)
 * @property {number} breakdown.strategy - AI strategy and planning maturity
 * @property {number} breakdown.implementation - Technical implementation maturity
 * @property {number} breakdown.data - Data readiness and governance maturity
 * @property {number} breakdown.culture - Organizational culture and change readiness
 * 
 * @example
 * ```typescript
 * const results: QuizResults = {
 *   score: 67,
 *   band: 'Experimenter',
 *   breakdown: {
 *     strategy: 75,
 *     implementation: 58,
 *     data: 67,
 *     culture: 67
 *   }
 * };
 * ```
 * 
 * @see {@link calculateResults} for score calculation logic
 * @see {@link getMaturityBand} for band determination logic
 */
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