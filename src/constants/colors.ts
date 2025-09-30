/**
 * @fileoverview Color System - Semantic Color Usage
 * 
 * Defines semantic color usage patterns for consistent visual communication.
 * All colors meet WCAG 2.1 AA contrast requirements.
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

/**
 * Semantic color classes for different contexts
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
 * Get semantic color based on maturity band
 * 
 * @param band - Maturity band (Accelerator, Experimenter, Explorer)
 * @returns Semantic color classes
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
 * Get semantic color based on score value
 * 
 * @param score - Score value (0-100)
 * @returns Semantic color classes
 */
export function getScoreColors(score: number) {
  if (score >= 70) return SEMANTIC_COLORS.success;
  if (score >= 40) return SEMANTIC_COLORS.warning;
  return SEMANTIC_COLORS.info;
}
