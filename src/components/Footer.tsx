/**
 * Footer Component - Site Footer with Links and Contact Information
 * 
 * This component provides the main footer for the Alvi Global Enterprises website, including:
 * - Company branding and description
 * - Navigation links organized by category
 * - Contact information and social media links
 * - Global footprint information
 * - Copyright and legal information
 * 
 * Features:
 * - Responsive grid layout
 * - Social media integration
 * - Contact information display
 * - Global presence highlighting
 * - Accessibility features
 */

import { MapPin, Mail, Phone, Linkedin, Twitter, Globe } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Footer component with comprehensive site information
 * 
 * Displays company information, navigation links, contact details,
 * and social media links in a responsive grid layout.
 * 
 * Features:
 * - Multi-column responsive layout
 * - Company branding and description
 * - Organized navigation links
 * - Contact information with icons
 * - Social media links
 * - Global footprint information
 * - Copyright notice
 */
const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Handle navigation to page sections
   * 
   * @param id - Section ID to navigate to
   */
  const handleNavigation = (id: string) => {
    // If we're on the home page, scroll to section
    if (location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on a different page, navigate to home and then scroll
      navigate('/', { state: { scrollTo: id } });
    }
  };

  const links = {
    services: [
      { label: "AI & Automation", id: "services" },
      { label: "Product Engineering", id: "services" }, 
      { label: "Growth & GTM", id: "services" },
      { label: "Creative & Content", id: "services" },
      { label: "Revenue Operations", id: "services" }
    ],
    company: [
      { label: "About Us", id: "about" },
      { label: "Case Studies", id: "case-studies" },
      { label: "Careers", id: "careers" },
      { label: "Contact", id: "contact" },
      { label: "Blog", id: "blog" }
    ],
    resources: [
      { label: "Market Insights", id: "insights" },
      { label: "Growth Playbook", id: "playbook" },
      { label: "ROI Calculator", id: "calculator" },
      { label: "Documentation", id: "docs" },
      { label: "Support", id: "support" }
    ]
  };

  return (
    <footer className="bg-primary text-primary-foreground" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
          <div className="mb-6">
            <img 
              src="/assets/age-logos/age-logo-footer.png"
              alt="Alvi Global Enterprises"
              className="h-15 w-auto mb-4"
            />
            <p className="text-primary-foreground/80 leading-relaxed">
              Engineering revenue-generating business ecosystems for emerging markets. 
              AI-powered, performance-driven, globally scaled.
            </p>
          </div>            {/* Global Footprint */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                Global Footprint
              </h4>
              <div className="space-y-2 text-sm text-primary-foreground/80">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span><strong>HQ:</strong> Karachi, Pakistan</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Dubai, UAE • Singapore • London, UK</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <a href="mailto:hello@alviglobal.com" className="hover:text-primary-foreground transition-colors">
                  hello@alviglobal.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+92 301 8222054</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              {links.services.map((link) => (
                <li key={link.label}>
                  <button 
                    onClick={() => handleNavigation(link.id)}
                    className="hover:text-primary-foreground transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              {links.company.map((link) => (
                <li key={link.label}>
                  <button 
                    onClick={() => handleNavigation(link.id)}
                    className="hover:text-primary-foreground transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              {links.resources.map((link) => (
                <li key={link.label}>
                  <button 
                    onClick={() => handleNavigation(link.id)}
                    className="hover:text-primary-foreground transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-primary-foreground/60">
              © 2025 Alvi Global Enterprises. All rights reserved.
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Privacy Policy
              </button>
              <button className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Terms of Service
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
              <button className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Globe className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;