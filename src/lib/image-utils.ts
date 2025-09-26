/**
 * @fileoverview Image Loading Utilities - Optimized Image Loading Strategies
 * 
 * This utility provides optimized image loading strategies to prevent browser
 * intervention warnings and improve performance. It includes:
 * - Smart loading attribute selection
 * - Performance-optimized image loading
 * - Error handling and fallbacks
 * - Accessibility improvements
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 * @since 1.0.0
 */

/**
 * Determines the optimal loading strategy for images based on their position and importance
 * 
 * @param isAboveFold - Whether the image is above the fold (visible without scrolling)
 * @param isCritical - Whether the image is critical for initial page load
 * @param isLarge - Whether the image is large and should be prioritized
 * @returns Object with optimized loading attributes
 * 
 * @example
 * ```typescript
 * const { loading, decoding, fetchPriority } = getImageLoadingStrategy(true, false, false);
 * // Returns: { loading: 'eager', decoding: 'sync', fetchPriority: 'high' }
 * ```
 * 
 * @since 1.0.0
 */
export const getImageLoadingStrategy = (
  isAboveFold: boolean = false,
  isCritical: boolean = false,
  isLarge: boolean = false
) => {
  // Above-the-fold or critical images should load immediately
  if (isAboveFold || isCritical) {
    return {
      loading: 'eager' as const,
      decoding: 'sync' as const,
      fetchpriority: isLarge ? 'high' as const : 'auto' as const
    };
  }
  
  // Below-the-fold images can be lazy loaded
  return {
    loading: 'lazy' as const,
    decoding: 'async' as const,
    fetchpriority: 'low' as const
  };
};

/**
 * Creates optimized image loading attributes for different use cases
 * 
 * @param type - The type of image (hero, logo, thumbnail, etc.)
 * @returns Object with optimized loading attributes
 * 
 * @example
 * ```typescript
 * const attrs = getOptimizedImageAttrs('hero');
 * // Returns optimized attributes for hero images
 * ```
 * 
 * @since 1.0.0
 */
export const getOptimizedImageAttrs = (type: 'hero' | 'logo' | 'thumbnail' | 'background' | 'icon') => {
  switch (type) {
    case 'hero':
      return {
        loading: 'eager' as const,
        decoding: 'sync' as const,
        fetchpriority: 'high' as const
      };
    
    case 'logo':
      return {
        loading: 'eager' as const,
        decoding: 'sync' as const,
        fetchpriority: 'low' as const
      };
    
    case 'thumbnail':
      return {
        loading: 'lazy' as const,
        decoding: 'async' as const,
        fetchpriority: 'low' as const
      };
    
    case 'background':
      return {
        loading: 'lazy' as const,
        decoding: 'async' as const,
        fetchpriority: 'low' as const
      };
    
    case 'icon':
      return {
        loading: 'eager' as const,
        decoding: 'sync' as const,
        fetchpriority: 'low' as const
      };
    
    default:
      return {
        loading: 'lazy' as const,
        decoding: 'async' as const,
        fetchpriority: 'auto' as const
      };
  }
};

/**
 * Handles image loading errors gracefully with fallback strategies
 * 
 * @param event - The error event from the image
 * @param fallbackSrc - Optional fallback image source
 * @param onError - Optional custom error handler
 * 
 * @example
 * ```typescript
 * <img 
 *   src="/image.jpg"
 *   onError={(e) => handleImageError(e, '/fallback.jpg')}
 * />
 * ```
 * 
 * @since 1.0.0
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc?: string,
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void
) => {
  const target = event.target as HTMLImageElement;
  
  // Try fallback image if provided
  if (fallbackSrc && target.src !== fallbackSrc) {
    target.src = fallbackSrc;
    return;
  }
  
  // Hide broken images gracefully
  target.style.display = 'none';
  
  // Call custom error handler if provided
  if (onError) {
    onError(event);
  }
};

/**
 * Preloads critical images to improve perceived performance
 * 
 * @param imageSrc - The source URL of the image to preload
 * @param imageType - The MIME type of the image (optional)
 * 
 * @example
 * ```typescript
 * preloadCriticalImage('/hero-image.jpg', 'image/jpeg');
 * ```
 * 
 * @since 1.0.0
 */
export const preloadCriticalImage = (imageSrc: string, imageType?: string) => {
  if (typeof window === 'undefined') return; // SSR safety
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = imageSrc;
  
  if (imageType) {
    link.type = imageType;
  }
  
  document.head.appendChild(link);
};
