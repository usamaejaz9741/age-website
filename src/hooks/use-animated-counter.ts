/**
 * @fileoverview Animated Counter Hook
 * 
 * Provides smooth animated counting functionality with scroll-triggered animations
 * using the Intersection Observer API. Ideal for displaying metrics, statistics,
 * and KPIs with eye-catching animated transitions.
 * 
 * @module hooks/use-animated-counter
 * @author Alvi Global Enterprises
 * @version 1.0.0
 * 
 * @features
 * - 🎬 Smooth counting animation with easing function
 * - 👁️ Scroll-triggered activation via Intersection Observer
 * - ⏱️ Configurable duration and delay
 * - 🎯 Precise end value targeting
 * - 🔄 Automatic cleanup of animation frames
 * - 📱 Responsive and performant on all devices
 * - ♿ Accessible with proper ARIA support when used with components
 */

import { useEffect, useRef, useState } from 'react';

/**
 * Configuration options for the animated counter
 * 
 * @interface UseAnimatedCounterOptions
 */
interface UseAnimatedCounterOptions {
  /** 
   * Animation duration in milliseconds
   * @default 2000
   */
  duration?: number;
  
  /** 
   * Delay before starting animation in milliseconds
   * Useful for staggered animations
   * @default 0
   */
  delay?: number;
}

/**
 * Custom hook for animated number counters with scroll trigger
 * 
 * This hook provides smooth, animated counting from 0 to a target value,
 * triggered when the element enters the viewport. Uses requestAnimationFrame
 * for optimal performance and an easing function for natural motion.
 * 
 * **Animation Details:**
 * - Easing: Ease-out-quart for smooth deceleration
 * - Trigger: Intersection Observer (10% threshold, -50px root margin)
 * - Update Frequency: Every animation frame (~60fps)
 * - Memory: Auto-cleanup of animation frames on unmount
 * 
 * @param endValue - The final number to count to
 * @param options - Configuration options for duration and delay
 * @returns Object containing ref, count value, and animation state
 * 
 * @example
 * ```typescript
 * function MetricCard() {
 *   const { ref, count, isAnimating } = useAnimatedCounter(180, { 
 *     duration: 2500,
 *     delay: 300 
 *   });
 * 
 *   return (
 *     <div ref={ref}>
 *       <h3>{count}%</h3>
 *       <p>Revenue Growth</p>
 *     </div>
 *   );
 * }
 * ```
 * 
 * @example
 * ```typescript
 * // With custom duration and staggered delay
 * const { ref, count } = useAnimatedCounter(3500, {
 *   duration: 3000, // 3 seconds
 *   delay: 500      // Start after 500ms
 * });
 * ```
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
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          if (isAnimating) return;
          setIsAnimating(true);

          setTimeout(() => {
            const startTime = Date.now();
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const currentValue = Math.floor(endValue * easeOutQuart);

              setCount(currentValue);

              if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(animate);
              } else {
                setCount(endValue);
                setIsAnimating(false);
              }
            };
            animationFrameRef.current = requestAnimationFrame(animate);
          }, delay);
        } else {
          setCount(0);
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
          setIsAnimating(false);
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
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [endValue, duration, delay, isAnimating]);

  return {
    ref,
    count,
    isAnimating,
  };
}
