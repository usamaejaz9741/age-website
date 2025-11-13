/**
 * @fileoverview Index Page - Main Landing Page Component
 * 
 * The primary marketing and lead generation page for the Alvi Global Enterprises website.
 * This page serves as the main entry point for visitors and provides comprehensive
 * information about the company's services and value proposition.
 * 
 * @component
 * @example
 * ```tsx
 * <Index />
 * ```
 * 
 * @features
 * - 🎯 Hero section with compelling value proposition
 * - 📊 Social proof and client testimonials
 * - 🛠️ Service offerings and case studies
 * - 🏢 Company information and contact details
 * - 📋 Growth audit modal for lead capture
 * - 🎨 Responsive design with smooth animations
 * - ♿ Full accessibility support
 * - 🔗 Global event listener system for CTAs
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 * @since 1.0.0
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
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Main landing page component
 * 
 * Handles scroll restoration and provides comprehensive page layout with all marketing sections.
 * All booking CTAs connect directly to Calendly for streamlined conversion flow.
 * 
 * @returns JSX.Element - Complete landing page with all sections
 */
const Index = () => {
  /** React Router location object for navigation state */
  const location = useLocation();

  /**
   * Handle scroll to section when navigating from other pages
   */
  useEffect(() => {
    if (!location.state?.scrollTo) {
      return;
    }

    const element = document.getElementById(location.state.scrollTo);
    if (!element) {
      // Clear the state even if element is not found
      window.history.replaceState({}, document.title);
      return;
    }

    // Small delay to ensure the page has rendered
    const scrollTimeout = setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    
    // Clear the state to prevent re-scrolling on refresh
    window.history.replaceState({}, document.title);
    
    // Cleanup timeout on unmount
    return () => clearTimeout(scrollTimeout);
  }, [location.state]);

  return (
    <PageTemplate 
      pageTitle="Alvi Global Enterprises - AI-Powered Business Solutions"
      pageDescription="Transform your business with AI automation, product engineering, and growth strategies. Expert solutions for emerging markets with proven results."
      pageKeywords="AI automation, business growth, emerging markets, revenue engineering, product development, go-to-market strategy, AI consulting, business transformation, digital transformation, AI implementation, business ecosystems, growth consulting, AI maturity assessment, Pakistan, Karachi"
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
      {/* <SectionTemplate id="case-studies" variant="default" padding="xl" maxWidth="7xl" align="center">
        <CaseStudies />z
      </SectionTemplate> */}
      
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
    </PageTemplate>
  );
};

export default Index;
