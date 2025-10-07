/**
 * @fileoverview Constants Index - Centralized Exports
 *
 * This file serves as a central "barrel" for exporting all constants used throughout the application.
 * By re-exporting from other constant files, it allows for cleaner and more streamlined imports
 * in other parts of the codebase. Instead of importing from multiple specific files, components
 * can import all necessary constants from this single entry point.
 *
 * @example
 * ```ts
 * // Instead of:
 * // import { SCORE_THRESHOLDS } from './scores';
 * // import { ANIMATION_DURATIONS } from './animations';
 *
 * // You can do:
 * import { SCORE_THRESHOLDS, ANIMATION_DURATIONS } from '@/constants';
 * ```
 *
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

// Score and maturity constants
export * from './scores';

// Animation timing constants
export * from './animations';

// User-facing messages
export * from './messages';

// Fallback recommendations
export * from './recommendations';

// Design system constants
export * from './design-system';

// Color system
export * from './colors';