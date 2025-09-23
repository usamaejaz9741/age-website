/**
 * Calendly Integration Utilities
 * 
 * This module provides utility functions for integrating with Calendly
 * booking system, including popup widgets and event tracking.
 */

/**
 * Configuration for Calendly integration
 */
export const CALENDLY_CONFIG = {
  /** Base Calendly URL for Alvi Global Enterprises AI Growth Consultation */
  BASE_URL: 'https://calendly.com/age-meetings/ai-growth-consultation',
  
  /** Default UTM parameters for tracking */
  DEFAULT_UTM: {
    utm_source: 'age-website',
    utm_medium: 'web',
    utm_campaign: 'ai-growth-consultation'
  }
};

/**
 * Pre-fill data interface for Calendly forms
 */
export interface CalendlyPrefill {
  /** User's name */
  name?: string;
  /** User's email address */
  email?: string;
  /** Custom answers for Calendly form fields */
  customAnswers?: Record<string, string>;
}

/**
 * UTM parameters for tracking
 */
export interface CalendlyUTM {
  utmCampaign?: string;
  utmSource?: string;
  utmMedium?: string;
  utmContent?: string;
  utmTerm?: string;
}

/**
 * Opens Calendly in a new tab for booking consultation
 * 
 * @param prefill - Optional pre-fill data for the form
 * @param utm - Optional UTM parameters for tracking
 * @param eventLabel - Optional event label for analytics
 */
export function openCalendlyBooking(
  prefill?: CalendlyPrefill,
  utm?: CalendlyUTM,
  eventLabel?: string
): void {
  console.log('=== CALENDLY BOOKING TRIGGERED ===');
  console.log('URL:', CALENDLY_CONFIG.BASE_URL);
  console.log('Prefill:', prefill);
  console.log('UTM:', utm);
  console.log('Event Label:', eventLabel);

  // Track the event
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'calendly_booking_opened', {
      event_category: 'engagement',
      event_label: eventLabel || 'AI Growth Consultation',
      value: 1
    });
  }

  // Build URL with parameters
  const url = new URL(CALENDLY_CONFIG.BASE_URL);
  
  // Add prefill parameters
  if (prefill?.name) {
    url.searchParams.set('name', prefill.name);
  }
  if (prefill?.email) {
    url.searchParams.set('email', prefill.email);
  }
  
  // Add UTM parameters
  const utmParams = { ...CALENDLY_CONFIG.DEFAULT_UTM, ...utm };
  Object.entries(utmParams).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  console.log('Final URL:', url.toString());

  // Open in new tab
  try {
    const newWindow = window.open(url.toString(), '_blank', 'noopener,noreferrer');
    
    // Check if the window was successfully opened
    if (newWindow && !newWindow.closed) {
      console.log('Successfully opened Calendly in new tab');
      // Focus the new window
      newWindow.focus();
    } else {
      console.warn('Popup blocked or failed to open, but not falling back to current tab');
      // Don't fall back to current tab navigation to avoid the double navigation issue
    }
  } catch (error) {
    console.error('Error opening Calendly:', error);
    // Don't fall back to current tab navigation
  }
}


/**
 * Generates Calendly URL with parameters
 * 
 * @param prefill - Optional pre-fill data for the form
 * @param utm - Optional UTM parameters for tracking
 * @returns Complete Calendly URL with parameters
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
  
  // Add UTM parameters
  const utmParams = { ...CALENDLY_CONFIG.DEFAULT_UTM, ...utm };
  Object.entries(utmParams).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}

