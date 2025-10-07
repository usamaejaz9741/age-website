/**
 * @fileoverview Color System - Semantic Color Usage
 * 
 * This file defines a centralized system for semantic color usage across the application.
 * It ensures that colors are used consistently to convey meaning (e.g., success, warning, error)
 * and that all color combinations meet WCAG 2.1 AA contrast requirements for accessibility.
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

/**
 * A frozen object containing sets of Tailwind CSS classes for various semantic states.
 * Each state (e.g., success, warning, error) includes classes for text, background,
 * border, and hover states, ensuring a consistent visual language.
 *
 * @const {object} SEMANTIC_COLORS
 * @property {object} success - Colors for success states (e.g., high scores, positive outcomes).
 * @property {object} warning - Colors for warning states (e.g., medium scores, caution needed).
 * @property {object} info - Colors for informational states (e.g., low scores, neutral information).
 * @property {object} error - Colors for error or destructive states (e.g., failures, critical alerts).
 * @property {object} primary - The primary brand colors.
 * @property {object} muted - Colors for subtle or de-emphasized elements.
 */
export const SEMANTIC_COLORS = {
  /** Success states (achievements, high scores, positive outcomes) */
  success: {
    text: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    hover: 'hover:bg-green-100',
  },
  
  /** Warning states (medium scores, caution required) */
  warning: {
    text: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    hover: 'hover:bg-yellow-100',
  },
  
  /** Info states (low scores, informational) */
  info: {
    text: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    hover: 'hover:bg-blue-100',
  },
  
  /** Error/Destructive states (errors, failures, critical issues) */
  error: {
    text: 'text-destructive',
    bg: 'bg-destructive/10',
    border: 'border-destructive/20',
    hover: 'hover:bg-destructive/20',
  },
  
  /** Primary brand color */
  primary: {
    text: 'text-primary',
    bg: 'bg-primary',
    border: 'border-primary',
    hover: 'hover:bg-primary/90',
  },
  
  /** Muted/Subtle states */
  muted: {
    text: 'text-muted-foreground',
    bg: 'bg-muted',
    border: 'border-muted',
    hover: 'hover:bg-muted/80',
  },
} as const;

/**
 * Returns a set of semantic color classes based on a given AI maturity band.
 * This function maps a specific band ('Accelerator', 'Experimenter', 'Explorer') to a
 * corresponding color set (success, warning, info) to visually represent the user's result.
 *
 * @param {string} band - The AI maturity band, which can be 'Accelerator', 'Experimenter', or 'Explorer'.
 * @returns {{text: string, bg: string, border: string, hover: string}} An object containing Tailwind CSS classes for the corresponding semantic color. Returns muted colors by default.
 */
export function getBandColors(band: string) {
  switch (band) {
    case 'Accelerator':
      return SEMANTIC_COLORS.success;
    case 'Experimenter':
      return SEMANTIC_COLORS.warning;
    case 'Explorer':
      return SEMANTIC_COLORS.info;
    default:
      return SEMANTIC_COLORS.muted;
  }
}

/**
 * Returns a set of semantic color classes based on a numerical score.
 * The score is mapped to a color set (success, warning, info) to provide
 * immediate visual feedback on performance.
 *
 * @param {number} score - A numerical score, typically between 0 and 100.
 * @returns {{text: string, bg: string, border: string, hover: string}} An object containing Tailwind CSS classes for the corresponding semantic color.
 */
export function getScoreColors(score: number) {
  if (score >= 70) return SEMANTIC_COLORS.success;
  if (score >= 40) return SEMANTIC_COLORS.warning;
  return SEMANTIC_COLORS.info;
}