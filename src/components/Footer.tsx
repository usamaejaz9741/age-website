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
import { CONTACT_INFO } from "@/constants/contact";

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
    if (location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If we're on a different page, navigate to home and then scroll
      navigate("/", { state: { scrollTo: id } });
    }
  };

  const links = {
    services: [
      { label: "AI & Automation", id: "services" },
      { label: "Product Engineering", id: "services" },
      { label: "Growth & GTM", id: "services" },
      { label: "Creative & Content", id: "services" },
      { label: "Revenue Operations", id: "services" },
    ],
    company: [
      { label: "About Us", id: "about" },
      { label: "Case Studies", id: "case-studies" },
      { label: "Careers", id: "careers" },
      { label: "Contact", id: "contact" },
      { label: "Blog", id: "blog" },
    ],
    resources: [
      { label: "Market Insights", id: "insights" },
      { label: "Growth Playbook", id: "playbook" },
      { label: "ROI Calculator", id: "calculator" },
      { label: "Documentation", id: "docs" },
      { label: "Support", id: "support" },
    ],
  };

  return (
    <footer className="bg-primary text-white" role="contentinfo">
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
              <p className="!text-white/90 leading-relaxed">
                Engineering revenue-generating business ecosystems for emerging
                markets. AI-powered, performance-driven, globally scaled.
              </p>
            </div>{" "}
            {/* Global Footprint */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 flex items-center !text-white">
                <Globe className="w-4 h-4 mr-2 text-white" />
                Global Footprint
              </h4>
              <div className="space-y-2 text-sm !text-white/90">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-white" />
                  <span>
                    <strong>HQ:</strong> Karachi, Pakistan
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-white" />
                  <span>Dubai, UAE • Singapore • London, UK</span>
                </div>
              </div>
            </div>
            {/* Contact */}
            <div className="space-y-2 text-sm !text-white/90">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-white" />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:!text-white transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-white" />
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="hover:!text-white transition-colors"
                >
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 !text-white">Services</h4>
            <ul className="space-y-2 text-sm !text-white/90">
              {links.services.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavigation(link.id)}
                    className="hover:!text-white transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 !text-white">Company</h4>
            <ul className="space-y-2 text-sm !text-white/90">
              {links.company.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavigation(link.id)}
                    className="hover:!text-white transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 !text-white">Resources</h4>
            <ul className="space-y-2 text-sm !text-white/90">
              {links.resources.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavigation(link.id)}
                    className="hover:!text-white transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm !text-white/70">
              © 2025 Alvi Global Enterprises. All rights reserved.
            </div>

            <nav
              className="flex items-center space-x-4"
              aria-label="Legal navigation"
            >
              <a
                href="/privacy-policy"
                className="text-sm !text-white hover:!text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary rounded px-2 py-1"
                aria-label="Read our Privacy Policy"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-service"
                className="text-sm !text-white hover:!text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary rounded px-2 py-1"
                aria-label="Read our Terms of Service"
              >
                Terms of Service
              </a>
            </nav>

            <nav
              className="flex items-center space-x-4"
              aria-label="Social media links"
            >
              <a
                href={CONTACT_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="!text-white hover:!text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary rounded p-1"
                aria-label="Visit our LinkedIn page (opens in new tab)"
              >
                <Linkedin className="w-5 h-5 text-white" aria-hidden="true" />
              </a>
              <a
                href={CONTACT_INFO.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="!text-white hover:!text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary rounded p-1"
                aria-label="Visit our Twitter profile (opens in new tab)"
              >
                <Twitter className="w-5 h-5 text-white" aria-hidden="true" />
              </a>
              <a
                href={CONTACT_INFO.website}
                target="_blank"
                rel="noopener noreferrer"
                className="!text-white hover:!text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary rounded p-1"
                aria-label="Visit our website (opens in new tab)"
              >
                <Globe className="w-5 h-5 text-white" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
