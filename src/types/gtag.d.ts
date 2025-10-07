/**
 * @fileoverview Google Analytics 4 (gtag) Type Definitions
 * 
 * Provides comprehensive TypeScript support for Google Analytics 4 (GA4) tracking
 * functionality used throughout the application. Ensures type safety when tracking
 * user behavior, conversions, and custom events.
 * 
 * @module types/gtag
 * @author Alvi Global Enterprises
 * @version 1.0.0
 * 
 * @features
 * - 🎯 Type-safe event tracking with autocomplete support
 * - 📊 Complete GA4 parameter coverage
 * - 🔒 Compile-time validation of event parameters
 * - 📝 JSDoc documentation for all properties
 * - 🚀 Optimized for developer experience
 * 
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/reference/events|GA4 Event Reference}
 */

/**
 * Extends the global Window interface to include gtag function
 * 
 * This allows TypeScript to recognize gtag as a global function and provides
 * IntelliSense support for all gtag operations throughout the application.
 * 
 * @global
 */
interface Window {
  /**
   * Google Analytics 4 gtag function for tracking events and page views
   * 
   * The gtag function is the primary interface for sending data to Google Analytics.
   * It supports various commands, with 'event' being the most commonly used.
   * 
   * **Common Event Types:**
   * - `page_view`: Track page navigation
   * - `quiz_start`: Track assessment initiation
   * - `quiz_complete`: Track assessment completion
   * - `form_submit`: Track form submissions
   * - `calendly_booking_opened`: Track consultation booking attempts
   * - `download`: Track file downloads
   * 
   * **Event Parameters:**
   * - `event_category`: Groups related events (e.g., 'engagement', 'conversion')
   * - `event_label`: Provides additional context (e.g., 'AI Growth Quiz')
   * - `value`: Numeric metric (e.g., quiz score, order value)
   * - Custom dimensions: UTM params, user properties, etc.
   * 
   * @param command - The gtag command type (currently 'event' is supported)
   * @param action - The action being tracked (event name)
   * @param params - Event parameters and custom dimensions
   * 
   * @example
   * ```typescript
   * // Track a page view
   * gtag('event', 'page_view', {
   *   page_title: 'AI Growth Score',
   *   page_location: window.location.href
   * });
   * ```
   * 
   * @example
   * ```typescript
   * // Track quiz completion with score
   * gtag('event', 'quiz_complete', {
   *   event_category: 'assessment',
   *   event_label: 'AI Growth Score',
   *   value: 85
   * });
   * ```
   * 
   * @example
   * ```typescript
   * // Track Calendly booking with UTM params
   * gtag('event', 'calendly_booking_opened', {
   *   event_category: 'engagement',
   *   event_label: 'Hero CTA',
   *   utm_campaign: 'header-cta',
   *   utm_source: 'age-website',
   *   value: 1
   * });
   * ```
   */
  gtag: (
    command: 'event',
    action: string,
    params: {
      /** Page title for page view events */
      page_title?: string;
      
      /** Page URL for page view events (should be full URL with protocol) */
      page_location?: string;
      
      /** 
       * Event category for grouping related events
       * Examples: 'engagement', 'conversion', 'assessment', 'navigation'
       */
      event_category?: string;
      
      /** 
       * Event label for additional context
       * Examples: 'AI Growth Quiz', 'Hero CTA', 'Header Navigation'
       */
      event_label?: string;
      
      /** 
       * Numeric value associated with the event
       * Examples: quiz score, order value, booking count
       */
      value?: number;
      
      /** 
       * Additional custom parameters
       * Includes UTM parameters, custom dimensions, and event-specific data
       * 
       * Common custom parameters:
       * - utm_campaign: Campaign identifier
       * - utm_source: Traffic source
       * - utm_medium: Marketing medium
       * - utm_content: Content variation
       * - utm_term: Search keywords
       * - user_type: User classification
       * - score: Assessment score
       * - band: Maturity band
       */
      [key: string]: string | number | boolean | undefined;
    }
  ) => void;
}

/**
 * Global gtag function declaration
 * 
 * This allows direct usage of gtag() without window.gtag() prefix,
 * making the code cleaner and more readable.
 * 
 * @global
 * @function
 */
declare const gtag: Window['gtag'];
