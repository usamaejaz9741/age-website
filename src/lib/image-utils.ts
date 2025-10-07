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
 * Returns an object with optimized loading attributes for an image based on its type.
 * This helps prioritize the loading of critical images and defer non-critical ones.
 *
 * @param {string} type - The type of image. Accepted values are 'hero', 'logo', 'thumbnail', 'background', 'icon'.
 * @returns {{loading: 'eager' | 'lazy', decoding: 'sync' | 'async', fetchpriority: 'high' | 'low'}} An object containing the `loading`, `decoding`, and `fetchpriority` attributes.
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
 * Handles image loading errors by replacing the failed image source with a fallback source.
 * It also logs a warning in development mode for debugging purposes.
 *
 * @param {React.SyntheticEvent<HTMLImageElement, Event>} event - The error event triggered by the image element.
 * @param {string} [fallbackSrc] - The URL of the fallback image to be used if the original image fails to load.
 */
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>, fallbackSrc?: string) => {
  const img = event.currentTarget;
  
  // Log error for debugging (development only)
  if (import.meta.env.DEV) {
    console.warn('Image failed to load:', img.src);
  }
  
  // If fallback is provided and we're not already using it, try the fallback
  if (fallbackSrc && img.src !== fallbackSrc) {
    img.src = fallbackSrc;
  }
};