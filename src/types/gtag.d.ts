/**
 * @fileoverview Google Analytics 4 (gtag) Type Definitions
 * 
 * This file provides comprehensive TypeScript definitions for the Google Analytics 4 (GA4)
 * `gtag` function. By extending the global `Window` interface, it ensures type safety
 * and enables IntelliSense for all analytics tracking calls, reducing the risk of
 * runtime errors and improving the developer experience.
 * 
 * @module types/gtag
 * @author Alvi Global Enterprises
 * @version 1.0.0
 * 
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/reference/events|GA4 Event Reference} for a detailed list of standard events and parameters.
 */

/**
 * Extends the global `Window` interface to include the `gtag` function.
 * This declaration makes the `gtag` function available globally in the TypeScript environment,
 * allowing for direct calls like `gtag('event', ...)` without type errors.
 *
 * @global
 */
interface Window {
  /**
   * The core function for sending data to Google Analytics 4.
   * It is used to track events, page views, and other user interactions.
   *
   * @param {'event'} command - The type of command to execute. Currently, only 'event' is defined.
   * @param {string} action - The name of the event being tracked (e.g., 'page_view', 'quiz_complete').
   * @param {object} params - An object containing parameters that provide additional details about the event.
   *
   * @example
   * // Track a page view
   * gtag('event', 'page_view', {
   *   page_title: 'AI Growth Score',
   *   page_location: window.location.href
   * });
   *
   * @example
   * // Track a conversion event with a value
   * gtag('event', 'quiz_complete', {
   *   event_category: 'conversion',
   *   event_label: 'AI Growth Score Assessment',
   *   value: 85
   * });
   */
  gtag: (
    command: 'event',
    action: string,
    params: {
      /** The title of the page being viewed. Used with 'page_view' events. */
      page_title?: string;
      
      /** The full URL of the page being viewed. Used with 'page_view' events. */
      page_location?: string;
      
      /** 
       * A category to group related events for easier analysis.
       * @example 'engagement', 'conversion', 'assessment'
       */
      event_category?: string;
      
      /** 
       * A label that provides additional context about the event.
       * @example 'AI Growth Quiz', 'Hero CTA Button'
       */
      event_label?: string;
      
      /** 
       * A numerical value associated with the event, such as a score or monetary value.
       * @example 1, 85, 100
       */
      value?: number;
      
      /** 
       * A flexible object for any additional custom parameters, including UTM tags,
       * custom dimensions, or other event-specific data.
       */
      [key: string]: string | number | boolean | undefined;
    }
  ) => void;
}

/**
 * Declares the `gtag` function in the global scope.
 * This allows for direct use of `gtag(...)` in the code without needing to prefix it
 * with `window.`, making tracking calls cleaner.
 *
 * @global
 * @function gtag
 */
declare const gtag: Window['gtag'];