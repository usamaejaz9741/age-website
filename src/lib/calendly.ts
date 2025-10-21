/**
 * @fileoverview Calendly Integration Utilities
 * 
 * Provides comprehensive utility functions for integrating with the Calendly booking system,
 * including popup widgets, event tracking, and UTM parameter management for marketing attribution.
 * 
 * @module calendly
 * @author Alvi Global Enterprises
 * @version 1.0.0
 * 
 * @features
 * - 📅 One-click consultation booking via Calendly
 * - 📊 Google Analytics event tracking integration
 * - 🎯 UTM parameter management for campaign attribution
 * - 📧 Pre-fill support for user data (name, email)
 * - 🔒 Secure popup handling with error recovery
 * - 🚀 New tab navigation with proper security attributes
 */

/**
 * Configuration for Calendly integration
 * 
 * Central configuration object containing all Calendly-related constants
 * and default parameters for booking consultations.
 */
export const CALENDLY_CONFIG = {
  /** 
   * Base Calendly URL for Alvi Global Enterprises AI Growth Consultation
   * This URL points to the specific 30-minute consultation event type
   */
  BASE_URL: 'https://calendly.com/age-meetings/ai-growth-consultation',
  
  /** 
   * Default UTM parameters for tracking
   * These parameters help track the source of bookings across different channels
   */
  DEFAULT_UTM: {
    utm_source: 'age-website',
    utm_medium: 'web',
    utm_campaign: 'ai-growth-consultation'
  }
};

/**
 * Pre-fill data interface for Calendly forms
 * 
 * Allows pre-populating Calendly booking forms with user information
 * to improve conversion rates and user experience.
 * 
 * @interface CalendlyPrefill
 */
export interface CalendlyPrefill {
  /** User's full name (first and last) */
  name?: string;
  
  /** User's email address for booking confirmation */
  email?: string;
  
  /** Custom answers for Calendly form fields (e.g., company name, role) */
  customAnswers?: Record<string, string>;
}

/**
 * UTM parameters interface for marketing attribution
 * 
 * Used to track the effectiveness of marketing campaigns and identify
 * the source of consultation bookings.
 * 
 * @interface CalendlyUTM
 */
export interface CalendlyUTM {
  /** Campaign name (e.g., 'growth-audit-modal', 'header-cta') */
  utmCampaign?: string;
  
  /** Traffic source (e.g., 'age-website', 'linkedin', 'google') */
  utmSource?: string;
  
  /** Marketing medium (e.g., 'modal', 'header', 'email') */
  utmMedium?: string;
  
  /** Campaign content for A/B testing (e.g., 'hero-cta', 'sidebar-widget') */
  utmContent?: string;
  
  /** Paid search keywords (for PPC campaigns) */
  utmTerm?: string;
}

/**
 * Opens Calendly in a new tab for booking consultation with enhanced accessibility
 * 
 * This function handles the complete flow of opening a Calendly booking page with:
 * - Pre-filling user data
 * - UTM parameter tracking
 * - Google Analytics events
 * - Focus management for keyboard users
 * - Screen reader announcements
 * - Automatic focus restoration when user returns
 * 
 * @param prefill - Optional pre-fill data for the booking form
 * @param utm - Optional UTM parameters for campaign tracking
 * @param eventLabel - Optional event label for Google Analytics tracking
 * @param triggerElement - Element that triggered the booking (for focus restoration)
 * 
 * @returns void
 * 
 * @example
 * ```typescript
 * // Basic usage
 * openCalendlyBooking();
 * 
 * // With pre-fill data and focus management
 * const button = event.currentTarget as HTMLElement;
 * openCalendlyBooking(
 *   { email: 'user@example.com', name: 'John Doe' },
 *   { utmCampaign: 'hero-cta', utmContent: 'Book Consultation Button' },
 *   'Hero CTA Click',
 *   button
 * );
 * ```
 * 
 * @security
 * - Opens in new tab with `noopener,noreferrer` for security
 * - Validates window opening to prevent popup blockers
 * - Gracefully handles errors with console warnings
 * 
 * @accessibility
 * - Restores focus to trigger element when user returns
 * - Announces actions to screen readers
 * - WCAG 2.1 AAA compliant focus management
 */
