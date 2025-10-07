/**
 * @fileoverview Design System Constants - UI Consistency Standards
 * 
 * This file centralizes design system values to ensure a consistent and harmonious
 * user interface across the entire application. By using these constants, we can
 * maintain visual consistency and make global design updates more efficient.
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

/**
 * Defines a set of responsive heading text sizes for consistent typography.
 * These classes follow a mobile-first approach and include appropriate font weights.
 *
 * @const {object} HEADING_SIZES
 * @property {string} h1 - For main page titles and hero headings.
 * @property {string} h2 - For primary section headings.
 * @property {string} h3 - For subsection headings.
 * @property {string} h4 - For card or component-level headings.
 * @property {string} h5 - For smaller headings.
 * @property {string} h6 - For the smallest, micro-level headings.
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
 * Defines a set of responsive body text sizes for consistent paragraph typography.
 * Includes appropriate line heights for readability.
 *
 * @const {object} TEXT_SIZES
 * @property {string} large - For prominent body text, like in a hero section.
 * @property {string} medium - For descriptive text in sections.
 * @property {string} base - The default body text size.
 * @property {string} small - For less important text like metadata or labels.
 * @property {string} xs - For extra small text, such as captions.
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
 * Defines a set of standard margin-bottom values for consistent vertical spacing.
 *
 * @const {object} MARGIN_BOTTOM
 * @property {string} section - Spacing between large page sections.
 * @property {string} large - A large spacing unit.
 * @property {string} medium - A medium spacing unit.
 * @property {string} default - The default spacing unit.
 * @property {string} small - A small spacing unit.
 * @property {string} xs - An extra-small spacing unit.
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
 * Defines a set of standard padding values, typically for card-like components.
 *
 * @const {object} CARD_PADDING
 * @property {string} responsive - A responsive padding value that adapts to screen size.
 * @property {string} large - A large, fixed padding value.
 * @property {string} medium - A medium, fixed padding value.
 * @property {string} small - A small, fixed padding value.
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
 * Defines standard sizes for icon container elements to ensure consistent icon presentation.
 *
 * @const {object} ICON_CONTAINER
 * @property {string} large - A large container, e.g., 80x80px.
 * @property {string} medium - A medium container, e.g., 64x64px.
 * @property {string} small - A small container, e.g., 48x48px.
 * @property {string} xs - An extra-small container, e.g., 32x32px.
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
 * Defines standard sizes for SVG icon elements.
 *
 * @const {object} ICON_SIZES
 * @property {string} large - A large icon size, e.g., 40x40px.
 * @property {string} medium - A medium icon size, e.g., 32x32px.
 * @property {string} default - The default icon size, e.g., 24x24px.
 * @property {string} small - A small icon size, e.g., 20x20px.
 * @property {string} xs - An extra-small icon size, e.g., 16x16px.
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
 * Defines a set of standard border-radius values for consistent element rounding.
 *
 * @const {object} BORDER_RADIUS
 * @property {string} xl - An extra-large radius.
 * @property {string} lg - A large radius.
 * @property {string} md - A medium radius.
 * @property {string} sm - A small radius.
 * @property {string} full - A full radius, for creating circles or pills.
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
 * Defines a set of standard shadow classes for consistent element elevation and depth.
 *
 * @const {object} SHADOWS
 * @property {string} strong - A strong shadow for prominent elements like modals.
 * @property {string} medium - A medium shadow for elements like cards on hover.
 * @property {string} soft - A soft, subtle shadow for default card states.
 * @property {string} none - No shadow.
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
 * Defines standard gap values for consistent spacing in flexbox and grid layouts.
 *
 * @const {object} GAP
 * @property {string} large - A large gap.
 * @property {string} medium - A medium gap.
 * @property {string} default - The default gap.
 * @property {string} small - A small gap.
 * @property {string} xs - An extra-small gap.
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
 * Defines standard responsive grid column configurations.
 *
 * @const {object} GRID_COLS
 * @property {string} four - A grid with up to four columns on large screens.
 * @property {string} three - A grid with up to three columns on large screens.
 * @property {string} two - A grid with up to two columns on medium screens.
 * @property {string} twoLarge - A grid with up to two columns on large screens.
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
 * Defines standard transition durations for consistent animation timing.
 *
 * @const {object} TRANSITIONS
 * @property {string} slow - A slow transition duration.
 * @property {string} default - The default transition duration.
 * @property {string} fast - A fast transition duration.
 * @property {string} instant - A very fast, almost instant transition duration.
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
 * Defines a set of common hover effect classes.
 *
 * @const {object} HOVER_EFFECTS
 * @property {string} lift - Lifts the element up on hover.
 * @property {string} liftSmall - Lifts the element up slightly on hover.
 * @property {string} scale - Scales the element up on hover.
 * @property {string} scaleDown - Scales the element down when active (pressed).
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
 * Defines a set of design tokens specifically for button components.
 *
 * @const {object} BUTTON_STYLES
 * @property {string} minWidth - A minimum width for buttons to ensure consistency.
 * @property {string} responsive - Makes buttons full-width on mobile and auto-width on larger screens.
 * @property {string} gap - The gap between a button's icon and its text.
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
 * Defines a set of standard background color and gradient classes.
 *
 * @const {object} BACKGROUNDS
 * @property {string} gradientOverlay - A gradient that fades from the background color to transparent.
 * @property {string} cardGradient - The standard gradient for card backgrounds.
 * @property {string} heroGradient - The standard gradient for hero section backgrounds.
 */
export const BACKGROUNDS = {
  /** Primary gradient overlay */
  gradientOverlay: 'bg-gradient-to-t from-background to-transparent',
  /** Card gradient */
  cardGradient: 'bg-gradient-card',
  /** Hero gradient */
  heroGradient: 'bg-gradient-hero',
} as const;