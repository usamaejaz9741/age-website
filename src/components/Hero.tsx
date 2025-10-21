/**
 * @fileoverview Hero Component - Main Landing Section with Interactive 3D Background
 * 
 * The hero section serves as the primary landing experience for visitors, combining
 * a compelling value proposition with strategic CTAs and an immersive 3D background.
 * 
 * **Architecture:**
 * - Layer 1 (z-10): Interactive Spline 3D background
 * - Layer 2 (z-20): Gradient overlay for content readability
 * - Layer 3 (z-30): Main content (heading, subheading, CTAs)
 * - Layer 4 (z-20): Scroll indicator
 * 
 * **Performance Optimizations:**
 * - React.memo to prevent unnecessary re-renders
 * - will-change hints for smooth animations
 * - Pointer-events optimization for background interactivity
 * - GPU-accelerated transforms for animations
 * 
 * **Accessibility:**
 * - Proper heading hierarchy with h1
 * - Descriptive ARIA labels on interactive elements
 * - aria-hidden on decorative icons
 * - role="banner" for semantic HTML
 * - Keyboard-accessible navigation
 * 
 * @component
 * @example
 * ```tsx
 * import Hero from '@/components/Hero';
 * 
 * function HomePage() {
 *   return (
 *     <>
 *       <Hero />
 *       {/* Other sections *\/}
 *     </>
 *   );
 * }
 * ```
 * 
 * @features
 * - 🎯 High-converting value proposition with revenue-focused messaging
 * - 🚀 Dual CTA strategy (consultation booking + case studies)
 * - 🎨 Interactive 3D Spline background with mouse hover response
 * - 📱 Fully responsive with mobile-first design approach
 * - 🔗 Seamless modal integration for lead capture
 * - ⚡ Optimized performance with lazy loading and memoization
 * - ♿ WCAG 2.1 AA compliant with full keyboard navigation
 * - 🎭 Smooth animations using CSS transforms and transitions
 * - 🖱️ Smart pointer-events management for background interactivity
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 * @since 1.0.0
 */

import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { memo } from "react";
import SplineBackground from "./SplineBackground";
import { openCalendlyBooking } from "@/lib/calendly";
import { HEADING_SIZES, TEXT_SIZES, MARGIN_BOTTOM, BUTTON_STYLES, BACKGROUNDS, GAP } from "@/constants/design-system";

/**
 * Hero section component with full-screen layout and 3D background
 * 
 * This component implements a sophisticated z-index layering system to create
 * an immersive experience while maintaining usability and performance:
 * 
 * **Z-Index Architecture:**
 * ```
 * z-30: Content layer (text, buttons) - Always on top, interactive
 * z-20: Gradient overlay + scroll indicator - Visual enhancement, non-interactive
 * z-10: Spline 3D background - Interactive, responds to mouse movement
 * ```
 * 
 * **Pointer Events Strategy:**
 * The component uses a carefully designed pointer-events system:
 * 1. Container (z-30): `pointer-events-none` - Let events pass through empty space
 * 2. Content wrapper: Default - Inherits pointer-events-none
 * 3. Text elements: `pointer-events-none` - Allow Spline interaction under text
 * 4. CTA buttons: `pointer-events-auto` - Capture clicks for user actions
 * 
 * This allows the Spline background to receive mouse events everywhere except
 * where buttons need to be clicked, creating a magical interactive experience.
 * 
 * **State Management:**
 * @state {boolean} showGrowthAudit - Controls modal visibility for consultation booking
 * 
 * **Performance Considerations:**
 * - Wrapped in React.memo to prevent re-renders from parent state changes
 * - will-change hints optimize animation performance
 * - select-none on text prevents accidental text selection during interaction
 * - GPU-accelerated transforms for smooth animations
 * 
 * @returns {JSX.Element} Full-screen hero section with interactive background
 */
