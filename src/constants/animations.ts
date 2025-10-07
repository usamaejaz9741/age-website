/**
 * @fileoverview Animation Constants - Timing and Duration Values
 * 
 * Centralized animation timing constants for consistent animations across the application.
 * Using a single source for these values ensures a cohesive and predictable user experience
 * across all animated components.
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

/**
 * A frozen object containing standardized animation durations in milliseconds.
 * These values are used to control the length of various animations, ensuring
 * a consistent timing system throughout the application.
 *
 * @const {object} ANIMATION_DURATIONS
 * @property {number} COUNTER_DEFAULT - The default duration for animated counters.
 * @property {number} COUNTER_SLOW - A slower duration for more emphasized counter animations.
 * @property {number} COUNTER_FAST - A faster duration for quick, subtle counter animations.
 * @property {number} PRELOADER_MIN - The minimum time the preloader will be displayed to prevent flashing.
 * @property {number} PRELOADER_MAX - The maximum time the preloader will be displayed before being forcibly hidden.
 * @property {number} CARD_STAGGER - The delay increment between staggered card animations.
 * @property {number} CASE_STUDY_STAGGER - The delay increment for staggering case study animations.
 * @property {number} METRIC_STAGGER - The delay increment for staggering metric animations.
 */
export const ANIMATION_DURATIONS = {
  /** Default counter animation duration */
  COUNTER_DEFAULT: 2000,
  /** Slower counter animation for emphasis */
  COUNTER_SLOW: 2500,
  /** Fast counter animation */
  COUNTER_FAST: 1500,
  /** Preloader minimum duration */
  PRELOADER_MIN: 1200,
  /** Preloader maximum duration */
  PRELOADER_MAX: 4000,
  /** Card animation delay increment */
  CARD_STAGGER: 100,
  /** Case study animation delay increment */
  CASE_STUDY_STAGGER: 200,
  /** Metric animation delay increment */
  METRIC_STAGGER: 200,
} as const;

/**
 * A frozen object containing standardized animation delay values in milliseconds.
 * These are used to time the start of animations, often for creating staggered or sequenced effects.
 *
 * @const {object} ANIMATION_DELAYS
 * @property {number} SMALL - A small delay for subtle, quick transitions.
 * @property {number} MEDIUM - A medium delay for more noticeable, paced transitions.
 * @property {number} LARGE - A large delay for creating a significant pause before an animation starts.
 */
export const ANIMATION_DELAYS = {
  /** Small delay for smooth transitions */
  SMALL: 100,
  /** Medium delay for noticeable transitions */
  MEDIUM: 200,
  /** Large delay for emphasized transitions */
  LARGE: 300,
} as const;