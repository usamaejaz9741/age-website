/**
 * @fileoverview Intersection Observer Hook - Scroll-Based Element Detection
 * 
 * A React hook that provides a clean interface to the Intersection Observer API
 * for detecting when elements enter or leave the viewport. This is commonly used
 * for scroll-triggered animations, lazy loading, and performance optimizations.
 * 
 * Features:
 * - Configurable threshold and root margin
 * - One-time or continuous intersection detection
 * - Automatic cleanup and memory management
 * - TypeScript support with proper typing
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 * @since 1.0.0
 */

import React, { useEffect, useRef, useState } from 'react';

/**
 * Defines the configuration options for the `useIntersectionObserver` hook.
 */
interface UseIntersectionObserverOptions {
  /**
   * The percentage of the element's visibility at which the observer's callback should be executed.
   * A value of 0 means the callback will run as soon as one pixel is visible; 1.0 means the entire element must be visible.
   * @default 0.1
   */
  threshold?: number;
  /**
   * A string with syntax similar to the CSS `margin` property, used to grow or shrink the intersection area.
   * For example, `'0px 0px -50px 0px'` starts detection 50px before the element enters the viewport from the bottom.
   * @default '0px 0px -50px 0px'
   */
  rootMargin?: string;
  /**
   * If `true`, the observer will stop observing the element after it has intersected for the first time.
   * If `false`, it will continue to report changes in intersection status.
   * @default true
   */
  triggerOnce?: boolean;
}

/**
 * A custom React hook that provides an easy way to use the Intersection Observer API.
 *
 * This hook simplifies the process of detecting when an element enters or leaves the viewport.
 * It's highly useful for implementing features like lazy loading of images, infinite scrolling,
 * or triggering animations when an element becomes visible.
 *
 * @template T - The type of the HTML element to be observed. Defaults to `HTMLElement`.
 * @param {UseIntersectionObserverOptions} [options={}] - Optional configuration for the Intersection Observer.
 * @returns {{ref: React.RefObject<T>, isIntersecting: boolean}} An object containing:
 * - `ref`: A React ref to be attached to the DOM element you want to observe.
 * - `isIntersecting`: A boolean that is `true` if the element is currently intersecting with the viewport, and `false` otherwise.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { ref, isIntersecting } = useIntersectionObserver({
 *     threshold: 0.5,
 *     triggerOnce: true
 *   });
 *
 *   return (
 *     <div ref={ref} className={isIntersecting ? 'animate-fade-in' : 'opacity-0'}>
 *       This will fade in when 50% visible.
 *     </div>
 *   );
 * }
 * ```
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  options: UseIntersectionObserverOptions = {}
): { ref: React.RefObject<T>; isIntersecting: boolean } {
  // Destructure options with sensible defaults
  const {
    threshold = 0.1,                    // Trigger when 10% of element is visible
    rootMargin = '0px 0px -50px 0px',  // Start detection 50px before element enters viewport
    triggerOnce = true                  // Only trigger once by default
  } = options;

  // State for current intersection status
  const [isIntersecting, setIsIntersecting] = useState(false);
  // State for tracking if element has ever intersected (for triggerOnce behavior)
  const [hasIntersected, setHasIntersected] = useState(false);
  // Ref to attach to the element we want to observe
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return; // Exit early if no element to observe

    // Create intersection observer with callback
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry?.isIntersecting;
        setIsIntersecting(isElementIntersecting);
        
        // Track if element has ever intersected (for triggerOnce behavior)
        if (isElementIntersecting) {
          setHasIntersected(true);
        }
      },
      {
        threshold,    // Percentage of element that must be visible
        rootMargin,   // Margin around root for intersection calculation
      }
    );

    // Start observing the element
    observer.observe(element);

    // Cleanup: stop observing when component unmounts or dependencies change
    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin]); // Re-run effect if options change

  return {
    ref, // Ref to attach to the element you want to observe
    isIntersecting: triggerOnce ? hasIntersected : isIntersecting, // Current intersection state
  };
}
