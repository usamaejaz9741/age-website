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
 * A custom React hook that determines if the current viewport width is below a mobile breakpoint.
 *
 * This hook uses the `matchMedia` API to efficiently listen for changes in the viewport size
 * and provides a boolean state that indicates whether the screen is currently considered "mobile".
 * It is server-side rendering (SSR) friendly.
 *
 * @returns {boolean} `true` if the viewport width is less than the mobile breakpoint (768px), otherwise `false`.
 *
 * @example
 * ```tsx
 * function ResponsiveComponent() {
 *   const isMobile = useIsMobile();
 *
 *   return (
 *     <div>
 *       {isMobile ? <MobileLayout /> : <DesktopLayout />}
 *     </div>
 *   );
 * }
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
