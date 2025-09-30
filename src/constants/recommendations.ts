/**
 * @fileoverview Default Recommendations - Fallback Recommendations by Score Band
 * 
 * Provides context-aware fallback recommendations when AI generation fails.
 * Recommendations are tailored to each maturity band.
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

import { SCORE_THRESHOLDS } from './scores';

/**
 * Fallback recommendations for Explorer band (< 40%)
 */
export const EXPLORER_RECOMMENDATIONS = [
  'Develop a comprehensive AI strategy aligned with business goals',
  'Implement data governance and quality improvement processes',
  'Create an AI training program to build organizational capabilities'
] as const;

/**
 * Fallback recommendations for Experimenter band (40-70%)
 */
export const EXPERIMENTER_RECOMMENDATIONS = [
  'Scale AI initiatives across multiple business functions',
  'Enhance data integration and analytics capabilities',
  'Develop advanced AI governance and risk management frameworks'
] as const;

/**
 * Fallback recommendations for Accelerator band (>= 70%)
 */
export const ACCELERATOR_RECOMMENDATIONS = [
  'Optimize AI operations for maximum business impact',
  'Explore cutting-edge AI technologies and partnerships',
  'Share AI expertise to drive industry innovation'
] as const;

/**
 * Get fallback recommendations based on score
 * 
 * @param score - Assessment score (0-100)
 * @returns Array of recommendation strings
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
