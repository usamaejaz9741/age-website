/**
 * @fileoverview Design System Constants - UI Consistency Standards
 * 
 * Centralized design system values for consistent UI across the application.
 * These constants ensure visual harmony and make design updates easier.
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

/**
 * Heading text sizes for consistent typography
 * Following mobile-first responsive approach
 */
export const HEADING_SIZES = {
  /** Page title / Hero heading */
  h1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
  /** Section heading */
  h2: 'text-3xl sm:text-4xl md:text-5xl',
  /** Subsection heading */
  h3: 'text-2xl sm:text-3xl',
  /** Card / Component heading */
  h4: 'text-xl sm:text-2xl',
  /** Small heading */
  h5: 'text-lg sm:text-xl',
  /** Micro heading */
  h6: 'text-base sm:text-lg',
} as const;

/**
 * Body text sizes for consistent paragraph typography
 */
export const TEXT_SIZES = {
  /** Large body text (hero description) */
  large: 'text-lg sm:text-xl md:text-2xl',
  /** Medium body text (section description) */
  medium: 'text-lg sm:text-xl',
  /** Default body text */
  base: 'text-base',
  /** Small text (metadata, labels) */
  small: 'text-sm',
  /** Extra small text (captions) */
  xs: 'text-xs sm:text-sm',
} as const;

/**
 * Margin bottom values for consistent spacing
 */
export const MARGIN_BOTTOM = {
  /** Section spacing */
  section: 'mb-16',
  /** Large spacing */
  large: 'mb-12',
  /** Medium spacing */
  medium: 'mb-8',
  /** Default spacing */
  default: 'mb-6',
  /** Small spacing */
  small: 'mb-4',
  /** Extra small spacing */
  xs: 'mb-2',
} as const;

/**
 * Padding values for card components
 */
export const CARD_PADDING = {
  /** Responsive card padding */
  responsive: 'p-4 sm:p-6 md:p-8',
  /** Large card padding */
  large: 'p-8',
  /** Medium card padding */
  medium: 'p-6',
  /** Small card padding */
  small: 'p-4',
} as const;

/**
 * Icon container sizes for consistent icon presentation
 */
export const ICON_CONTAINER = {
  /** Large icon container (64px) */
  large: 'w-16 h-16',
  /** Medium icon container (48px) */
  medium: 'w-12 h-12',
  /** Small icon container (32px) */
  small: 'w-8 h-8',
} as const;

/**
 * Icon sizes for SVG elements
 */
export const ICON_SIZES = {
  /** Large icon (32px) */
  large: 'w-8 h-8',
  /** Medium icon (24px) */
  medium: 'w-6 h-6',
  /** Default icon (20px) */
  default: 'w-5 h-5',
  /** Small icon (16px) */
  small: 'w-4 h-4',
} as const;

/**
 * Border radius values for consistent rounding
 */
export const BORDER_RADIUS = {
  /** Extra large radius */
  xl: 'rounded-xl',
  /** Large radius */
  lg: 'rounded-lg',
  /** Medium radius */
  md: 'rounded-md',
  /** Small radius */
  sm: 'rounded-sm',
  /** Full radius (pills, circles) */
  full: 'rounded-full',
} as const;

/**
 * Shadow classes for consistent elevation
 */
export const SHADOWS = {
  /** Strong shadow for modals, dropdowns */
  strong: 'shadow-strong',
  /** Medium shadow for cards, hover states */
  medium: 'shadow-medium',
  /** Soft shadow for subtle elevation */
  soft: 'shadow-soft',
  /** No shadow */
  none: 'shadow-none',
} as const;

/**
 * Gap values for consistent spacing in grids/flex
 */
export const GAP = {
  /** Large gap */
  large: 'gap-12',
  /** Medium gap */
  medium: 'gap-8',
  /** Default gap */
  default: 'gap-6',
  /** Small gap */
  small: 'gap-4',
  /** Extra small gap */
  xs: 'gap-2',
} as const;

/**
 * Grid column configurations
 */
export const GRID_COLS = {
  /** Four columns on large screens */
  four: 'grid md:grid-cols-2 lg:grid-cols-4',
  /** Three columns on large screens */
  three: 'grid md:grid-cols-2 lg:grid-cols-3',
  /** Two columns on medium screens */
  two: 'grid md:grid-cols-2',
  /** Two columns on large screens */
  twoLarge: 'grid lg:grid-cols-2',
} as const;

/**
 * Transition durations for consistent animations
 */
export const TRANSITIONS = {
  /** Slow transition */
  slow: 'duration-500',
  /** Default transition */
  default: 'duration-300',
  /** Fast transition */
  fast: 'duration-200',
  /** Instant transition */
  instant: 'duration-100',
} as const;

/**
 * Common hover effects
 */
export const HOVER_EFFECTS = {
  /** Lift up on hover */
  lift: 'hover:-translate-y-1',
  /** Lift up slightly */
  liftSmall: 'hover:-translate-y-0.5',
  /** Scale up on hover */
  scale: 'hover:scale-[1.02]',
  /** Scale down on active */
  scaleDown: 'active:scale-[0.98]',
} as const;
