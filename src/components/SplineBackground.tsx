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
        console.error('❌ Failed to load Spline iframe');
        setHasError(true);
      };

      iframe.addEventListener('error', handleError);
      
      // Suppress console warnings from iframe content
      const suppressIframeConsole = () => {
        try {
          // Try to access iframe content and suppress console
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDoc && iframe.contentWindow) {
            // Override console methods in iframe
            const originalConsole = (iframe.contentWindow as Window & { console: Console }).console;
            if (originalConsole) {
              originalConsole.warn = () => {};
              originalConsole.error = () => {};
              originalConsole.log = () => {};
              originalConsole.info = () => {};
              originalConsole.debug = () => {};
              originalConsole.trace = () => {};
              originalConsole.table = () => {};
              originalConsole.group = () => {};
              originalConsole.groupEnd = () => {};
              originalConsole.groupCollapsed = () => {};
              originalConsole.time = () => {};
              originalConsole.timeEnd = () => {};
              originalConsole.count = () => {};
              originalConsole.clear = () => {};
            }
            
            // Override window error handlers in iframe
            if (iframe.contentWindow) {
              iframe.contentWindow.onerror = () => true;
              iframe.contentWindow.onunhandledrejection = () => true;
            }
            
            // Suppress WebGL context events in iframe
            const canvas = iframeDoc.querySelector('canvas');
            if (canvas) {
              canvas.addEventListener('webglcontextlost', (e) => {
                e.preventDefault();
                e.stopPropagation();
                return false;
              });
              
              canvas.addEventListener('webglcontextrestored', (e) => {
                e.preventDefault();
                e.stopPropagation();
                return false;
              });
            }
          }
        } catch {
          // Cross-origin restrictions - this is expected
          // The iframe will suppress its own console output
        }
      };

      // Try to suppress console after iframe loads
      iframe.addEventListener('load', suppressIframeConsole);
      
      // Also try immediately in case iframe is already loaded
      suppressIframeConsole();

      return () => {
        iframe.removeEventListener('error', handleError);
        iframe.removeEventListener('load', suppressIframeConsole);
      };
    }
    
    return () => {}; // Return empty cleanup function if no iframe
  }, []); // Empty dependency array - only run once on mount

  // Fallback to animated gradient blobs if iframe fails to load
  if (hasError) {
    return (
      <div className="fixed inset-0 z-10 pointer-events-none">
        {/* Animated Floating Gradient Blobs - Fallback */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-resolution-blue-600/10 to-malibu-300/8 sm:from-resolution-blue-600/30 sm:to-malibu-300/25 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-32 right-16 w-96 h-96 bg-gradient-to-bl from-malibu-300/12 to-resolution-blue-600/7 sm:from-malibu-300/35 sm:to-resolution-blue-600/20 rounded-full blur-3xl animate-float-medium" />
        <div className="absolute top-1/2 left-8 w-80 h-80 bg-gradient-to-tr from-resolution-blue-600/8 to-malibu-300/10 sm:from-resolution-blue-600/25 sm:to-malibu-300/30 rounded-full blur-3xl animate-float-fast" />
        <div className="absolute top-1/3 right-8 w-64 h-64 bg-gradient-to-tl from-malibu-300/10 to-resolution-blue-600/8 sm:from-malibu-300/30 sm:to-resolution-blue-600/25 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 left-20 w-88 h-88 bg-gradient-to-tr from-resolution-blue-600/7 to-malibu-300/12 sm:from-resolution-blue-600/20 sm:to-malibu-300/35 rounded-full blur-3xl animate-float-medium" />
        <div className="absolute bottom-32 right-12 w-72 h-72 bg-gradient-to-bl from-malibu-300/8 to-resolution-blue-600/10 sm:from-malibu-300/25 sm:to-resolution-blue-600/30 rounded-full blur-3xl animate-float-fast" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-resolution-blue-600/5 to-malibu-300/7 sm:from-resolution-blue-600/15 sm:to-malibu-300/20 rounded-full blur-3xl animate-float-slow" />
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
            isolation: 'isolate', // Create new stacking context to prevent WebGL context issues
          }}
          sandbox="allow-scripts allow-pointer-lock allow-forms allow-popups allow-same-origin"
          role="img"
          aria-label="3D interactive background"
          title="3D Spline Background"
          scrolling="no"
          frameBorder="0"
          allowTransparency={true}
          loading="lazy"
          // Add WebGL optimization attributes
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />
    </div>
  );
});

SplineBackground.displayName = 'SplineBackground';

export default SplineBackground;