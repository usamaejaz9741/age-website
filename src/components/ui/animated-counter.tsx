/**
 * Animated Counter Component
 * 
 * A component that displays animated counting numbers with intersection observer
 * to trigger animations when scrolled into view.
 */

import { ReactNode } from 'react';
import { useAnimatedCounter } from '@/hooks/use-animated-counter';
import { useTestCounter } from '@/hooks/use-test-counter';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  endValue: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  children?: ReactNode;
  delay?: number;
  useTest?: boolean;
}

/**
 * Animated counter component with scroll-triggered counting animation
 * 
 * @param endValue - The final number to count to
 * @param duration - Animation duration in milliseconds
 * @param className - Additional CSS classes
 * @param prefix - Text to display before the number
 * @param suffix - Text to display after the number
 * @param children - Custom content to display instead of the number
 */
export function AnimatedCounter({
  endValue,
  duration = 2000,
  className,
  prefix = '',
  suffix = '',
  children,
  delay = 0,
  useTest = false
}: AnimatedCounterProps) {
  const { ref, count } = useAnimatedCounter(endValue, {
    duration,
    delay
  });

  const { count: testCount } = useTestCounter(endValue, {
    duration,
    delay
  });

  const displayCount = useTest ? testCount : count;

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
          {displayCount.toLocaleString()}
          {suffix}
        </>
      )}
    </span>
  );
}
