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

const Index = () => {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  // Listen for scroll events to growth audit section
  useEffect(() => {
    const handleGrowthAuditClick = () => {
      setIsAuditModalOpen(true);
    };

    // Add event listener for growth audit buttons
    const auditButtons = document.querySelectorAll('[data-growth-audit]');
    auditButtons.forEach(button => {
      button.addEventListener('click', handleGrowthAuditClick);
    });

    return () => {
      auditButtons.forEach(button => {
        button.removeEventListener('click', handleGrowthAuditClick);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ProofBar />
      <ValuePillars />
      <ServicesGrid />
      <CaseStudies />
      <HowWeWork />
      <Industries />
      <ContentTeaser />
      <Footer />
      
      <GrowthAuditModal 
        isOpen={isAuditModalOpen} 
        onClose={() => setIsAuditModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
