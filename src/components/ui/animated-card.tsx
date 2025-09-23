/**
 * Animated Card Component
 * 
 * A reusable card component that fades in when scrolled into view.
 * Uses intersection observer to trigger animations based on scroll position.
 */

import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  duration?: number;
}

/**
 * Animated card component with scroll-triggered animations
 * 
 * @param children - Content to display inside the card
 * @param className - Additional CSS classes
 * @param delay - Animation delay in milliseconds
 * @param direction - Animation direction
 * @param duration - Animation duration in milliseconds
 */
export function AnimatedCard({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 600
}: AnimatedCardProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true
  });

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all ease-out duration-600';
    
    if (!isIntersecting) {
      const hiddenClasses = {
        up: 'opacity-0 translate-y-8',
        down: 'opacity-0 -translate-y-8',
        left: 'opacity-0 translate-x-8',
        right: 'opacity-0 -translate-x-8',
        fade: 'opacity-0'
      };
      return `${baseClasses} ${hiddenClasses[direction]}`;
    }
    
    const visibleClasses = {
      up: 'opacity-100 translate-y-0',
      down: 'opacity-100 translate-y-0',
      left: 'opacity-100 translate-x-0',
      right: 'opacity-100 translate-x-0',
      fade: 'opacity-100'
    };
    return `${baseClasses} ${visibleClasses[direction]}`;
  };

  return (
    <div
      ref={ref}
      className={cn(getAnimationClasses(), className)}
      style={{
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
}
