import { memo, useEffect, useRef, useState } from 'react';

/**
 * @fileoverview Spline 3D Background Component
 * 
 * This component renders a 3D interactive background using Spline.
 * 
 * IMPORTANT: WebGL and iframe warnings in the console are EXPECTED and NORMAL.
 * These warnings come from:
 * - WebGL context initialization and rendering cycles
 * - iframe sandbox security validation
 * - Hardware acceleration and GPU driver interactions
 * 
 * These warnings do NOT affect functionality and can be safely ignored.
 * They are part of the browser's native WebGL and security systems.
 * 
 * @component
 * @example
 * ```tsx
 * <SplineBackground />
 * ```
 * 
 * @features
 * - 3D interactive background animation
 * - Automatic fallback to gradient blobs on error
 * - Optimized WebGL context management
 * - Cross-origin security compliance
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 * @since 1.0.0
 */
const SplineBackground = memo(() => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const handleError = () => {
        if (import.meta.env.DEV) {
          console.error('❌ Failed to load Spline iframe');
        }
        setHasError(true);
      };

      iframe.addEventListener('error', handleError);

      return () => {
        iframe.removeEventListener('error', handleError);
      };
    }
    
    return () => {}; // Return empty cleanup function if no iframe
  }, []); // Empty dependency array - only run once on mount

  // Fallback to animated gradient blobs if iframe fails to load
  if (hasError) {
    return (
      <div className="fixed inset-0 z-10 pointer-events-none" style={{ willChange: 'auto' }}>
        {/* Animated Floating Gradient Blobs - Fallback (optimized for performance) */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-resolution-blue-600/10 to-malibu-300/8 sm:from-resolution-blue-600/30 sm:to-malibu-300/25 rounded-full blur-2xl animate-float-slow" style={{ willChange: 'transform' }} />
        <div className="absolute top-32 right-16 w-96 h-96 bg-gradient-to-bl from-malibu-300/12 to-resolution-blue-600/7 sm:from-malibu-300/35 sm:to-resolution-blue-600/20 rounded-full blur-2xl animate-float-medium" style={{ willChange: 'transform' }} />
        <div className="absolute bottom-20 left-20 w-88 h-88 bg-gradient-to-tr from-resolution-blue-600/7 to-malibu-300/12 sm:from-resolution-blue-600/20 sm:to-malibu-300/35 rounded-full blur-2xl animate-float-fast" style={{ willChange: 'transform' }} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-10">
        <iframe
          ref={iframeRef}
          src="/spline-background.html"
          className="w-full h-full border-0 opacity-100"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            border: 'none',
            outline: 'none',
            margin: 0,
            padding: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'transparent',
            isolation: 'isolate',
            willChange: 'auto',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            pointerEvents: 'auto',
          }}
          sandbox="allow-scripts allow-pointer-lock allow-forms allow-popups allow-same-origin"
          role="img"
          aria-label="3D interactive background"
          title="3D Spline Background"
          scrolling="no"
          frameBorder="0"
          allowTransparency={true}
          loading="eager"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />
    </div>
  );
});

SplineBackground.displayName = 'SplineBackground';

export default SplineBackground;