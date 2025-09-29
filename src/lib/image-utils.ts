/**
 * @fileoverview Image Utilities - Performance and Loading Optimization
 * 
 * This module provides utilities for optimizing image loading and handling
 * image-related operations with performance considerations.
 * 
 * @module image-utils
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

/**
 * Get optimized image loading attributes based on image type
 * 
 * @param type - The type of image (hero, logo, thumbnail, background, icon)
 * @returns Object with optimized loading attributes
 */
export const getOptimizedImageAttrs = (type: string) => {
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
        fetchpriority: 'high' as const
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
        fetchpriority: 'high' as const
      };
    
    case 'thumbnail':
    default:
      return {
        loading: 'lazy' as const,
        decoding: 'async' as const,
        fetchpriority: 'low' as const
      };
  }
};

/**
 * Handle image error with fallback
 * 
 * @param event - The error event
 * @param fallbackSrc - Fallback image source
 */
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>, fallbackSrc?: string) => {
  const img = event.currentTarget;
  
  // Log error for debugging
  console.warn('Image failed to load:', img.src);
  
  // If fallback is provided and we're not already using it, try the fallback
  if (fallbackSrc && img.src !== fallbackSrc) {
    img.src = fallbackSrc;
  }
};