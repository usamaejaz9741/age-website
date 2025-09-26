/**
 * @fileoverview SEO Utilities - Comprehensive SEO Helper Functions
 * 
 * This module provides comprehensive SEO utility functions for:
 * - Meta tag generation and validation
 * - Structured data creation and validation
 * - Open Graph and Twitter Card optimization
 * - Canonical URL generation
 * - SEO-friendly URL generation
 * - Content optimization helpers
 * - Performance SEO optimizations
 * 
 * All functions are designed to be SEO-compliant, performant, and easy to use
 * throughout the application for maintaining SEO best practices.
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 * @since 1.0.0
 */

/**
 * SEO configuration constants
 */
export const SEO_CONFIG = {
  SITE_NAME: 'Alvi Global Enterprises',
  SITE_URL: 'https://alviglobal.com',
  DEFAULT_OG_IMAGE: 'https://alviglobal.com/og-image.jpg',
  DEFAULT_TWITTER_HANDLE: '@AlviGlobalEnt',
  DEFAULT_LOCALE: 'en_US',
  DEFAULT_COUNTRY: 'PK',
  DEFAULT_REGION: 'Sindh',
  DEFAULT_CITY: 'Karachi',
  CONTACT_EMAIL: 'hello@alviglobal.com',
  SOCIAL_LINKS: {
    twitter: 'https://twitter.com/AlviGlobalEnt',
    linkedin: 'https://linkedin.com/company/alvi-global-enterprises'
  }
} as const;

/**
 * Generates SEO-friendly page title
 * 
 * @param title - Page title
 * @param includeSiteName - Whether to include site name
 * @returns SEO-optimized page title
 * 
 * @example
 * ```typescript
 * generatePageTitle('AI Assessment'); // Returns: "AI Assessment | Alvi Global Enterprises"
 * generatePageTitle('AI Assessment', false); // Returns: "AI Assessment"
 * ```
 */
export function generatePageTitle(title: string, includeSiteName: boolean = true): string {
  if (!title) return SEO_CONFIG.SITE_NAME;
  
  const cleanTitle = title.trim();
  if (!includeSiteName) return cleanTitle;
  
  return `${cleanTitle} | ${SEO_CONFIG.SITE_NAME}`;
}

/**
 * Generates SEO-friendly meta description
 * 
 * @param description - Page description
 * @param maxLength - Maximum description length (default: 160)
 * @returns SEO-optimized meta description
 * 
 * @example
 * ```typescript
 * generateMetaDescription('Transform your business with AI automation...');
 * // Returns: "Transform your business with AI automation..."
 * ```
 */
export function generateMetaDescription(description: string, maxLength: number = 160): string {
  if (!description) return '';
  
  const cleanDescription = description.trim();
  if (cleanDescription.length <= maxLength) return cleanDescription;
  
  // Truncate at word boundary
  const truncated = cleanDescription.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  return lastSpaceIndex > 0 ? truncated.substring(0, lastSpaceIndex) + '...' : truncated + '...';
}

/**
 * Generates canonical URL
 * 
 * @param path - Page path
 * @returns Canonical URL
 * 
 * @example
 * ```typescript
 * generateCanonicalUrl('/ai-growth-score'); // Returns: "https://alviglobal.com/ai-growth-score"
 * generateCanonicalUrl('/'); // Returns: "https://alviglobal.com"
 * ```
 */
export function generateCanonicalUrl(path: string = '/'): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SEO_CONFIG.SITE_URL}${cleanPath}`;
}

/**
 * Generates Open Graph image URL
 * 
 * @param imagePath - Image path
 * @returns Open Graph image URL
 * 
 * @example
 * ```typescript
 * generateOgImageUrl('/og-image-ai-assessment.jpg');
 * // Returns: "https://alviglobal.com/og-image-ai-assessment.jpg"
 * ```
 */
export function generateOgImageUrl(imagePath: string): string {
  if (!imagePath) return SEO_CONFIG.DEFAULT_OG_IMAGE;
  
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${SEO_CONFIG.SITE_URL}${cleanPath}`;
}

/**
 * Generates comprehensive keywords string
 * 
 * @param keywords - Array of keywords
 * @param includeDefault - Whether to include default keywords
 * @returns SEO-optimized keywords string
 * 
 * @example
 * ```typescript
 * generateKeywords(['AI automation', 'business growth'], true);
 * // Returns: "AI automation, business growth, AI consulting, business transformation, ..."
 * ```
 */
export function generateKeywords(keywords: string[], includeDefault: boolean = true): string {
  const defaultKeywords = [
    'AI automation',
    'business growth',
    'emerging markets',
    'revenue engineering',
    'product development',
    'go-to-market strategy',
    'AI consulting',
    'business transformation',
    'digital transformation',
    'AI implementation',
    'business ecosystems',
    'growth consulting',
    'AI maturity assessment',
    'Pakistan',
    'Karachi'
  ];
  
  const allKeywords = includeDefault 
    ? [...new Set([...keywords, ...defaultKeywords])]
    : keywords;
  
  return allKeywords.join(', ');
}

/**
 * Generates organization structured data
 * 
 * @param additionalData - Additional structured data
 * @returns Organization structured data
 * 
 * @example
 * ```typescript
 * generateOrganizationSchema({
 *   service: [{ "@type": "Service", "name": "AI Assessment" }]
 * });
 * ```
 */
