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

  // Current counter value (0 to endValue)
  const [count, setCount] = useState(0);
  
  // Track if animation has started (prevents re-triggering)
  const [hasStarted, setHasStarted] = useState(false);
  
  // Ref to attach to the DOM element we want to observe
  const ref = useRef<HTMLElement>(null);
  
  // Ref to store requestAnimationFrame ID for cleanup
  const animationRef = useRef<number>();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Create intersection observer to detect when element enters viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger animation when element becomes visible (and hasn't animated yet)
        if (entry?.isIntersecting && !hasStarted) {
          setHasStarted(true);
          
          // Start animation after specified delay
          setTimeout(() => {
            setCount(0);
            
            const startTime = Date.now();

            /**
             * Animation loop using requestAnimationFrame
             * 
             * This function recursively calls itself until the animation completes,
             * updating the counter value on each frame for smooth motion.
             */
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Apply ease-out-quart easing for natural deceleration
              // Formula: 1 - (1 - progress)^4
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const currentValue = endValue * easeOutQuart;

              // Update counter value (floor to avoid decimals)
              setCount(Math.floor(currentValue));

              // Continue animating until we reach 100% progress
              if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
              } else {
                // Ensure final value is exact (no rounding errors)
                setCount(endValue);
              }
            };

            // Start the animation loop
            animationRef.current = requestAnimationFrame(animate);
          }, delay);
        }
      },
      {
        // Trigger when 10% of element is visible
        threshold: 0.1,
        // Start detecting 50px before element enters viewport
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Start observing the element
    observer.observe(element);

    // Cleanup function
    return () => {
      observer.unobserve(element);
      // Cancel any pending animation frames to prevent memory leaks
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [endValue, duration, delay, hasStarted]);

  return {
    /** Ref to attach to the element you want to observe */
    ref,
    /** Current counter value (animated from 0 to endValue) */
    count,
    /** Whether the animation has started */
    isAnimating: hasStarted
  };
}
