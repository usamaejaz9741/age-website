/**
 * @fileoverview OptimizedImage Component - Performance-Optimized Image Loading
 * 
 * A wrapper component that provides optimized image loading with automatic
 * loading strategies, error handling, and accessibility features.
 * 
 * @component
 * @example
 * ```tsx
 * <OptimizedImage 
 *   src="/hero-image.jpg" 
 *   alt="Hero image" 
 *   type="hero" 
 *   className="w-full h-64"
 * />
 * ```
 * 
 * @features
 * - 🚀 Automatic loading strategy based on image type
 * - 🛡️ Graceful error handling with fallback images
 * - ♿ Full accessibility support
 * - 📱 Responsive image loading
 * - 🎨 Customizable styling and dimensions
 * - ⚡ Performance optimizations
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

import { useState, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { getOptimizedImageAttrs, handleImageError } from '@/lib/image-utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Image type for optimization strategy */
  type?: 'hero' | 'logo' | 'thumbnail' | 'background' | 'icon';
  /** Fallback image source */
  fallbackSrc?: string;
  /** Custom loading strategy */
  loadingStrategy?: {
    loading: 'eager' | 'lazy';
    decoding: 'sync' | 'async';
    fetchpriority: 'high' | 'low' | 'auto';
  };
  /** Show loading skeleton */
  showSkeleton?: boolean;
  /** Skeleton className */
  skeletonClassName?: string;
  /** Enable WebP format with fallback (default: true) */
  useWebP?: boolean;
  /** Responsive srcset for different screen sizes */
  sizes?: string;
}

/**
 * OptimizedImage Component
 * 
 * Provides optimized image loading with automatic strategies, error handling,
 * and accessibility features. Automatically applies the best loading strategy
 * based on the image type and position.
 * 
 * @param props - Component props
 * @returns JSX element with optimized image
 */
const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({
    src,
    alt,
    type = 'thumbnail',
    fallbackSrc = '/placeholder.svg',
    loadingStrategy,
    showSkeleton = true,
    skeletonClassName,
    className,
    onError,
    useWebP = true,
    sizes,
    ...props
  }, ref) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);

    // Get optimized loading attributes
    const optimizedAttrs = loadingStrategy || getOptimizedImageAttrs(type);

    // Generate WebP source if enabled and source is not already WebP
    const webpSrc = useWebP && !src.endsWith('.webp') && !src.endsWith('.svg')
      ? src.replace(/\.(jpg|jpeg|png)$/i, '.webp')
      : null;

    // Handle image load
    const handleLoad = () => {
      setIsLoading(false);
      setHasError(false);
    };

    // Handle image error with fallback
    const handleImageErrorEvent = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setIsLoading(false);
      setHasError(true);
      
      // Try fallback image if not already using it
      if (currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
        setHasError(false);
        setIsLoading(true);
      }
      
      // Call custom error handler if provided
      if (onError) {
        onError(event);
      }
      
      // Use utility function for additional error handling
      handleImageError(event, fallbackSrc);
    };

    return (
      <div className="relative inline-block">
        {/* Loading skeleton */}
        {isLoading && showSkeleton && (
          <div 
            className={cn(
              "absolute inset-0 bg-muted/10 animate-pulse rounded",
              skeletonClassName
            )}
            aria-hidden="true"
          />
        )}
        
        {/* Optimized image with WebP support */}
        <picture>
          {/* Modern WebP format for supported browsers */}
          {webpSrc && (
            <source 
              srcSet={webpSrc}
              type="image/webp"
              sizes={sizes}
            />
          )}
          
          {/* Fallback to original format */}
          <img
            ref={ref}
            src={currentSrc}
            alt={alt}
            className={cn(
              "transition-opacity duration-300 ease-out",
              isLoading ? "opacity-0 scale-105" : "opacity-100 scale-100",
              hasError && currentSrc === fallbackSrc ? "opacity-60 grayscale" : "",
              className
            )}
            {...optimizedAttrs}
            sizes={sizes}
            onLoad={handleLoad}
            onError={handleImageErrorEvent}
            {...props}
          />
        </picture>
        
        {/* Error state indicator */}
        {hasError && currentSrc === fallbackSrc && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded backdrop-blur-sm"
            aria-label="Image failed to load"
          >
            <svg 
              className="w-8 h-8 text-muted-foreground" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
          </div>
        )}
      </div>
    );
  }
);

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
