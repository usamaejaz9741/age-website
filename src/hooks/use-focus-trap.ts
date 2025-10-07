/**
 * @fileoverview Focus Trap Hook - Accessibility Focus Management
 * 
 * A custom hook that provides focus trap functionality for modal dialogs
 * and other components that need to contain focus within a specific area.
 * 
 * @hook
 * @example
 * ```tsx
 * const trapRef = useFocusTrap(isOpen);
 * 
 * return (
 *   <div ref={trapRef} role="dialog" aria-modal="true">
 *     {children}
 *   </div>
 * );
 * ```
 * 
 * @features
 * - 🎯 Automatic focus trapping within container
 * - ⌨️ Keyboard navigation support (Tab, Shift+Tab, Escape)
 * - ♿ Full accessibility compliance
 * - 🔄 Dynamic focus management
 * - 🚀 Performance optimized
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

import React, { useEffect, useRef, useCallback } from 'react';

/**
 * Defines the configuration options for the `useFocusTrap` hook.
 */
interface UseFocusTrapOptions {
  /**
   * If `true`, focus will be restored to the element that was focused before the trap was activated.
   * @default true
   */
  restoreFocus?: boolean;
  /**
   * A CSS selector string used to identify focusable elements within the trap.
   * @default 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
   */
  focusableSelector?: string;
}

/**
 * A custom React hook that traps focus within a specified container element,
 * essential for accessible modal dialogs, popovers, and other overlay components.
 *
 * When active, this hook prevents users from tabbing outside the container and
 * handles keyboard navigation (Tab, Shift+Tab) to cycle through focusable elements.
 * It also restores focus to the previously focused element when the trap is deactivated.
 *
 * @param {boolean} [isActive=true] - A boolean to activate or deactivate the focus trap.
 * @param {UseFocusTrapOptions} [options={}] - Optional configuration for the focus trap.
 * @returns {React.RefObject<HTMLDivElement>} A ref object to be attached to the container element that should trap focus.
 */
export const useFocusTrap = (
  isActive: boolean = true,
  options: UseFocusTrapOptions = {}
): React.RefObject<HTMLDivElement> => {
  const {
    restoreFocus = true,
    focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const firstFocusableElementRef = useRef<HTMLElement | null>(null);
  const lastFocusableElementRef = useRef<HTMLElement | null>(null);

  // Get all focusable elements within the container
  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (!containerRef.current) return [];
    
    const elements = Array.from(
      containerRef.current.querySelectorAll(focusableSelector)
    ) as HTMLElement[];
    
    // Filter out disabled and hidden elements
    return elements.filter(element => {
      return (
        !element.disabled &&
        !element.hidden &&
        element.offsetParent !== null &&
        element.tabIndex !== -1
      );
    });
  }, [focusableSelector]);

  // Set up focus trap
  const setupFocusTrap = useCallback(() => {
    if (!containerRef.current || !isActive) return;

    const focusableElements = getFocusableElements();
    
    if (focusableElements.length === 0) return;

    firstFocusableElementRef.current = focusableElements[0];
    lastFocusableElementRef.current = focusableElements[focusableElements.length - 1];

    // Focus the first element
    firstFocusableElementRef.current.focus();
  }, [isActive, getFocusableElements]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isActive || !containerRef.current) return;

    const { key, shiftKey } = event;
    const focusableElements = getFocusableElements();

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (key === 'Tab') {
      if (shiftKey) {
        // Shift + Tab: Move backwards
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: Move forwards
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    } else if (key === 'Escape') {
      // Handle escape key - this should be handled by the parent component
      // We just prevent the default behavior
      event.preventDefault();
    }
  }, [isActive, getFocusableElements]);

  // Store the previously focused element
  useEffect(() => {
    if (isActive && restoreFocus) {
      previousActiveElementRef.current = document.activeElement as HTMLElement;
    }
  }, [isActive, restoreFocus]);

  // Set up and clean up focus trap
  useEffect(() => {
    if (!isActive) return;

    // Set up focus trap
    setupFocusTrap();

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      
      // Restore focus to previously focused element
      if (restoreFocus && previousActiveElementRef.current) {
        previousActiveElementRef.current.focus();
      }
    };
  }, [isActive, setupFocusTrap, handleKeyDown, restoreFocus]);

  // Re-setup focus trap when container changes
  useEffect(() => {
    if (isActive && containerRef.current) {
      setupFocusTrap();
    }
  }, [isActive, setupFocusTrap]);

  return containerRef;
};

export default useFocusTrap;
