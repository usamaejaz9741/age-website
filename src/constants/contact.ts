/**
 * @fileoverview Contact Information Constants
 * 
 * Centralized contact information for Alvi Global Enterprises.
 * Used throughout the application for consistency and easy updates.
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

/**
 * Contact information for Alvi Global Enterprises
 */
export const CONTACT_INFO = {
  /** Primary contact email */
  email: 'hello@alviglobal.com',
  
  /** Primary phone number (international format) */
  phone: '+92 301 8222054',
  
  /** Primary phone number (display format) */
  phoneDisplay: '+92 301 8222054',
  
  /** Support email */
  supportEmail: 'support@alviglobal.com',
  
  /** Sales inquiry email */
  salesEmail: 'sales@alviglobal.com',
  
  /** Main website URL */
  website: 'https://alviglobal.com',
  
  /** Company physical address */
  address: {
    street: 'Karachi',
    city: 'Karachi',
    region: 'Sindh',
    country: 'Pakistan',
    countryCode: 'PK',
    formatted: 'Karachi, Sindh, Pakistan'
  },
  
  /** Social media profiles */
  social: {
    twitter: 'https://twitter.com/AlviGlobalEnt',
    linkedin: 'https://linkedin.com/company/alvi-global-enterprises',
    github: 'https://github.com/alviglobal',
    facebook: 'https://facebook.com/alviglobalenterprises'
  },
  
  /** Global offices */
  offices: [
    { 
      name: 'Headquarters',
      location: 'Karachi, Pakistan',
      type: 'hq' as const
    },
    { 
      name: 'Dubai Office',
      location: 'Dubai, UAE',
      type: 'office' as const
    },
    { 
      name: 'Singapore Office',
      location: 'Singapore',
      type: 'office' as const
    },
    { 
      name: 'London Office',
      location: 'London, UK',
      type: 'office' as const
    }
  ]
} as const;

/**
 * Email templates for common actions
 */
export const EMAIL_TEMPLATES = {
  /** AI Growth Score results inquiry */
  growthScoreResults: {
    subject: 'AI Growth Score Results',
    body: 'Hi, I just completed the AI Growth Score assessment and would like to discuss my results.'
  },
  
  /** General inquiry */
  generalInquiry: {
    subject: 'Inquiry from Website',
    body: 'Hi, I have a question about your services.'
  },
  
  /** Partnership inquiry */
  partnershipInquiry: {
    subject: 'Partnership Opportunity',
    body: 'Hi, I would like to discuss a potential partnership opportunity.'
  }
} as const;

/**
 * Generate mailto link with template
 * 
 * @param template - Email template key
 * @param customSubject - Optional custom subject
 * @param customBody - Optional custom body
 * @returns Formatted mailto link
 * 
 * @example
 * ```typescript
 * const mailtoLink = generateMailtoLink('growthScoreResults');
 * // Returns: "mailto:hello@alviglobal.com?subject=AI Growth Score Results&body=..."
 * ```
 */
export function generateMailtoLink(
  template: keyof typeof EMAIL_TEMPLATES,
  customSubject?: string,
  customBody?: string
): string {
  const emailTemplate = EMAIL_TEMPLATES[template];
  const subject = customSubject || emailTemplate.subject;
  const body = customBody || emailTemplate.body;
  
  const params = new URLSearchParams({
    subject,
    body
  });
  
  return `mailto:${CONTACT_INFO.email}?${params.toString()}`;
}


