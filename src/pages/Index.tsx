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

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProofBar from "@/components/ProofBar";
import ValuePillars from "@/components/ValuePillars";
import ServicesGrid from "@/components/ServicesGrid";
import CaseStudies from "@/components/CaseStudies";
import HowWeWork from "@/components/HowWeWork";
import Industries from "@/components/Industries";
import ContentTeaser from "@/components/ContentTeaser";
import Footer from "@/components/Footer";
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
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      // Clear the state to prevent re-scrolling on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed navigation header */}
      <Header />
      
      {/* Main page sections in order */}
      <Hero />
      <ProofBar />
      <ValuePillars />
      <ServicesGrid />
      <CaseStudies />
      <HowWeWork />
      <Industries />
      <ContentTeaser />
      <Footer />
      
      {/* Growth audit modal for lead capture */}
      <GrowthAuditModal 
        isOpen={isAuditModalOpen} 
        onClose={() => setIsAuditModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
