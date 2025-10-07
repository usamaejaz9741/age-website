/**
 * Enhanced Section Template Component - Consistent Section Structure
 * 
 * This component provides a comprehensive structure for content sections across all pages.
 * It ensures uniform spacing, typography, layout patterns, and enhanced functionality throughout the website.
 * 
 * Features:
 * - Consistent padding and spacing with design system
 * - Responsive design patterns with breakpoint optimization
 * - Semantic HTML structure with proper accessibility
 * - Enhanced accessibility attributes and ARIA support
 * - Advanced animation support with intersection observer
 * - Flexible content areas with container queries
 * - Background patterns and overlays
 * - Section dividers and separators
 * - Loading states and skeleton support
 * - Performance optimizations
 */

import { ReactNode, useRef, useEffect, useState, memo } from "react";
import { cn } from "@/lib/utils";

/**
 * Enhanced props interface for the SectionTemplate component
 */
interface SectionTemplateProps {
  /** Content to be rendered within the section */
  children: ReactNode;
  /** Optional section ID for navigation */
  id?: string;
  /** Section background variant */
  variant?: 'default' | 'muted' | 'gradient' | 'transparent' | 'card' | 'hero' | 'accent';
  /** Section padding size */
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none';
  /** Maximum width constraint */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';
  /** Additional CSS classes */
  className?: string;
  /** Whether to add animation classes */
  animate?: boolean;
  /** Animation delay in seconds */
  animationDelay?: number;
  /** Animation type */
  animationType?: 'fade-in' | 'slide-up' | 'scale-in' | 'slide-left' | 'slide-right';
  /** Whether to use intersection observer for animations */
  useIntersectionObserver?: boolean;
  /** Section title for accessibility */
  title?: string;
  /** Section description for accessibility */
  description?: string;
  /** Whether to show section divider */
  showDivider?: boolean;
  /** Divider variant */
  dividerVariant?: 'line' | 'dots' | 'gradient' | 'none';
  /** Whether to add background pattern */
  backgroundPattern?: boolean;
  /** Pattern type */
  patternType?: 'dots' | 'grid' | 'waves' | 'circles';
  /** Whether to add overlay */
  overlay?: boolean;
  /** Overlay opacity */
  overlayOpacity?: number;
  /** Whether to add container queries support */
  containerQueries?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Skeleton component for loading state */
  skeletonComponent?: ReactNode;
  /** Whether to add focus trap */
  focusTrap?: boolean;
  /** Custom ARIA label */
  ariaLabel?: string;
  /** Custom ARIA described by */
  ariaDescribedBy?: string;
  /** Whether to add scroll spy */
  scrollSpy?: boolean;
  /** Scroll spy offset */
  scrollSpyOffset?: number;
}

/**
 * Enhanced section template component providing comprehensive structure for content sections
 * 
 * This component ensures that all sections follow the same structural patterns:
 * - Consistent padding and spacing using design system values
 * - Responsive design with proper breakpoints and container queries
 * - Semantic HTML structure with enhanced accessibility
 * - Flexible content areas with max-width constraints
 * - Advanced animation support with intersection observer
 * - Background patterns and overlays for visual enhancement
 * - Section dividers and separators
 * - Loading states and skeleton support
 * - Performance optimizations and scroll spy
 * 
 * @param children - Content to be rendered within the section
 * @param id - Optional section ID for navigation
 * @param variant - Section background variant
 * @param padding - Section padding size
 * @param maxWidth - Maximum width constraint
 * @param align - Text alignment
 * @param className - Additional CSS classes
 * @param animate - Whether to add animation classes
 * @param animationDelay - Animation delay in seconds
 * @param animationType - Animation type
 * @param useIntersectionObserver - Whether to use intersection observer
 * @param title - Section title for accessibility
 * @param description - Section description for accessibility
 * @param showDivider - Whether to show section divider
 * @param dividerVariant - Divider variant
 * @param backgroundPattern - Whether to add background pattern
 * @param patternType - Pattern type
 * @param overlay - Whether to add overlay
 * @param overlayOpacity - Overlay opacity
 * @param containerQueries - Whether to add container queries support
 * @param isLoading - Loading state
 * @param skeletonComponent - Skeleton component for loading state
 * @param focusTrap - Whether to add focus trap
 * @param ariaLabel - Custom ARIA label
 * @param ariaDescribedBy - Custom ARIA described by
 * @param scrollSpy - Whether to add scroll spy
 * @param scrollSpyOffset - Scroll spy offset
 * @returns JSX element with enhanced section structure
 */
