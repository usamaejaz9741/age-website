/**
 * @fileoverview Animation Constants - Timing and Duration Values
 * 
 * Centralized animation timing constants for consistent animations across the application.
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

/**
 * Animation durations in milliseconds
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
 * Animation delays in milliseconds
 */
export const ANIMATION_DELAYS = {
  /** Small delay for smooth transitions */
  SMALL: 100,
  /** Medium delay for noticeable transitions */
  MEDIUM: 200,
  /** Large delay for emphasized transitions */
  LARGE: 300,
} as const;
