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
 * Following mobile-first responsive approach with proper font-weight
 */
export const HEADING_SIZES = {
  /** Page title / Hero heading */
  h1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight',
  /** Section heading */
  h2: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight',
  /** Subsection heading */
  h3: 'text-2xl sm:text-3xl md:text-4xl font-bold leading-tight',
  /** Card / Component heading */
  h4: 'text-xl sm:text-2xl md:text-3xl font-bold leading-tight',
  /** Small heading */
  h5: 'text-lg sm:text-xl md:text-2xl font-semibold leading-tight',
  /** Micro heading */
  h6: 'text-base sm:text-lg md:text-xl font-semibold leading-tight',
} as const;

/**
 * Body text sizes for consistent paragraph typography with line-height
 */
export const TEXT_SIZES = {
  /** Large body text (hero description) */
  large: 'text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed',
  /** Medium body text (section description) */
  medium: 'text-lg sm:text-xl md:text-2xl leading-relaxed',
  /** Default body text */
  base: 'text-base sm:text-lg leading-normal',
  /** Small text (metadata, labels) */
  small: 'text-sm sm:text-base leading-normal',
  /** Extra small text (captions) */
  xs: 'text-xs sm:text-sm md:text-base leading-normal',
} as const;

/**
 * Margin bottom values for consistent spacing
 */
export const MARGIN_BOTTOM = {
  /** Section spacing */
  section: 'mb-16 sm:mb-20 md:mb-24',
  /** Large spacing */
  large: 'mb-12 sm:mb-16 md:mb-20',
  /** Medium spacing */
  medium: 'mb-8 sm:mb-12 md:mb-16',
  /** Default spacing */
  default: 'mb-6 sm:mb-8 md:mb-10',
  /** Small spacing */
  small: 'mb-4 sm:mb-6 md:mb-8',
  /** Extra small spacing */
  xs: 'mb-2 sm:mb-3 md:mb-4',
} as const;

/**
 * Padding values for card components
 */
export const CARD_PADDING = {
  /** Responsive card padding */
  responsive: 'p-4 sm:p-6 md:p-8 lg:p-10',
  /** Large card padding */
  large: 'p-8 sm:p-10 md:p-12',
  /** Medium card padding */
  medium: 'p-6 sm:p-8 md:p-10',
  /** Small card padding */
  small: 'p-4 sm:p-6 md:p-8',
} as const;

/**
 * Icon container sizes for consistent icon presentation
 */
export const ICON_CONTAINER = {
  /** Large icon container (80px) */
  large: 'w-20 h-20',
  /** Medium icon container (64px) */
  medium: 'w-16 h-16',
  /** Small icon container (48px) */
  small: 'w-12 h-12',
  /** Extra small icon container (32px) */
  xs: 'w-8 h-8',
} as const;

/**
 * Icon sizes for SVG elements
 */
export const ICON_SIZES = {
  /** Large icon (40px) */
  large: 'w-10 h-10',
  /** Medium icon (32px) */
  medium: 'w-8 h-8',
  /** Default icon (24px) */
  default: 'w-6 h-6',
  /** Small icon (20px) */
  small: 'w-5 h-5',
  /** Extra small icon (16px) */
  xs: 'w-4 h-4',
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

/**
 * Button-specific design tokens
 */
export const BUTTON_STYLES = {
  /** Minimum width for consistency */
  minWidth: 'sm:min-w-[200px]',
  /** Full width on mobile, auto on larger screens */
  responsive: 'w-full sm:w-auto',
  /** Button gap for icon + text layouts */
  gap: 'gap-2',
} as const;

/**
 * Background colors for consistent surfaces
 */
export const BACKGROUNDS = {
  /** Primary gradient overlay */
  gradientOverlay: 'bg-gradient-to-t from-background to-transparent',
  /** Card gradient */
  cardGradient: 'bg-gradient-card',
  /** Hero gradient */
  heroGradient: 'bg-gradient-hero',
} as const;
