/**
 * Hero Component - Main Landing Section
 * 
 * This component provides the primary hero section for the Alvi Global Enterprises website landing page.
 * It includes:
 * - Compelling headline and value proposition
 * - Call-to-action buttons for lead generation
 * - Background image with gradient overlay
 * - Growth audit modal integration
 * - Responsive design with mobile optimization
 */

import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import { useState } from "react";
import GrowthAuditModal from "./GrowthAuditModal";

/**
 * Hero section component with main value proposition and CTAs
 * 
 * Features:
 * - Full-screen hero with background image
 * - Compelling headline emphasizing revenue engineering
 * - Dual CTA buttons (primary consultation booking, secondary assessment)
 * - Growth audit modal integration
 * - Responsive typography and spacing
 * - Smooth animations and hover effects
 */
const Hero = () => {
  const [showGrowthAudit, setShowGrowthAudit] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden" role="banner" aria-labelledby="hero-heading">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="AI-powered business automation" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="animate-fade-in">
          <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Engineer revenue,{" "}
            <span className="text-primary font-extrabold">not just software</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed">
            AI automation + product engineering + go-to-market strategy under one roof. 
            We build performance-driven business ecosystems that generate revenue from day one 
            in emerging markets.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-slide-up">
            <Button 
              variant="cta" 
              size="xl"
              className="group w-full sm:min-w-[280px] sm:w-auto"
              onClick={() => setShowGrowthAudit(true)}
            >
              <Calendar className="mr-2" />
              Book Free Consultation
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="cta-outline" 
              size="xl"
              className="group w-full sm:min-w-[280px] sm:w-auto"
              onClick={() => document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See Case Studies
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
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
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-pulse-soft">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;