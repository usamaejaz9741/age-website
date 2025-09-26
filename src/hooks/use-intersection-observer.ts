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

import { useEffect, useRef, useState } from 'react';

/**
 * Configuration options for the intersection observer
 */
interface UseIntersectionObserverOptions {
  /** Percentage of element that must be visible to trigger (0-1) */
  threshold?: number;
  /** Margin around the root element for intersection calculation */
  rootMargin?: string;
  /** Whether to trigger only once or continuously */
  triggerOnce?: boolean;
}

/**
 * Custom hook for intersection observer functionality
 * 
 * This hook provides a React-friendly interface to the Intersection Observer API,
 * allowing components to easily detect when elements enter or leave the viewport.
 * It's particularly useful for scroll-triggered animations and lazy loading.
 * 
 * @param options - Configuration options for the intersection observer
 * @returns Object containing ref to attach to elements and intersection state
 * 
 * @example
 * ```tsx
 * const { ref, isIntersecting } = useIntersectionObserver({
 *   threshold: 0.5,
 *   triggerOnce: true
 * });
 * 
 * return (
 *   <div ref={ref}>
 *     {isIntersecting ? 'Visible!' : 'Not visible'}
 *   </div>
 * );
 * ```
 * 
 * @since 1.0.0
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
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
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return; // Exit early if no element to observe

    // Create intersection observer with callback
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
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
