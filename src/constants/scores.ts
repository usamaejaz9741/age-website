/**
 * @fileoverview Score Constants - AI Maturity Assessment Score Thresholds
 * 
 * This file centralizes the score thresholds and maturity band definitions for the
 * AI Growth Score assessment. Using a single source of truth for these values ensures
 * consistency in scoring and classification across the entire application and simplifies
 * future adjustments to the scoring model.
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

/**
 * A frozen object containing the score thresholds used for classifying AI maturity bands.
 *
 * @const {object} SCORE_THRESHOLDS
 * @property {number} EXPERIMENTER_MIN - The minimum score required to be classified in the 'Experimenter' band.
 * @property {number} ACCELERATOR_MIN - The minimum score required to be classified in the 'Accelerator' band.
 * @property {number} MAX_SCORE - The maximum possible score.
 * @property {number} MIN_SCORE - The minimum possible score.
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
 * A frozen object containing the names of the AI maturity bands.
 *
 * @const {object} MATURITY_BANDS
 * @property {string} EXPLORER - The name for the lowest maturity band.
 * @property {string} EXPERIMENTER - The name for the middle maturity band.
 * @property {string} ACCELERATOR - The name for the highest maturity band.
 */
export const MATURITY_BANDS = {
  EXPLORER: 'Explorer',
  EXPERIMENTER: 'Experimenter',
  ACCELERATOR: 'Accelerator',
} as const;

/**
 * Determines the AI maturity band based on a given score.
 *
 * This function classifies a numerical score into one of three maturity bands:
 * 'Explorer', 'Experimenter', or 'Accelerator', based on predefined thresholds.
 *
 * @param {number} score - The assessment score, typically ranging from 0 to 100.
 * @returns {string} The name of the corresponding maturity band.
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
 * Validates if a given score is within the permissible range (0-100).
 *
 * @param {number} score - The score to validate.
 * @returns {boolean} `true` if the score is within the valid range, `false` otherwise.
 */
export function isValidScoreRange(score: number): boolean {
  return score >= SCORE_THRESHOLDS.MIN_SCORE && score <= SCORE_THRESHOLDS.MAX_SCORE;
}