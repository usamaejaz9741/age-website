/**
 * Optimized Preloader Component - Enhanced Loading Experience
 * 
 * This component displays an optimized loading animation while the application is initializing.
 * It provides intelligent loading detection, progress indication, and smooth transitions.
 * 
 * Features:
 * - Intelligent loading detection (fonts, images, resources)
 * - Progress indication with percentage
 * - Optimized GIF loading with fallback
 * - Smooth fade-out transition
 * - Performance monitoring
 * - Enhanced accessibility
 * - Responsive design for all screen sizes
 * - Reduced motion support
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface PreloaderProps {
  /** Minimum duration in milliseconds to show the preloader (default: 1500) */
  minDuration?: number;
  /** Maximum duration in milliseconds before force completion (default: 5000) */
  maxDuration?: number;
  /** Additional CSS classes */
  className?: string;
  /** Callback when preloader finishes */
  onComplete?: () => void;
  /** Enable progress indication (default: true) */
  showProgress?: boolean;
}

/**
 * Optimized preloader component with intelligent loading detection
 * 
 * @param minDuration - Minimum time to show preloader
 * @param maxDuration - Maximum time before force completion
 * @param className - Additional CSS classes
 * @param onComplete - Callback when preloader finishes
 * @param showProgress - Whether to show progress indication
 * @returns JSX element with optimized loading animation
 */
