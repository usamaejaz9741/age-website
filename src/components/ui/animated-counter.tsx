/**
 * Animated Counter Component
 * 
 * A component that displays animated counting numbers with intersection observer
 * to trigger animations when scrolled into view. The counter starts from 0 and
 * animates to the target value when the component enters the viewport.
 */

import { ReactNode } from 'react';
import { useAnimatedCounter } from '@/hooks/use-animated-counter';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  /** The final number to count to */
  endValue: number;
  /** Animation duration in milliseconds (default: 2000) */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
  /** Text to display before the number */
  prefix?: string;
  /** Text to display after the number */
  suffix?: string;
  /** Custom content to display instead of the number */
  children?: ReactNode;
  /** Delay before starting the animation in milliseconds */
  delay?: number;
}

/**
 * Animated counter component with scroll-triggered counting animation
 * 
 * Features:
 * - Intersection Observer integration for viewport detection
 * - Smooth easing animation from 0 to target value
 * - Customizable duration and delay
 * - Support for prefix/suffix text
 * - Custom content rendering via children prop
 * 
 * @param props - Component props
 * @returns JSX element with animated counter
 */
export function AnimatedCounter({
  endValue,
  duration = 2000,
  className,
  prefix = '',
  suffix = '',
  children,
  delay = 0
}: AnimatedCounterProps) {
  const { ref, count } = useAnimatedCounter(endValue, {
    duration,
    delay
  });

  return (
    <span
      ref={ref}
      className={cn('inline-block', className)}
    >
      {children ? (
        children
      ) : (
        <>
          {prefix}
          {count.toLocaleString()}
          {suffix}
        </>
      )}
    </span>
  );
}