const SectionTemplate = memo(({
  children,
  id,
  variant = 'default',
  padding = 'lg',
  maxWidth = '7xl',
  align = 'center',
  className = "",
  animate = false,
  animationDelay = 0,
  animationType = 'fade-in',
  useIntersectionObserver = true,
  title,
  description,
  showDivider = false,
  dividerVariant = 'line',
  backgroundPattern = false,
  patternType = 'dots',
  overlay = false,
  overlayOpacity = 0.1,
  containerQueries = false,
  isLoading = false,
  skeletonComponent,
  focusTrap: _focusTrap = false,
  ariaLabel,
  ariaDescribedBy,
  scrollSpy = false,
  scrollSpyOffset = 0
}: SectionTemplateProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Enhanced background variants
  const backgroundVariants = {
    default: 'bg-background',
    muted: 'bg-muted/30',
    gradient: 'bg-gradient-hero',
    transparent: 'bg-transparent',
    card: 'bg-gradient-card',
    hero: 'bg-gradient-hero',
    accent: 'bg-primary/5'
  };

  // Enhanced padding variants - using design system spacing tokens
  const paddingVariants = {
    xs: 'py-[var(--space-2xl)]',      // 2rem (32px)
    sm: 'py-[var(--space-3xl)]',      // 2.5rem (40px) 
    md: 'py-[var(--space-4xl)]',      // 3.75rem (60px)
    lg: 'py-[var(--space-4xl)]',      // 3.75rem (60px) - section spacing
    xl: 'pt-[calc(var(--space-4xl)+4rem)] pb-[var(--space-4xl)]',      // 7.75rem (124px) top, 3.75rem (60px) bottom
    '2xl': 'pt-[calc(var(--space-4xl)+6rem)] pb-[var(--space-4xl)]',   // 9.75rem (156px) top, 3.75rem (60px) bottom
    none: 'py-0'
  };

  // Max width variants
  const maxWidthVariants = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full'
  };

  // Enhanced text alignment variants
  const alignVariants = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  };

  // Animation variants
  const animationVariants = {
    'fade-in': 'animate-fade-in',
    'slide-up': 'animate-slide-up',
    'scale-in': 'animate-scale-in',
    'slide-left': 'animate-slide-left',
    'slide-right': 'animate-slide-right'
  };

  // Divider variants
  const dividerVariants = {
    line: 'border-b border-border',
    dots: 'border-b border-dotted border-border',
    gradient: 'border-b border-gradient-to-r from-transparent via-border to-transparent',
    none: ''
  };

  // Background pattern variants
  const patternVariants = {
    dots: 'bg-dots-pattern',
    grid: 'bg-grid-pattern',
    waves: 'bg-waves-pattern',
    circles: 'bg-circles-pattern'
  };

  // Intersection Observer for animations
  useEffect(() => {
    if (!useIntersectionObserver || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          setIsInView(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: `${scrollSpyOffset}px`
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [useIntersectionObserver, scrollSpyOffset]);

  // Scroll spy functionality with throttling for performance
  useEffect(() => {
    if (!scrollSpy || !id) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (sectionRef.current && isInView) {
            // Update active navigation item
            const navItems = document.querySelectorAll(`a[href="#${id}"]`);
            navItems.forEach(item => {
              item.classList.add('active');
              item.setAttribute('aria-current', 'true');
            });
          } else {
            const navItems = document.querySelectorAll(`a[href="#${id}"]`);
            navItems.forEach(item => {
              item.classList.remove('active');
              item.removeAttribute('aria-current');
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollSpy, id, isInView]);

  // Animation styles
  const animationStyles = animate ? {
    animationDelay: `${animationDelay}s`,
    animationFillMode: 'both'
  } : {};

  // Section divider component
  const SectionDivider = () => {
    if (!showDivider) return null;

    return (
      <div className={cn(
        'absolute bottom-0 left-0 right-0 h-px',
        dividerVariants[dividerVariant]
      )} />
    );
  };

  // Background pattern component
  const BackgroundPattern = () => {
    if (!backgroundPattern) return null;

    return (
      <div className={cn(
        'absolute inset-0 opacity-5 pointer-events-none',
        patternVariants[patternType]
      )} />
    );
  };

  // Overlay component
  const Overlay = () => {
    if (!overlay) return null;

    return (
      <div 
        className="absolute inset-0 bg-background pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />
    );
  };

  // Skeleton loading component
  const SkeletonComponent = () => {
    if (!isLoading) return null;

    return (
      <div className="animate-pulse">
        {skeletonComponent || (
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-2/3 mx-auto"></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        'relative overflow-hidden',
        backgroundVariants[variant],
        paddingVariants[padding],
        className
      )}
      style={animationStyles}
      aria-label={ariaLabel || title}
      aria-describedby={ariaDescribedBy || (description ? `${id}-description` : undefined)}
      role="region"
    >
      {/* Background Pattern */}
      <BackgroundPattern />
      
      {/* Overlay */}
      <Overlay />
      
      {/* Section Divider */}
      <SectionDivider />

      {/* Section Title and Description (for screen readers) */}
      {title && (
        <h2 className="sr-only">{title}</h2>
      )}
      {description && (
        <p id={`${id}-description`} className="sr-only">{description}</p>
      )}

      {/* Main Content Container */}
      <div className={cn(
        'relative mx-auto px-6',
        maxWidthVariants[maxWidth],
        alignVariants[align],
        containerQueries && '@container',
        animate && useIntersectionObserver && isVisible && animationVariants[animationType],
        animate && !useIntersectionObserver && animationVariants[animationType]
      )}>
        {/* Loading State */}
        {isLoading ? (
          <SkeletonComponent />
        ) : (
          children
        )}
      </div>
    </section>
  );
});

SectionTemplate.displayName = 'SectionTemplate';

export default SectionTemplate;
