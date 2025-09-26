/**
 * @fileoverview SEO Configuration - Centralized SEO Settings
 * 
 * This module provides centralized SEO configuration for the entire application.
 * It includes default meta tags, structured data templates, and SEO constants
 * that ensure consistency across all pages.
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 * @since 1.0.0
 */

/**
 * Default SEO configuration for all pages
 */
export const DEFAULT_SEO_CONFIG = {
  siteName: 'Alvi Global Enterprises',
  siteUrl: 'https://alviglobal.com',
  defaultTitle: 'Alvi Global Enterprises - AI-Powered Business Solutions',
  defaultDescription: 'Transform your business with AI automation, product engineering, and growth strategies. Expert solutions for emerging markets with proven results.',
  defaultKeywords: [
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
    'Karachi',
    'ITCN Asia 2025'
  ],
  defaultOgImage: 'https://alviglobal.com/og-image.jpg',
  twitterHandle: '@AlviGlobalEnt',
  locale: 'en_US',
  country: 'PK',
  region: 'Sindh',
  city: 'Karachi',
  contactEmail: 'hello@alviglobal.com',
  socialLinks: {
    twitter: 'https://twitter.com/AlviGlobalEnt',
    linkedin: 'https://linkedin.com/company/alvi-global-enterprises'
  }
} as const;

/**
 * Page-specific SEO configurations
 */
export const PAGE_SEO_CONFIG = {
  home: {
    title: 'Alvi Global Enterprises - AI-Powered Business Solutions',
    description: 'Transform your business with AI automation, product engineering, and growth strategies. Expert solutions for emerging markets with proven results.',
    keywords: [
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
      'Karachi',
      'ITCN Asia 2025'
    ],
    ogImage: 'https://alviglobal.com/og-image.jpg',
    canonicalUrl: 'https://alviglobal.com',
    pageType: 'WebPage' as const
  },
  
  aiGrowthScore: {
    title: 'AI Growth Score Assessment',
    description: 'Discover your AI maturity level with our comprehensive 3-minute assessment across strategy, implementation, data, and culture dimensions.',
    keywords: [
      'AI assessment',
      'AI maturity',
      'AI readiness',
      'AI growth score',
      'AI strategy',
      'AI implementation',
      'AI culture',
      'AI data',
      'business transformation',
      'AI consulting',
      'digital transformation',
      'AI evaluation',
      'AI benchmarking',
      'AI roadmap',
      'AI planning'
    ],
    ogImage: 'https://alviglobal.com/og-image-ai-assessment.jpg',
    canonicalUrl: 'https://alviglobal.com/ai-growth-score',
    pageType: 'Service' as const
  },
  
  notFound: {
    title: 'Page Not Found - Alvi Global Enterprises',
    description: 'The page you\'re looking for doesn\'t exist. Navigate back to our homepage or contact support.',
    keywords: [
      '404',
      'page not found',
      'error',
      'Alvi Global Enterprises',
      'AI automation',
      'business solutions'
    ],
    ogImage: 'https://alviglobal.com/og-image.jpg',
    canonicalUrl: 'https://alviglobal.com/404',
    pageType: 'WebPage' as const,
    robots: 'noindex, nofollow'
  }
} as const;

/**
 * Service-specific SEO configurations
 */
export const SERVICE_SEO_CONFIG = {
  aiAutomation: {
    title: 'AI Automation Services',
    description: 'AI-powered automation solutions for business processes. Streamline operations, reduce costs, and increase efficiency with our AI automation services.',
    keywords: [
      'AI automation',
      'business process automation',
      'workflow automation',
      'AI implementation',
      'process optimization',
      'efficiency improvement'
    ],
    ogImage: 'https://alviglobal.com/og-image-ai-automation.jpg',
    canonicalUrl: 'https://alviglobal.com/services/ai-automation',
    pageType: 'Service' as const
  },
  
  productEngineering: {
    title: 'Product Engineering Services',
    description: 'Full-stack product development and engineering services. From concept to deployment, we build scalable, high-performance products for emerging markets.',
    keywords: [
      'product engineering',
      'software development',
      'full-stack development',
      'product development',
      'engineering services',
      'scalable products'
    ],
    ogImage: 'https://alviglobal.com/og-image-product-engineering.jpg',
    canonicalUrl: 'https://alviglobal.com/services/product-engineering',
    pageType: 'Service' as const
  },
  
  growthConsulting: {
    title: 'Growth Consulting Services',
    description: 'Go-to-market strategy and business growth consulting. Accelerate your growth with data-driven strategies and proven methodologies.',
    keywords: [
      'growth consulting',
      'go-to-market strategy',
      'business growth',
      'growth strategy',
      'market expansion',
      'business development'
    ],
    ogImage: 'https://alviglobal.com/og-image-growth-consulting.jpg',
    canonicalUrl: 'https://alviglobal.com/services/growth-consulting',
    pageType: 'Service' as const
  }
} as const;

/**
 * Default structured data templates
 */
