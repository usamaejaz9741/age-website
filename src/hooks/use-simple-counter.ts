/**
 * Simple Animated Counter Hook
 * 
 * A simpler version that starts animating immediately without intersection observer
 * for testing purposes.
 */

import { useEffect, useRef, useState } from 'react';

interface UseSimpleCounterOptions {
  duration?: number;
  delay?: number;
}

/**
 * Simple animated counter hook that starts immediately
 * 
 * @param endValue - The final number to count to
 * @param options - Configuration options for the counter
 * @returns Object containing count value and isAnimating state
 */
export function useSimpleCounter(
  endValue: number,
  options: UseSimpleCounterOptions = {}
) {
  const {
    duration = 2000,
    delay = 0
  } = options;

  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (hasStarted) {
      return;
    }

    setHasStarted(true);

    const startAnimation = () => {
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
    };

    if (delay > 0) {
      const timeoutId = setTimeout(startAnimation, delay);
      return () => clearTimeout(timeoutId);
    } else {
      startAnimation();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [endValue, duration, delay, hasStarted]);

  return {
    count,
    isAnimating: hasStarted
  };
}
