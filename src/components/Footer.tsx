import { MapPin, Mail, Phone, Linkedin, Twitter, Globe } from "lucide-react";

const Footer = () => {
  const links = {
    services: [
      "AI & Automation",
      "Product Engineering", 
      "Growth & GTM",
      "Creative & Content",
      "Revenue Operations"
    ],
    company: [
      "About Us",
      "Case Studies",
      "Careers",
      "Contact",
      "Blog"
    ],
    resources: [
      "Market Insights",
      "Growth Playbook",
      "ROI Calculator",
      "Documentation",
      "Support"
    ]
  };

  return (
    <footer className="bg-primary text-primary-foreground">
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
                <span>+92 300 1234567</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              {links.services.map((link) => (
                <li key={link}>
                  <button className="hover:text-primary-foreground transition-colors text-left">
                    {link}
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
                <li key={link}>
                  <button className="hover:text-primary-foreground transition-colors text-left">
                    {link}
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
                <li key={link}>
                  <button className="hover:text-primary-foreground transition-colors text-left">
                    {link}
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
              © 2024 Alvi Global Enterprises. All rights reserved.
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