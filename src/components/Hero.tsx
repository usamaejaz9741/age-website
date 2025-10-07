/**
 * @fileoverview Hero Component - Main Landing Section
 * 
 * Primary hero section for the Alvi Global Enterprises website, featuring compelling
 * value proposition, strategic CTAs, and seamless modal integration for lead generation.
 * 
 * @component
 * @example
 * ```tsx
 * <Hero />
 * ```
 * 
 * @features
 * - 🎯 Compelling headline with clear value proposition
 * - 🚀 Strategic call-to-action buttons for lead generation
 * - 🎨 3D interactive Spline background with gradient overlay
 * - 📱 Fully responsive design with mobile optimization
 * - 🔗 Seamless modal integration for growth audit booking
 * - ⚡ Optimized performance with React.memo
 * - ♿ Full accessibility support with proper ARIA labels
 * - 🎭 Smooth animations and micro-interactions
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { useState, memo } from "react";
import GrowthAuditModal from "./GrowthAuditModal";
import SplineBackground from "./SplineBackground";
import { blurActiveElement } from "@/lib/console-utils";
import { HEADING_SIZES, TEXT_SIZES, MARGIN_BOTTOM, BUTTON_STYLES, BACKGROUNDS, GAP } from "@/constants/design-system";

/**
 * Hero section component with main value proposition and CTAs
 * 
 * Features:
 * - Full-screen hero with 3D interactive Spline background
 * - Compelling headline emphasizing revenue engineering
 * - Dual CTA buttons (primary consultation booking, secondary assessment)
 * - Growth audit modal integration
 * - Responsive typography and spacing
 * - Smooth animations and hover effects
 */
const Hero = memo(() => {
  const [showGrowthAudit, setShowGrowthAudit] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" role="banner" aria-labelledby="hero-heading">

      {/* 3D Interactive Spline Background */}
      <SplineBackground />

      {/* Gradient Overlay - Seamless blend with proof bar */}
      <div className={`fixed inset-0 z-20 pointer-events-none ${BACKGROUNDS.gradientOverlay}`} />

      {/* Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 py-20 text-center pointer-events-none">
        <div className="animate-fade-in">
          <h1 id="hero-heading" className={`${HEADING_SIZES.h1} text-foreground ${MARGIN_BOTTOM.medium}`}>
            Engineer revenue,{" "}
            <span className="text-primary font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">not just software</span>
          </h1>
          
          <p className={`${TEXT_SIZES.large} text-muted-foreground max-w-5xl mx-auto ${MARGIN_BOTTOM.medium}`}>
            AI automation + product engineering + go-to-market strategy under one roof. 
            We build performance-driven business ecosystems that generate revenue from day one 
            in emerging markets.
          </p>

          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row ${GAP.medium} justify-center items-center animate-slide-up pointer-events-auto`}>
            <Button 
              variant="cta" 
              size="xl"
              className={`group ${BUTTON_STYLES.responsive} ${BUTTON_STYLES.minWidth}`}
              onClick={() => {
                blurActiveElement();
                setShowGrowthAudit(true);
              }}
              aria-label="Book a free AI growth consultation with Alvi Global Enterprises"
            >
              <Calendar className="mr-2" aria-hidden="true" />
              Book Free Consultation
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
            
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

      {/* Growth Audit Modal */}
      <GrowthAuditModal 
        isOpen={showGrowthAudit}
        onClose={() => setShowGrowthAudit(false)}
      />

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-pulse-soft z-20">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </div>
  );
});

Hero.displayName = 'Hero';

export default Hero;