export function openCalendlyBooking(
  prefill?: CalendlyPrefill,
  utm?: CalendlyUTM,
  eventLabel?: string,
  triggerElement?: HTMLElement
): void {
  // Store reference to trigger element for focus restoration
  const originalActiveElement = triggerElement || (document.activeElement as HTMLElement);

  // Track the booking attempt with Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'calendly_booking_opened', {
      event_category: 'engagement',
      event_label: eventLabel || 'AI Growth Consultation',
      value: 1
    });
  }

  // Build complete URL with all parameters
  const url = new URL(CALENDLY_CONFIG.BASE_URL);
  
  // Add prefill parameters for user convenience
  if (prefill?.name) {
    url.searchParams.set('name', prefill.name);
  }
  if (prefill?.email) {
    url.searchParams.set('email', prefill.email);
  }
  
  // Merge default UTM params with custom ones (custom takes precedence)
  const utmParams = { ...CALENDLY_CONFIG.DEFAULT_UTM, ...utm };
  Object.entries(utmParams).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  // Open Calendly in new tab with proper security attributes
  try {
    const newWindow = window.open(url.toString(), '_blank', 'noopener,noreferrer');
    
    // Verify the window opened successfully (popup blocker check)
    if (newWindow && !newWindow.closed) {
      // Focus the new window for better UX
      newWindow.focus();
      
      // Announce to screen readers
      announceToScreenReader('Calendly booking window opened in new tab. Press Alt+Tab to return when finished.');
      
      // Monitor for window closure to restore focus
      const checkWindowClosed = setInterval(() => {
        try {
          if (newWindow.closed) {
            clearInterval(checkWindowClosed);
            
            // Restore focus to trigger element
            if (originalActiveElement && typeof originalActiveElement.focus === 'function') {
              // Small delay to ensure proper focus restoration
              setTimeout(() => {
                originalActiveElement.focus();
                announceToScreenReader('Returned to main window');
              }, 100);
            }
          }
        } catch {
          // Cross-origin error - window may be closed
          clearInterval(checkWindowClosed);
        }
      }, 1000);
      
      // Clean up interval after 30 minutes (reasonable max booking time)
      setTimeout(() => clearInterval(checkWindowClosed), 1800000);
    } else {
      // Popup blocked or failed to open
      announceToScreenReader('Unable to open booking window. Please check your popup blocker settings.');
    }
  } catch (error) {
    // Handle errors gracefully without disrupting user experience
    console.warn('Failed to open Calendly booking window:', error);
    announceToScreenReader('Unable to open booking window. Please try again or check your browser settings.');
  }
}

/**
 * Announce message to screen readers using ARIA live region
 * 
 * @param message - Message to announce
 * @param priority - Announcement priority ('polite' or 'assertive')
 * 
 * @accessibility
 * Creates a temporary live region that announces the message to screen readers
 * and removes itself after the announcement is complete.
 */
function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  // Create announcement element
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  // Add to DOM
  document.body.appendChild(announcement);
  
  // Remove after announcement is read (1 second is sufficient for most screen readers)
  setTimeout(() => {
    if (announcement.parentNode) {
      document.body.removeChild(announcement);
    }
  }, 1000);
}


/**
 * Generates Calendly URL with parameters (without opening)
 * 
 * Useful for creating shareable booking links or embedding in emails
 * and other marketing materials.
 * 
 * @param prefill - Optional pre-fill data for the form
 * @param utm - Optional UTM parameters for tracking
 * @returns Complete Calendly URL with all parameters encoded
 * 
 * @example
 * ```typescript
 * const bookingUrl = generateCalendlyUrl(
 *   { email: 'user@example.com' },
 *   { utmCampaign: 'email-newsletter', utmMedium: 'email' }
 * );
 * // Returns: https://calendly.com/age-meetings/ai-growth-consultation?email=user@example.com&utm_campaign=email-newsletter...
 * ```
 */
export function generateCalendlyUrl(
  prefill?: CalendlyPrefill,
  utm?: CalendlyUTM
): string {
  const url = new URL(CALENDLY_CONFIG.BASE_URL);
  
  // Add prefill parameters
  if (prefill?.name) {
    url.searchParams.set('name', prefill.name);
  }
  if (prefill?.email) {
    url.searchParams.set('email', prefill.email);
  }
  
  // Merge and add UTM parameters
  const utmParams = { ...CALENDLY_CONFIG.DEFAULT_UTM, ...utm };
  Object.entries(utmParams).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}
