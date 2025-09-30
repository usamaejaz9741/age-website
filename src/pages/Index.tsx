/**
 * Main landing page component for the Alvi Global Enterprises Website
 * 
 * This page serves as the primary marketing and lead generation page, featuring:
 * - Hero section with main value proposition
 * - Social proof and testimonials
 * - Service offerings and case studies
 * - Company information and contact details
 * - Growth audit modal for lead capture
 * 
 * The page uses a global event listener system to handle growth audit
 * button clicks from any component on the page.
 */

import PageTemplate from "@/components/PageTemplate";
import SectionTemplate from "@/components/SectionTemplate";
import Hero from "@/components/Hero";
import ProofBar from "@/components/ProofBar";
import ValuePillars from "@/components/ValuePillars";
import ServicesGrid from "@/components/ServicesGrid";
import CaseStudies from "@/components/CaseStudies";
import HowWeWork from "@/components/HowWeWork";
import Industries from "@/components/Industries";
import ContentTeaser from "@/components/ContentTeaser";
import GrowthAuditModal from "@/components/GrowthAuditModal";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Main landing page component
 * 
 * Manages the growth audit modal state and sets up global event listeners
 * for growth audit buttons throughout the page.
 */
const Index = () => {
  // State for controlling the growth audit modal visibility
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const location = useLocation();

  /**
   * Set up global event listeners for growth audit buttons
   * 
   * This allows any button with the data-growth-audit attribute to trigger
   * the growth audit modal, providing a consistent user experience across
   * all page sections.
   */
  useEffect(() => {
    const handleGrowthAuditClick = () => {
      setIsAuditModalOpen(true);
    };

    // Find all buttons with the growth audit data attribute
    const auditButtons = document.querySelectorAll('[data-growth-audit]');
    
    // Add click event listeners to all audit buttons
    auditButtons.forEach(button => {
      button.addEventListener('click', handleGrowthAuditClick);
    });

    // Cleanup: Remove event listeners when component unmounts
    return () => {
      auditButtons.forEach(button => {
        button.removeEventListener('click', handleGrowthAuditClick);
      });
    };
  }, []);

  /**
   * Handle scroll to section when navigating from other pages
   */
  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        // Small delay to ensure the page has rendered
        const scrollTimeout = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        
        // Clear the state to prevent re-scrolling on refresh
        window.history.replaceState({}, document.title);
        
        // Cleanup timeout on unmount
        return () => clearTimeout(scrollTimeout);
      }
    }
  }, [location.state]);

  return (
    <PageTemplate 
      pageTitle="Alvi Global Enterprises - AI-Powered Business Solutions"
      pageDescription="Transform your business with AI automation, product engineering, and growth strategies. Expert solutions for emerging markets with proven results."
      pageKeywords="AI automation, business growth, emerging markets, revenue engineering, product development, go-to-market strategy, AI consulting, business transformation, digital transformation, AI implementation, business ecosystems, growth consulting, AI maturity assessment, Pakistan, Karachi, ITCN Asia 2025"
      canonicalUrl="https://alviglobal.com"
      ogImage="https://alviglobal.com/og-image.jpg"
      twitterCard="summary_large_image"
      pageType="WebPage"
      structuredData={{
        "@type": "WebPage",
        "name": "Alvi Global Enterprises - AI-Powered Business Solutions",
        "description": "Transform your business with AI automation, product engineering, and growth strategies. Expert solutions for emerging markets with proven results.",
        "mainEntity": {
          "@type": "Organization",
          "name": "Alvi Global Enterprises",
          "description": "AI-powered business ecosystems for emerging markets",
          "service": [
            {
              "@type": "Service",
              "name": "AI Automation",
              "description": "AI-powered automation solutions for business processes"
            },
            {
              "@type": "Service",
              "name": "Product Engineering",
              "description": "Full-stack product development and engineering services"
            },
            {
              "@type": "Service",
              "name": "Growth Consulting",
              "description": "Go-to-market strategy and business growth consulting"
            },
            {
              "@type": "Service",
              "name": "AI Maturity Assessment",
              "description": "Comprehensive AI readiness assessment and recommendations"
            }
          ]
        }
      }}
      customMeta={[
        { name: "google-site-verification", content: "your-google-verification-code" },
        { name: "msvalidate.01", content: "your-bing-verification-code" },
        { property: "article:author", content: "Alvi Global Enterprises" },
        { property: "article:publisher", content: "https://alviglobal.com" }
      ]}
    >
      {/* Hero Section */}
      <SectionTemplate variant="hero" padding="none" maxWidth="full" align="center">
        <Hero />
      </SectionTemplate>
      
      {/* Proof Bar Section */}
      <SectionTemplate variant="muted" padding="xl" maxWidth="7xl" align="center">
        <ProofBar />
      </SectionTemplate>
      
      {/* Value Pillars Section */}
      <SectionTemplate variant="default" padding="xl" maxWidth="7xl" align="center">
        <ValuePillars />
      </SectionTemplate>
      
      {/* Services Grid Section */}
      <SectionTemplate id="services" variant="muted" padding="xl" maxWidth="7xl" align="center">
        <ServicesGrid />
      </SectionTemplate>
      
      {/* Case Studies Section */}
      <SectionTemplate id="case-studies" variant="default" padding="xl" maxWidth="7xl" align="center">
        <CaseStudies />
      </SectionTemplate>
      
      {/* How We Work Section */}
      <SectionTemplate id="how-we-work" variant="muted" padding="xl" maxWidth="7xl" align="center">
        <HowWeWork />
      </SectionTemplate>
      
      {/* Industries Section */}
      <SectionTemplate id="industries" variant="default" padding="xl" maxWidth="7xl" align="center">
        <Industries />
      </SectionTemplate>
      
      {/* Content Teaser Section */}
      <SectionTemplate variant="gradient" padding="xl" maxWidth="7xl" align="center">
        <ContentTeaser />
      </SectionTemplate>
      
      {/* Growth audit modal for lead capture */}
      <GrowthAuditModal 
        isOpen={isAuditModalOpen} 
        onClose={() => setIsAuditModalOpen(false)} 
      />
    </PageTemplate>
  );
};

export default Index;
