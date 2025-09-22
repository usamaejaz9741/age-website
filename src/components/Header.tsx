import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: "Services", id: "services" },
    { label: "Case Studies", id: "case-studies" },
    { label: "How We Work", id: "how-we-work" },
    { label: "Industries", id: "industries" },
  ];

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-neutral-10 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => scrollToSection("hero")}
              className="flex items-center h-10"
            >
              <img 
                src="/assets/age-logos/age-logo-header.png"
                alt="AGE"
                className="h-full w-auto"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-neutral-75 hover:text-resolution-blue-600 font-medium transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <Button 
              variant="cta" 
              size="sm"
              data-growth-audit
            >
              Book Growth Audit
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-resolution-blue-700 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-resolution-blue-700 hover:bg-gray-50 font-medium transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              <div className="px-3 pt-2">
                <Button 
                  variant="cta" 
                  size="sm" 
                  className="w-full"
                  data-growth-audit
                >
                  Book Growth Audit
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;