/**
 * Google Analytics 4 (gtag) Type Definitions
 * 
 * These type definitions provide TypeScript support for Google Analytics 4
 * tracking functionality used throughout the application for user behavior
 * analysis and conversion tracking.
 */

/**
 * Extends the global Window interface to include gtag function
 * This allows TypeScript to recognize gtag as a global function
 */
interface Window {
  /**
   * Google Analytics 4 gtag function for tracking events and page views
   * 
   * @param command - The gtag command type (currently only 'event' is used)
   * @param action - The action being tracked (e.g., 'page_view', 'quiz_start')
   * @param params - Event parameters and custom dimensions
   */
  gtag: (
    command: 'event',
    action: string,
    params: {
      /** Page title for page view events */
      page_title?: string;
      /** Page URL for page view events */
      page_location?: string;
      /** Event category for grouping related events */
      event_category?: string;
      /** Event label for additional context */
      event_label?: string;
      /** Numeric value associated with the event */
      value?: number;
      /** Additional custom parameters (UTM params, custom dimensions, etc.) */
      [key: string]: string | number | boolean | undefined;
    }
  ) => void;
}

/**
 * Global gtag function declaration
 * This allows direct usage of gtag() without window.gtag()
 */
declare const gtag: Window['gtag'];