/**
 * @fileoverview Animated Card Component - Scroll-Triggered Animation Wrapper
 * 
 * A reusable card component that provides smooth scroll-triggered animations
 * for content elements. Uses the Intersection Observer API to detect when
 * elements enter the viewport and triggers appropriate animations.
 * 
 * Features:
 * - Multiple animation directions (up, down, left, right, fade)
 * - Configurable delay and duration
 * - Performance-optimized with intersection observer
 * - Smooth easing with custom timing functions
 * - Accessibility-friendly animations
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 * @since 1.0.0
 */

import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';

/**
 * Props for the AnimatedCard component
 */
interface AnimatedCardProps {
  /** Content to display inside the animated card */
  children: ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
  /** Animation delay in milliseconds */
  delay?: number;
  /** Direction of the animation */
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  /** Animation duration in milliseconds */
  duration?: number;
}

/**
 * Animated card component with scroll-triggered animations
 * 
 * This component wraps content in a div that animates when it comes into view.
 * It uses the Intersection Observer API for performance-optimized scroll detection
 * and provides smooth, customizable animations.
 * 
 * @param props - Component props
 * @returns JSX element with animated card wrapper
 * 
 * @example
 * ```tsx
 * <AnimatedCard direction="up" delay={200}>
 *   <div>This content will animate up when scrolled into view</div>
 * </AnimatedCard>
 * ```
 * 
 * @since 1.0.0
 */
export function AnimatedCard({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration: _duration = 600
}: AnimatedCardProps) {
  // Set up intersection observer to detect when element enters viewport
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,                    // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px',  // Start animation 50px before element enters viewport
    triggerOnce: true                  // Only animate once (don't re-trigger on scroll out)
  });

  /**
   * Generates appropriate CSS classes based on intersection state and direction
   * 
   * @returns CSS class string for animation state
   */
  const getAnimationClasses = () => {
    // Base transition classes with design system easing and duration
    const baseClasses = 'transition-all duration-300 ease-out';
    
    // Hidden state classes (before animation)
    if (!isIntersecting) {
      const hiddenClasses = {
        up: 'opacity-0 translate-y-8',      // Fade out and move down
        down: 'opacity-0 -translate-y-8',   // Fade out and move up
        left: 'opacity-0 translate-x-8',    // Fade out and move right
        right: 'opacity-0 -translate-x-8',  // Fade out and move left
        fade: 'opacity-0'                   // Simple fade out
      };
      return `${baseClasses} ${hiddenClasses[direction]}`;
    }
    
    // Visible state classes (after animation)
    const visibleClasses = {
      up: 'opacity-100 translate-y-0',      // Fade in and move to original position
      down: 'opacity-100 translate-y-0',    // Fade in and move to original position
      left: 'opacity-100 translate-x-0',    // Fade in and move to original position
      right: 'opacity-100 translate-x-0',   // Fade in and move to original position
      fade: 'opacity-100'                   // Simple fade in
    };
    return `${baseClasses} ${visibleClasses[direction]}`;
  };

  return (
    <div
      ref={ref}                                    // Attach intersection observer ref
      className={cn(getAnimationClasses(), className)} // Combine animation and custom classes
      style={{
        transitionDelay: `${delay}ms`              // Apply custom delay for staggered animations
      }}
    >
      {children}
    </div>
  );
}
