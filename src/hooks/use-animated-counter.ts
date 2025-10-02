/**
 * Animated Counter Hook
 * 
 * This hook provides animated counting functionality for numbers,
 * with intersection observer to trigger animations when elements come into view.
 */

import { useEffect, useRef, useState } from 'react';

interface UseAnimatedCounterOptions {
  duration?: number;
  delay?: number;
}

/**
 * Custom hook for animated counters
 * 
 * @param endValue - The final number to count to
 * @param options - Configuration options for the counter
 * @returns Object containing ref, count value, and isAnimating state
 */
export function useAnimatedCounter(
  endValue: number,
  options: UseAnimatedCounterOptions = {}
) {
  const {
    duration = 2000,
    delay = 0
  } = options;

  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !hasStarted) {
          setHasStarted(true);
          
          // Start animation after delay
          setTimeout(() => {
            setCount(0);
            
            const startTime = Date.now();

            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Easing function for smooth animation
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const currentValue = endValue * easeOutQuart;

              setCount(Math.floor(currentValue));

              if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
              } else {
                setCount(endValue);
              }
            };

            animationRef.current = requestAnimationFrame(animate);
          }, delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [endValue, duration, delay, hasStarted]);

  return {
    ref,
    count,
    isAnimating: hasStarted
  };
}
