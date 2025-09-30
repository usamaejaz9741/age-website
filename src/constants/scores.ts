/**
 * @fileoverview Score Constants - AI Maturity Assessment Score Thresholds
 * 
 * Centralized score thresholds and band definitions for the AI Growth Score assessment.
 * These constants ensure consistency across the application and make it easy to adjust
 * scoring criteria.
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

/**
 * Score thresholds for maturity band classification
 */
export const SCORE_THRESHOLDS = {
  /** Minimum score for Experimenter band (40%) */
  EXPERIMENTER_MIN: 40,
  /** Minimum score for Accelerator band (70%) */
  ACCELERATOR_MIN: 70,
  /** Maximum possible score (100%) */
  MAX_SCORE: 100,
  /** Minimum possible score (0%) */
  MIN_SCORE: 0,
} as const;

/**
 * Maturity band names
 */
export const MATURITY_BANDS = {
  EXPLORER: 'Explorer',
  EXPERIMENTER: 'Experimenter',
  ACCELERATOR: 'Accelerator',
} as const;

/**
 * Get maturity band based on score
 * 
 * @param score - Assessment score (0-100)
 * @returns Maturity band name
 */
export function getMaturityBand(score: number): string {
  if (score >= SCORE_THRESHOLDS.ACCELERATOR_MIN) {
    return MATURITY_BANDS.ACCELERATOR;
  }
  if (score >= SCORE_THRESHOLDS.EXPERIMENTER_MIN) {
    return MATURITY_BANDS.EXPERIMENTER;
  }
  return MATURITY_BANDS.EXPLORER;
}

/**
 * Validate score is within valid range
 * 
 * @param score - Score to validate
 * @returns boolean - Whether score is valid
 */
export function isValidScoreRange(score: number): boolean {
  return score >= SCORE_THRESHOLDS.MIN_SCORE && score <= SCORE_THRESHOLDS.MAX_SCORE;
}