export function generateOrganizationSchema(additionalData: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO_CONFIG.SITE_NAME,
    alternateName: 'AGE',
    url: SEO_CONFIG.SITE_URL,
    logo: `${SEO_CONFIG.SITE_URL}/assets/age-logos/age-logo-header.png`,
    description: 'AI-powered business ecosystems for emerging markets',
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      addressCountry: SEO_CONFIG.DEFAULT_COUNTRY,
      addressRegion: SEO_CONFIG.DEFAULT_REGION,
      addressLocality: SEO_CONFIG.DEFAULT_CITY
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: SEO_CONFIG.CONTACT_EMAIL,
      telephone: '+92 302 8222054'
    },
    sameAs: Object.values(SEO_CONFIG.SOCIAL_LINKS),
    ...additionalData
  };
}

/**
 * Generates service structured data
 * 
 * @param serviceData - Service information
 * @returns Service structured data
 * 
 * @example
 * ```typescript
 * generateServiceSchema({
 *   name: 'AI Assessment',
 *   description: 'Comprehensive AI readiness assessment'
 * });
 * ```
 */
export function generateServiceSchema(serviceData: {
  name: string;
  description: string;
  price?: string;
  priceCurrency?: string;
  areaServed?: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceData.name,
    description: serviceData.description,
    provider: {
      '@type': 'Organization',
      name: SEO_CONFIG.SITE_NAME
    },
    serviceType: serviceData.name,
    areaServed: {
      '@type': 'Country',
      name: serviceData.areaServed || 'Pakistan'
    },
    offers: {
      '@type': 'Offer',
      price: serviceData.price || '0',
      priceCurrency: serviceData.priceCurrency || 'USD',
      availability: 'https://schema.org/InStock'
    },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Business professionals and organizations'
    }
  };
}

/**
 * Generates breadcrumb structured data
 * 
 * @param breadcrumbs - Breadcrumb items
 * @returns Breadcrumb structured data
 * 
 * @example
 * ```typescript
 * generateBreadcrumbSchema([
 *   { label: 'Home', href: '/' },
 *   { label: 'Services', href: '/services' },
 *   { label: 'AI Assessment', current: true }
 * ]);
 * ```
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{
  label: string;
  href?: string;
  current?: boolean;
}>): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${SEO_CONFIG.SITE_URL}${item.href}` : undefined
    }))
  };
}

/**
 * Generates FAQ structured data
 * 
 * @param faqs - FAQ items
 * @returns FAQ structured data
 * 
 * @example
 * ```typescript
 * generateFAQSchema([
 *   { question: 'What is AI automation?', answer: 'AI automation is...' }
 * ]);
 * ```
 */
export function generateFAQSchema(faqs: Array<{
  question: string;
  answer: string;
}>): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Validates SEO meta tags
 * 
 * @param metaData - Meta tag data
 * @returns Validation results
 * 
 * @example
 * ```typescript
 * validateSEOMeta({
 *   title: 'AI Assessment',
 *   description: 'Comprehensive AI readiness assessment...',
 *   keywords: 'AI, assessment, business'
 * });
 * ```
 */
export function validateSEOMeta(metaData: {
  title?: string;
  description?: string;
  keywords?: string;
}): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Validate title
  if (!metaData.title) {
    errors.push('Title is required');
  } else if (metaData.title.length > 60) {
    warnings.push('Title is longer than recommended 60 characters');
  }
  
  // Validate description
  if (!metaData.description) {
    errors.push('Description is required');
  } else if (metaData.description.length < 120) {
    warnings.push('Description is shorter than recommended 120 characters');
  } else if (metaData.description.length > 160) {
    warnings.push('Description is longer than recommended 160 characters');
  }
  
  // Validate keywords
  if (!metaData.keywords) {
    warnings.push('Keywords are recommended for better SEO');
  } else if (metaData.keywords.split(',').length > 10) {
    warnings.push('Too many keywords may be considered spam');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Generates SEO-friendly URL slug
 * 
 * @param text - Text to convert to slug
 * @returns SEO-friendly URL slug
 * 
 * @example
 * ```typescript
 * generateSlug('AI Growth Score Assessment'); // Returns: "ai-growth-score-assessment"
 * ```
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generates performance-optimized meta tags
 * 
 * @param pageData - Page data
 * @returns Performance-optimized meta tags
 * 
 * @example
 * ```typescript
 * generatePerformanceMeta({
 *   title: 'AI Assessment',
 *   description: 'Comprehensive AI readiness assessment...',
 *   image: '/og-image.jpg'
 * });
 * ```
 */
export function generatePerformanceMeta(pageData: {
  title: string;
  description: string;
  image?: string;
  url?: string;
}): Array<{ name?: string; property?: string; content: string }> {
  const canonicalUrl = pageData.url ? generateCanonicalUrl(pageData.url) : SEO_CONFIG.SITE_URL;
  const ogImage = pageData.image ? generateOgImageUrl(pageData.image) : SEO_CONFIG.DEFAULT_OG_IMAGE;
  
  return [
    // Performance and SEO Links
    { name: 'preconnect', content: 'https://fonts.googleapis.com' },
    { name: 'preconnect', content: 'https://fonts.gstatic.com' },
    { name: 'dns-prefetch', content: 'https://calendly.com' },
    { name: 'dns-prefetch', content: 'https://generativelanguage.googleapis.com' },
    { name: 'dns-prefetch', content: 'https://www.google-analytics.com' },
    
    // Canonical URL
    { name: 'canonical', content: canonicalUrl },
    
    // Open Graph
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    
    // Twitter
    { name: 'twitter:image', content: ogImage },
    
    // Performance
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'msapplication-tap-highlight', content: 'no' },
    { name: 'theme-color', content: '#0050ff' }
  ];
}

