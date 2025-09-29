/**
 * Mobile Detection Hook
 * 
 * A React hook that detects if the current viewport is mobile-sized
 * based on a configurable breakpoint. Uses matchMedia API for efficient
 * responsive behavior detection.
 */

import * as React from "react";

/** Breakpoint in pixels below which the device is considered mobile */
const MOBILE_BREAKPOINT = 768;

/**
 * Hook to detect if the current viewport is mobile-sized
 * 
 * Features:
 * - Uses matchMedia API for efficient media query listening
 * - Automatically updates when viewport size changes
 * - Returns boolean indicating mobile state
 * - Handles SSR with undefined initial state
 * 
 * @returns boolean - true if viewport is mobile-sized, false otherwise
 * 
 * @example
 * ```tsx
 * const isMobile = useIsMobile();
 * 
 * return (
 *   <div className={isMobile ? 'mobile-layout' : 'desktop-layout'}>
 *     Content
 *   </div>
 * );
 * ```
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    // Initialize with proper value, handling SSR
    if (typeof window === 'undefined') {
      return false; // Default to desktop for SSR
    }
    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    // Set initial value on mount
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []); // Empty dependency array is correct here - we only want to set up the listener once

  return isMobile;
}
