/**
 * @fileoverview Default Recommendations - Fallback Recommendations by Score Band
 * 
 * Provides context-aware fallback recommendations for the AI Growth Score assessment.
 * These recommendations are used when the primary AI generation service fails,
 * ensuring that users always receive relevant and actionable advice based on their
 * calculated maturity band.
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

import { SCORE_THRESHOLDS } from './scores';

/**
 * A frozen array of fallback recommendations for users in the "Explorer" maturity band (score < 40%).
 * These recommendations focus on foundational activities like strategy development and data governance.
 *
 * @const {readonly string[]} EXPLORER_RECOMMENDATIONS
 */
export const EXPLORER_RECOMMENDATIONS = [
  'Develop a comprehensive AI strategy aligned with business goals',
  'Implement data governance and quality improvement processes',
  'Create an AI training program to build organizational capabilities'
] as const;

/**
 * A frozen array of fallback recommendations for users in the "Experimenter" maturity band (score 40-69%).
 * These recommendations focus on scaling existing initiatives and improving data capabilities.
 *
 * @const {readonly string[]} EXPERIMENTER_RECOMMENDATIONS
 */
export const EXPERIMENTER_RECOMMENDATIONS = [
  'Scale AI initiatives across multiple business functions',
  'Enhance data integration and analytics capabilities',
  'Develop advanced AI governance and risk management frameworks'
] as const;

/**
 * A frozen array of fallback recommendations for users in the "Accelerator" maturity band (score >= 70%).
 * These recommendations focus on optimization, exploring advanced technologies, and industry leadership.
 *
 * @const {readonly string[]} ACCELERATOR_RECOMMENDATIONS
 */
export const ACCELERATOR_RECOMMENDATIONS = [
  'Optimize AI operations for maximum business impact',
  'Explore cutting-edge AI technologies and partnerships',
  'Share AI expertise to drive industry innovation'
] as const;

/**
 * Retrieves a set of fallback recommendations based on a given score.
 * The function maps the score to the corresponding maturity band (Explorer, Experimenter, or Accelerator)
 * and returns the appropriate set of predefined recommendations.
 *
 * @param {number} score - The user's assessment score, typically between 0 and 100.
 * @returns {readonly string[]} An array of recommendation strings tailored to the user's score band.
 */
export function getFallbackRecommendations(score: number): readonly string[] {
  if (score < SCORE_THRESHOLDS.EXPERIMENTER_MIN) {
    return EXPLORER_RECOMMENDATIONS;
  }
  if (score < SCORE_THRESHOLDS.ACCELERATOR_MIN) {
    return EXPERIMENTER_RECOMMENDATIONS;
  }
  return ACCELERATOR_RECOMMENDATIONS;
}