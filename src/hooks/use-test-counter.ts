/**
 * Test Counter Hook
 * 
 * A simple counter that starts immediately for testing purposes
 */

import { useEffect, useRef, useState } from 'react';

interface UseTestCounterOptions {
  duration?: number;
  delay?: number;
}

export function useTestCounter(
  endValue: number,
  options: UseTestCounterOptions = {}
) {
  const {
    duration = 2000,
    delay = 0
  } = options;

  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (hasStarted) return;

    setHasStarted(true);

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
