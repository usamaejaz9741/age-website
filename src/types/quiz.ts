/**
 * @fileoverview Type Definitions for the AI Growth Score Quiz
 *
 * This file contains the TypeScript interfaces that define the data structures
 * for the quiz functionality, including how answers are stored and how the
 * final results are structured.
 *
 * @module types/quiz
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

/**
 * Defines the structure for storing the user's answers to the quiz.
 * It's an object where each key is a question ID (e.g., 'q1', 'q2') and
 * the value is the numerical score of the selected option (0-3).
 *
 * @interface QuizAnswers
 * @example
 * ```ts
 * const userAnswers: QuizAnswers = {
 *   q1: 2,
 *   q2: 3,
 *   q3: 1,
 *   // ... and so on for all questions
 * };
 * ```
 */
export interface QuizAnswers {
  [questionId: string]: number;
}

/**
 * Defines the structure for the calculated results of the quiz.
 * This object holds the overall score, the determined maturity band, and a
 * breakdown of scores for each of the four dimensions.
 *
 * @interface QuizResults
 * @property {number} score - The final overall score, typically as a percentage from 0 to 100.
 * @property {'Explorer' | 'Experimenter' | 'Accelerator'} band - The AI maturity band the user falls into based on their score.
 * @property {object} breakdown - An object containing the percentage scores for each of the four assessed dimensions.
 * @property {number} breakdown.strategy - The score for the AI Strategy dimension.
 * @property {number} breakdown.implementation - The score for the Implementation dimension.
 * @property {number} breakdown.data - The score for the Data Readiness dimension.
 * @property {number} breakdown.culture - The score for the Culture & Change dimension.
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