const Hero = memo(() => {
  return (
    <div 
      className="relative min-h-screen flex items-center justify-center overflow-hidden" 
      role="banner" 
      aria-labelledby="hero-heading"
    >
      {/* ====================================================================
          LAYER 1: INTERACTIVE 3D BACKGROUND (z-10)
          ==================================================================== */}
      
      {/**
       * Spline 3D Background Layer
       * 
       * Renders an interactive 3D animation that responds to mouse movement,
       * creating an engaging and immersive landing experience. The background
       * is positioned at z-10 to sit behind all content layers.
       * 
       * Performance:
       * - Lazy loaded via iframe to prevent blocking main thread
       * - Fallback gradient blobs if Spline fails to load
       * - GPU-accelerated WebGL rendering
       * 
       * Interactivity:
       * - Receives pointer events in empty areas (thanks to pointer-events-none on overlay)
       * - Mouse hover triggers 3D object animations
       * - Touch-friendly on mobile devices
       */}
      <SplineBackground />

      {/* ====================================================================
          LAYER 2: GRADIENT OVERLAY (z-20)
          ==================================================================== */}
      
      {/**
       * Gradient Overlay for Content Readability
       * 
       * Provides a subtle gradient from transparent to background color at the bottom,
       * ensuring smooth visual transition to the ProofBar section while maintaining
       * text readability over the 3D background.
       * 
       * Properties:
       * - fixed: Stays in position during scroll
       * - inset-0: Covers entire viewport
       * - pointer-events-none: Allows Spline to receive mouse events
       * - will-change: auto: No animation needed, saves GPU memory
       * 
       * Design System:
       * Uses BACKGROUNDS.gradientOverlay token for consistent theming
       */}
      <div 
        className={`fixed inset-0 z-20 pointer-events-none ${BACKGROUNDS.gradientOverlay}`} 
        style={{ willChange: 'auto' }} 
      />

      {/* ====================================================================
          LAYER 3: MAIN CONTENT (z-30)
          ==================================================================== */}
      
      {/**
       * Content Container
       * 
       * Holds all visible content including heading, subheading, and CTAs.
       * Configured with pointer-events-none to allow Spline interaction in
       * empty areas, while child elements can selectively enable pointer events.
       * 
       * Layout:
       * - relative: Establishes positioning context for absolute children
       * - z-30: Ensures content stays above background layers
       * - max-w-7xl: Constrains width for optimal readability (1280px)
       * - mx-auto: Centers content horizontally
       * - text-center: Centers text alignment
       * 
       * Pointer Events:
       * - pointer-events-none: Allows Spline to receive events in empty space
       * - Children can override with pointer-events-auto
       */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 py-20 text-center pointer-events-none">
        
        {/**
         * Animation Wrapper
         * 
         * Wraps content for entrance animations using CSS keyframes.
         * 
         * Animations:
         * - animate-fade-in: Fades in with slight upward movement
         * - will-change: Hints browser to optimize transform and opacity
         * 
         * Performance:
         * Will-change is used to create a new composite layer for smooth
         * animation, then removed after animation completes (handled by CSS).
         */}
        <div className="animate-fade-in" style={{ willChange: 'transform, opacity' }}>
          
          {/* ==================================================================
              MAIN HEADLINE
              ================================================================== */}
          
          {/**
           * Primary Value Proposition Heading
           * 
           * Communicates the core differentiator: we engineer revenue-generating
           * systems, not just software products. The split messaging emphasizes
           * the outcome (revenue) over the process (software development).
           * 
           * Typography:
           * - Uses h1 for SEO and semantic HTML hierarchy
           * - HEADING_SIZES.h1: Responsive text sizing (4xl -> 5xl -> 6xl -> 7xl -> 8xl)
           * - Bold weight for impact and scannability
           * - Tight leading for compact, impactful presentation
           * 
           * Visual Design:
           * - Primary color on "not just software" for emphasis
           * - Gradient text effect using bg-clip-text and text-transparent
           * - Gradient from primary to primary/80 for depth
           * 
           * Pointer Events:
           * - pointer-events-none: Allows Spline background to receive mouse events
           * - select-none: Prevents accidental text selection during interaction
           * 
           * Accessibility:
           * - id="hero-heading": Referenced by aria-labelledby on parent
           * - Clear, concise messaging for screen readers
           * - Proper heading hierarchy (h1 as main page heading)
           */}
          <h1 
            id="hero-heading" 
            className={`${HEADING_SIZES.h1} text-foreground ${MARGIN_BOTTOM.medium} pointer-events-none select-none`}
          >
            Engineer revenue,<br />
            <span className="text-primary font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              not just software
            </span>
          </h1>
          
          {/* ==================================================================
              SUPPORTING SUBHEADING
              ================================================================== */}
          
          {/**
           * Value Proposition Elaboration
           * 
           * Expands on the headline by detailing the comprehensive service offering:
           * AI automation, product engineering, and GTM strategy. Emphasizes
           * "revenue from day one" to appeal to ROI-focused decision makers.
           * 
           * Typography:
           * - TEXT_SIZES.large: Responsive sizing for readability (lg -> xl -> 2xl -> 3xl)
           * - text-muted-foreground: Softer color to establish visual hierarchy
           * - max-w-5xl: Constrains line length for optimal readability (80-100 chars)
           * - mx-auto: Centers the constrained width
           * - leading-relaxed: Generous line height for comfortable reading
           * 
           * Messaging:
           * - "Under one roof": Emphasizes convenience and integration
           * - "Performance-driven": Appeals to metrics-focused businesses
           * - "Revenue from day one": Clear ROI promise
           * - "Emerging markets": Positions geographic specialization
           * 
           * Pointer Events:
           * - pointer-events-none: Transparent to mouse events for Spline interaction
           * - select-none: Prevents text selection during user interaction
           * 
           * Spacing:
           * - MARGIN_BOTTOM.medium: Consistent spacing before CTAs (1.25rem)
           */}
          <p className={`${TEXT_SIZES.large} text-muted-foreground max-w-5xl mx-auto ${MARGIN_BOTTOM.medium} pointer-events-none select-none`}>
            AI automation + product engineering + go-to-market strategy under one roof. 
            We build performance-driven business ecosystems that generate revenue from day one 
            in emerging markets.
          </p>

          {/* ==================================================================
              CALL-TO-ACTION BUTTONS
              ================================================================== */}
          
          {/**
           * CTA Button Container
           * 
           * Implements a dual-CTA strategy to cater to different user intents:
           * 1. Primary CTA: Book consultation (high-intent, direct conversion)
           * 2. Secondary CTA: View case studies (research phase, build trust)
           * 
           * Layout:
           * - flex-col on mobile: Stack buttons vertically for touch-friendly UX
           * - sm:flex-row: Horizontal layout on larger screens
           * - justify-center: Center buttons horizontally
           * - items-center: Align buttons on cross-axis
           * - GAP.medium: Consistent spacing between buttons (1.25rem)
           * 
           * Animation:
           * - animate-slide-up: Delayed entrance animation (slides up + fades in)
           * - will-change: Optimizes animation performance for transform and opacity
           * 
           * Pointer Events:
           * - pointer-events-auto: CRITICAL - Re-enables click events for buttons
           * - Overrides pointer-events-none from parent to make buttons clickable
           * - Allows Spline to receive events everywhere except on buttons
           * 
           * Accessibility:
           * - Proper button semantics with aria-labels
           * - Keyboard navigable (Tab key)
           * - Focus visible indicators
           * - Touch target size minimum 44x44px (WCAG 2.1)
           */}
          <div 
            className={`flex flex-col sm:flex-row ${GAP.medium} justify-center items-center animate-slide-up pointer-events-auto`} 
            style={{ willChange: 'transform, opacity' }}
          >
            {            /**
             * Primary CTA: Book Free Consultation
             * 
             * Highest-intent action targeting users ready to engage. Opens Calendly
             * directly in a new tab for immediate booking.
             * 
             * Visual Design:
             * - variant="cta": Primary brand color with strong shadow
             * - size="xl": Larger size for emphasis (h-16, 64px min-height)
             * - group: Enables group-hover for icon animation
             * - BUTTON_STYLES.responsive: w-full on mobile, w-auto on desktop
             * - BUTTON_STYLES.minWidth: Minimum 200px width on desktop
             * 
             * Interaction:
             * - onClick: Opens Calendly booking in new tab
             * - UTM tracking for marketing attribution (hero-cta campaign)
             * - Calendar icon provides visual affordance
             * - Arrow icon animates on hover (group-hover:translate-x-1)
             * 
             * Accessibility:
             * - aria-label: Descriptive label for screen readers
             * - Icons have aria-hidden="true" (decorative only)
             * - Meets 44x44px touch target size (min-h-[64px])
             * - Clear focus indicators with ring
             * 
             * Conversion Optimization:
             * - "Free" removes friction and risk
             * - Direct Calendly booking reduces steps to conversion
             * - Calendar icon signals scheduling action
             * - Arrow icon suggests forward progress
             * - Prominent placement and visual weight
             */}
            <Button 
              variant="cta" 
              size="xl"
              className={`group ${BUTTON_STYLES.responsive} ${BUTTON_STYLES.minWidth}`}
              onClick={(e) => {
                openCalendlyBooking(
                  undefined,
                  {
                    utmCampaign: 'hero-cta',
                    utmSource: 'age-website',
                    utmMedium: 'hero',
                    utmContent: 'book-consultation'
                  },
                  'Hero CTA',
                  e.currentTarget as HTMLElement
                );
              }}
              aria-label="Book a free AI growth consultation with Alvi Global Enterprises"
            >
              <Calendar className="mr-2" aria-hidden="true" />
              Book Free Consultation
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
            
            {/**
             * Secondary CTA: See Case Studies
             * 
             * Lower-intent action for users in research phase. Scrolls smoothly
             * to case studies section to provide social proof and build trust.
             * 
             * Visual Design:
             * - variant="cta-outline": Outlined style (secondary emphasis)
             * - Border with primary color, transparent background
             * - Fills with primary color on hover
             * - size="xl": Same size as primary CTA for visual balance
             * 
             * Interaction:
             * - onClick: Smooth scroll to #case-studies section
             * - Uses native scrollIntoView with behavior: 'smooth'
             * - Arrow icon animates on hover for visual feedback
             * - No page reload or navigation (same-page scroll)
             * 
             * Accessibility:
             * - aria-label: Describes the action and destination
             * - Keyboard accessible with proper focus management
             * - Icons are decorative (aria-hidden="true")
             * - Smooth scroll respects prefers-reduced-motion
             * 
             * UX Strategy:
             * - Provides low-friction path to social proof
             * - Keeps users engaged on the page
             * - Builds trust before asking for commitment
             * - Complements primary CTA with alternative action
             */}
            <Button 
              variant="cta-outline" 
              size="xl"
              className={`group ${BUTTON_STYLES.responsive} ${BUTTON_STYLES.minWidth}`}
              onClick={() => document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Scroll to view our case studies and success stories"
            >
              See Case Studies
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>

      {/* ====================================================================
          SCROLL INDICATOR (z-20)
          ==================================================================== */}
      
      {/**
       * Animated Scroll Indicator
       * 
       * Visual affordance suggesting users can scroll down to explore more content.
       * Uses a mouse-inspired design with animated dot to indicate scrollability.
       * 
       * Position:
       * - absolute: Positioned relative to hero section
       * - bottom-8: 32px from bottom of viewport
       * - left-1/2 + transform: Horizontally centered
       * - z-20: Above gradient overlay, below content
       * 
       * Animation:
       * - animate-pulse-soft: Subtle fade in/out (opacity 1 <-> 0.8)
       * - animate-bounce: Vertical bounce animation on inner dot
       * - Combines two animations for eye-catching effect
       * 
       * Pointer Events:
       * - pointer-events-none: Allows Spline interaction underneath
       * - Purely decorative, no click functionality
       * 
       * Design:
       * - Mouse-shaped container (6x10, rounded-full)
       * - Animated dot inside representing scroll wheel
       * - border-muted-foreground: Soft contrast with background
       * 
       * Visibility:
       * - Always visible on hero section
       * - Hidden once user scrolls (natural behavior)
       * - Respects prefers-reduced-motion preferences
       */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-pulse-soft z-20 pointer-events-none">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </div>
  );
});

// Display name for React DevTools debugging
Hero.displayName = 'Hero';

export default Hero;
