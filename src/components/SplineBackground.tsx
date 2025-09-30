import { memo, useEffect, useRef, useState } from 'react';

const SplineBackground = memo(() => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const timeoutId: NodeJS.Timeout = setTimeout(() => {
        console.warn('⚠️ Spline iframe loading timeout');
        setIsLoading(false);
        setHasError(true);
      }, 10000); // 10 second timeout

      const handleLoad = () => {
        console.log('✅ Spline iframe loaded successfully');
        clearTimeout(timeoutId); // Clear timeout when iframe loads successfully
        setIsLoading(false);
        setHasError(false);
      };

      const handleError = () => {
        console.error('❌ Failed to load Spline iframe');
        clearTimeout(timeoutId); // Clear timeout on error
        setIsLoading(false);
        setHasError(true);
      };


      iframe.addEventListener('load', handleLoad);
      iframe.addEventListener('error', handleError);

      return () => {
        clearTimeout(timeoutId);
        iframe.removeEventListener('load', handleLoad);
        iframe.removeEventListener('error', handleError);
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
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      <iframe
        ref={iframeRef}
        src="/spline-background.html"
        className={`w-full h-full border-0 ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ease-in-out`}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
        sandbox="allow-scripts allow-pointer-lock allow-forms allow-popups"
        role="img"
        aria-label="3D interactive background"
        title="3D Spline Background"
      />
    </div>
  );
});

SplineBackground.displayName = 'SplineBackground';

export default SplineBackground;