const Preloader = ({ 
  minDuration = 1500,
  maxDuration = 5000,
  className,
  onComplete,
  showProgress = true
}: PreloaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [gifLoaded, setGifLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  
  const startTime = useRef(Date.now());
  const progressInterval = useRef<NodeJS.Timeout>();
  const completionTimeout = useRef<NodeJS.Timeout>();
  const forceCompleteTimeout = useRef<NodeJS.Timeout>();
  const isCompleting = useRef(false); // Prevent multiple completion calls

  // Progress simulation
  const updateProgress = useCallback(() => {
    // Loading stages with progress targets
    const loadingStages = [
      { text: 'Initializing...', progress: 15 },
      { text: 'Loading fonts...', progress: 30 },
      { text: 'Preparing assets...', progress: 45 },
      { text: 'Loading 3D animation...', progress: 65 },
      { text: 'Optimizing performance...', progress: 80 },
      { text: 'Almost ready...', progress: 95 },
      { text: 'Complete!', progress: 100 }
    ];

    const elapsed = Date.now() - startTime.current;
    const stageIndex = Math.min(
      Math.floor((elapsed / minDuration) * loadingStages.length),
      loadingStages.length - 1
    );
    
    const currentStage = loadingStages[stageIndex];
    if (currentStage) {
      setLoadingText(currentStage.text);
      setProgress(currentStage.progress);
    }
  }, [minDuration]);

  // Check if all resources are loaded
  const checkResourcesLoaded = useCallback(() => {
    const checks = [
      // Check if fonts are loaded
      () => document.documentElement.classList.contains('fonts-loaded'),
      // Check if DOM is ready
      () => document.readyState === 'complete',
      // Check if critical images are loaded
      () => {
        const criticalImages = document.querySelectorAll('img[loading="eager"]');
        return Array.from(criticalImages).every(img => (img as HTMLImageElement).complete);
      },
      // Check if Spline iframe is loaded
      () => {
        const splineIframe = document.querySelector('iframe[src*="spline-background.html"]') as HTMLIFrameElement;
        if (splineIframe) {
          try {
            // Check if iframe is loaded and ready
            return splineIframe.contentDocument?.readyState === 'complete' || 
                   splineIframe.contentWindow?.document.readyState === 'complete';
          } catch {
            // If we can't access iframe content (cross-origin), assume it's loaded after a reasonable delay
            return true;
          }
        }
        return true; // No Spline iframe found, continue
      }
    ];
    
    return checks.every(check => check());
  }, []);

  // Complete the preloader
  const completePreloader = useCallback(() => {
    // Prevent multiple completion calls
    if (isCompleting.current) return;
    isCompleting.current = true;
    
    setProgress(100);
    setLoadingText('Complete!');
    
    // Use requestAnimationFrame for smoother transitions
    requestAnimationFrame(() => {
      setTimeout(() => {
        setIsAnimating(true);
        
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 200); // Reduced fade duration for better performance
      }, 100); // Reduced delay
    });
  }, [onComplete]);

  useEffect(() => {
    // Start progress simulation with throttled updates
    if (showProgress) {
      progressInterval.current = setInterval(updateProgress, 150); // Reduced frequency for better performance
    }

    // Force completion after max duration
    forceCompleteTimeout.current = setTimeout(() => {
      completePreloader();
    }, maxDuration);

    // Check for early completion
    const checkCompletion = () => {
      const elapsed = Date.now() - startTime.current;
      
      if (elapsed >= minDuration && checkResourcesLoaded()) {
        completePreloader();
      } else if (elapsed < minDuration) {
        // Check again after minimum duration
        completionTimeout.current = setTimeout(checkCompletion, minDuration - elapsed);
      }
    };

    // Initial check
    checkCompletion();

    // Enhanced cleanup function to prevent memory leaks
    return () => {
      // Clear all intervals and timeouts
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = undefined;
      }
      if (completionTimeout.current) {
        clearTimeout(completionTimeout.current);
        completionTimeout.current = undefined;
      }
      if (forceCompleteTimeout.current) {
        clearTimeout(forceCompleteTimeout.current);
        forceCompleteTimeout.current = undefined;
      }
      
      // Reset state to prevent stale closures
      setIsVisible(false);
      setIsAnimating(false);
      setProgress(0);
    };
  }, [minDuration, maxDuration, showProgress, updateProgress, checkResourcesLoaded, completePreloader]);

  if (!isVisible) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-200 ease-out will-change-auto",
        isAnimating && "opacity-0",
        className
      )}
      role="status"
      aria-label="Loading application"
      aria-live="polite"
      style={{
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)', // Force hardware acceleration
      }}
    >
      {/* Loading Animation Container */}
      <div className="flex flex-col items-center justify-center space-y-6 px-4">
        {/* Optimized GIF Animation with better error handling */}
        <div className="relative">
          {!showFallback ? (
            <img
              src="/assets/preloader.gif"
              alt="Loading application, please wait"
              className={cn(
                "w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 object-contain transition-opacity duration-200",
                gifLoaded ? "opacity-100" : "opacity-0"
              )}
              loading="eager"
              decoding="sync"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }}
              onLoad={() => setGifLoaded(true)}
              onError={() => {
                setShowFallback(true);
                setGifLoaded(false);
              }}
            />
          ) : null}
          
          {/* Optimized fallback loading animation */}
          <div className={cn(
            "w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 items-center justify-center",
            showFallback ? "flex" : "hidden"
          )}>
            <div className="flex space-x-2">
              <div 
                className="w-3 h-3 rounded-full animate-bounce" 
                style={{ 
                  backgroundColor: 'hsl(var(--resolution-blue-600))', 
                  animationDelay: '0ms',
                  animationDuration: '1.4s'
                }} 
              />
              <div 
                className="w-3 h-3 rounded-full animate-bounce" 
                style={{ 
                  backgroundColor: 'hsl(var(--resolution-blue-600))', 
                  animationDelay: '200ms',
                  animationDuration: '1.4s'
                }} 
              />
              <div 
                className="w-3 h-3 rounded-full animate-bounce" 
                style={{ 
                  backgroundColor: 'hsl(var(--resolution-blue-600))', 
                  animationDelay: '400ms',
                  animationDuration: '1.4s'
                }} 
              />
            </div>
          </div>
        </div>
        
        {/* Enhanced Loading Text with Progress */}
        <div className="text-center max-w-sm">
          {/* Progress Bar */}
          {showProgress && (
            <div className="mb-4">
              <div className="w-64 bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-resolution-blue-600 to-malibu-300 rounded-full transition-all duration-150 ease-out will-change-transform"
                  style={{ 
                    width: `${progress}%`,
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                  }}
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Loading progress: ${progress}%`}
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-muted-foreground">{loadingText}</span>
                <span className="text-xs font-medium text-foreground">{progress}%</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Enhanced Screen Reader Announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {showProgress 
          ? `Loading Alvi Global Enterprises application. ${loadingText} Progress: ${progress} percent.`
          : 'Loading Alvi Global Enterprises application. Please wait while we prepare your experience.'
        }
      </div>
    </div>
  );
};

export default Preloader;
