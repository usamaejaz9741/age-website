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
  /** The source URL for the image. */
  src: string;
  /** The alternative text for the image, crucial for accessibility. */
  alt: string;
  /** Defines the image type to apply an appropriate loading strategy.
   * 'hero' and 'logo' are loaded eagerly, while others are lazy-loaded. */
  type?: 'hero' | 'logo' | 'thumbnail' | 'background' | 'icon';
  /** The URL of a fallback image to display if the primary `src` fails to load. */
  fallbackSrc?: string;
  /** An object to manually override the default loading strategy determined by the `type` prop. */
  loadingStrategy?: {
    loading: 'eager' | 'lazy';
    decoding: 'sync' | 'async';
    fetchpriority: 'high' | 'low' | 'auto';
  };
  /** If `true`, a skeleton loader will be displayed while the image is loading. */
  showSkeleton?: boolean;
  /** Custom CSS classes to apply to the skeleton loader element. */
  skeletonClassName?: string;
}

/**
 * A performance-optimized image component that handles loading strategies, fallbacks, and loading states.
 *
 * This component wraps the standard `img` element to provide enhanced functionality:
 * - It automatically determines the best loading attributes (`loading`, `decoding`, `fetchpriority`) based on the image `type`.
 * - It displays a skeleton loader while the image is loading.
 * - It gracefully handles image loading errors by displaying a fallback image.
 *
 * @param {OptimizedImageProps} props - The properties for the component.
 * @param {React.Ref<HTMLImageElement>} ref - A ref to be forwarded to the underlying `img` element.
 * @returns {JSX.Element} An optimized image element with loading and error handling.
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
    ...props
  }, ref) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);

    // Get optimized loading attributes
    const optimizedAttrs = loadingStrategy || getOptimizedImageAttrs(type);

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
              "absolute inset-0 bg-muted animate-pulse rounded",
              skeletonClassName
            )}
            aria-hidden="true"
          />
        )}
        
        {/* Optimized image */}
        <img
          ref={ref}
          src={currentSrc}
          alt={alt}
          className={cn(
            "transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100",
            hasError && currentSrc === fallbackSrc ? "opacity-60" : "",
            className
          )}
          {...optimizedAttrs}
          onLoad={handleLoad}
          onError={handleImageErrorEvent}
          {...props}
        />
        
        {/* Error state indicator */}
        {hasError && currentSrc === fallbackSrc && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded"
            aria-label="Image failed to load"
          >
            <svg 
              className="w-8 h-8 text-muted-foreground" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
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
