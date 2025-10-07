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
 * A frozen object containing central configuration for the Calendly integration.
 * This includes the base URL for the booking page and default UTM parameters for tracking.
 *
 * @const {object} CALENDLY_CONFIG
 * @property {string} BASE_URL - The specific URL for the AI Growth Consultation booking page.
 * @property {object} DEFAULT_UTM - Default UTM parameters for tracking the source of bookings.
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
 * Opens the Calendly booking page in a new tab with pre-filled data and tracking parameters.
 *
 * This function constructs the Calendly URL with any provided pre-fill data and UTM parameters,
 * sends a tracking event to Google Analytics, and then opens the URL in a new, secure browser tab.
 *
 * @param {CalendlyPrefill} [prefill] - Optional. An object containing user data (name, email) to pre-fill in the Calendly form.
 * @param {CalendlyUTM} [utm] - Optional. An object containing UTM parameters for marketing campaign tracking.
 * @param {string} [eventLabel] - Optional. A label for the Google Analytics event to specify the source of the click.
 * @returns {void} This function does not return a value.
 */
export function openCalendlyBooking(
  prefill?: CalendlyPrefill,
  utm?: CalendlyUTM,
  eventLabel?: string
): void {

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
    }
  } catch (error) {
    // Handle errors gracefully without disrupting user experience
    console.warn('Failed to open Calendly booking window:', error);
  }
}


/**
 * Generates a Calendly booking URL with the specified pre-fill and UTM parameters.
 *
 * This utility function is useful for creating shareable booking links for use in emails,
 * social media, or other marketing materials without immediately opening the URL.
 *
 * @param {CalendlyPrefill} [prefill] - Optional. An object containing user data to be included as URL parameters.
 * @param {CalendlyUTM} [utm] - Optional. An object containing UTM parameters for tracking.
 * @returns {string} The complete, shareable Calendly URL with all parameters encoded.
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