export const STRUCTURED_DATA_TEMPLATES = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: DEFAULT_SEO_CONFIG.siteName,
    alternateName: 'AGE',
    url: DEFAULT_SEO_CONFIG.siteUrl,
    logo: `${DEFAULT_SEO_CONFIG.siteUrl}/assets/age-logos/age-logo-header.png`,
    description: 'AI-powered business ecosystems for emerging markets',
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      addressCountry: DEFAULT_SEO_CONFIG.country,
      addressRegion: DEFAULT_SEO_CONFIG.region,
      addressLocality: DEFAULT_SEO_CONFIG.city
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: DEFAULT_SEO_CONFIG.contactEmail
    },
    sameAs: Object.values(DEFAULT_SEO_CONFIG.socialLinks)
  },
  
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: DEFAULT_SEO_CONFIG.siteName,
    url: DEFAULT_SEO_CONFIG.siteUrl,
    description: 'AI-powered business ecosystems for emerging markets',
    publisher: {
      '@type': 'Organization',
      name: DEFAULT_SEO_CONFIG.siteName
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${DEFAULT_SEO_CONFIG.siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  },
  
  service: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: {
      '@type': 'Organization',
      name: DEFAULT_SEO_CONFIG.siteName
    },
    areaServed: {
      '@type': 'Country',
      name: 'Pakistan'
    },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Business professionals and organizations'
    }
  }
} as const;

/**
 * Default meta tags for all pages
 */
export const DEFAULT_META_TAGS = [
  { name: 'author', content: DEFAULT_SEO_CONFIG.siteName },
  { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
  { name: 'googlebot', content: 'index, follow' },
  { name: 'bingbot', content: 'index, follow' },
  { name: 'language', content: 'en' },
  { name: 'revisit-after', content: '7 days' },
  { name: 'distribution', content: 'global' },
  { name: 'rating', content: 'general' },
  { name: 'geo.region', content: DEFAULT_SEO_CONFIG.country },
  { name: 'geo.country', content: 'Pakistan' },
  { name: 'geo.placename', content: DEFAULT_SEO_CONFIG.city },
  { name: 'format-detection', content: 'telephone=no' },
  { name: 'msapplication-tap-highlight', content: 'no' },
  { name: 'theme-color', content: '#0050ff' },
  { name: 'apple-mobile-web-app-capable', content: 'yes' },
  { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
  { name: 'apple-mobile-web-app-title', content: DEFAULT_SEO_CONFIG.siteName }
] as const;

/**
 * Performance optimization links
 */
export const PERFORMANCE_LINKS = [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  { rel: 'dns-prefetch', href: 'https://calendly.com' },
  { rel: 'dns-prefetch', href: 'https://generativelanguage.googleapis.com' },
  { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' }
] as const;

/**
 * Open Graph default properties
 */
export const DEFAULT_OG_PROPERTIES = {
  type: 'website',
  site_name: DEFAULT_SEO_CONFIG.siteName,
  locale: DEFAULT_SEO_CONFIG.locale
} as const;

/**
 * Twitter Card default properties
 */
export const DEFAULT_TWITTER_PROPERTIES = {
  card: 'summary_large_image',
  site: DEFAULT_SEO_CONFIG.twitterHandle,
  creator: DEFAULT_SEO_CONFIG.twitterHandle
} as const;

/**
 * Get SEO configuration for a specific page
 * 
 * @param pageKey - Page key from PAGE_SEO_CONFIG
 * @returns SEO configuration for the page
 * 
 * @example
 * ```typescript
 * const homeSeo = getPageSEOConfig('home');
 * const aiSeo = getPageSEOConfig('aiGrowthScore');
 * ```
 */
export function getPageSEOConfig(pageKey: keyof typeof PAGE_SEO_CONFIG) {
  return PAGE_SEO_CONFIG[pageKey];
}

/**
 * Get SEO configuration for a specific service
 * 
 * @param serviceKey - Service key from SERVICE_SEO_CONFIG
 * @returns SEO configuration for the service
 * 
 * @example
 * ```typescript
 * const aiAutomationSeo = getServiceSEOConfig('aiAutomation');
 * ```
 */
export function getServiceSEOConfig(serviceKey: keyof typeof SERVICE_SEO_CONFIG) {
  return SERVICE_SEO_CONFIG[serviceKey];
}

/**
 * Generate comprehensive SEO props for PageTemplate
 * 
 * @param pageKey - Page key from PAGE_SEO_CONFIG
 * @param customProps - Custom props to override defaults
 * @returns Complete SEO props for PageTemplate
 * 
 * @example
 * ```typescript
 * const seoProps = generateSEOProps('home', {
 *   customMeta: [{ name: 'custom-tag', content: 'custom-value' }]
 * });
 * ```
 */
export function generateSEOProps(
  pageKey: keyof typeof PAGE_SEO_CONFIG,
  customProps: Record<string, unknown> = {}
) {
  const pageConfig = getPageSEOConfig(pageKey);
  
  return {
    pageTitle: pageConfig.title,
    pageDescription: pageConfig.description,
    pageKeywords: pageConfig.keywords.join(', '),
    canonicalUrl: pageConfig.canonicalUrl,
    ogImage: pageConfig.ogImage,
    twitterCard: 'summary_large_image' as const,
    pageType: pageConfig.pageType,
    customMeta: [
      ...DEFAULT_META_TAGS,
      ...(pageConfig.robots ? [{ name: 'robots', content: pageConfig.robots }] : []),
      ...(customProps.customMeta || [])
    ],
    ...customProps
  };
}

