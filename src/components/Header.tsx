/**
 * Header Component - Navigation and Branding
 * 
 * This component provides the main navigation header for the Alvi Global Enterprises website.
 * It includes:
 * - Brand logo with navigation functionality
 * - Desktop and mobile navigation menus
 * - Calendly booking integration
 * - Responsive design with mobile hamburger menu
 * - Cross-page navigation with scroll-to-section support
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Calendar } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { openCalendlyBooking } from "@/lib/calendly";

/**
 * Header component with navigation and branding
 * 
 * Features:
 * - Responsive navigation with mobile menu
 * - Logo click navigation (home page scroll to top, other pages navigate home)
 * - Section navigation (scroll on home page, navigate + scroll on other pages)
 * - Calendly booking integration with UTM tracking
 * - Mobile-first responsive design
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
    setIsMenuOpen(false);
  };

  /**
   * Handle logo click navigation
   * Scrolls to top on home page, navigates home on other pages
   */
  const handleLogoClick = () => {
    if (location.pathname === '/') {
      // If on home page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If on different page, navigate to home
      navigate('/');
    }
    setIsMenuOpen(false);
  };

  /**
   * Handle Calendly booking button click with focus management
   * 
   * @param e - Mouse event containing the trigger element
   */
  const handleBookConsultation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    openCalendlyBooking(
      undefined,
      {
        utmCampaign: 'header-cta',
        utmSource: 'age-website',
        utmMedium: 'header',
        utmContent: 'book-consultation'
      },
      'Header CTA',
      e.currentTarget as HTMLElement
    );
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: "Services", id: "services" },
    { label: "Case Studies", id: "case-studies" },
    { label: "How We Work", id: "how-we-work" },
    { label: "Industries", id: "industries" },
  ];

  // Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      // Only apply scroll effect on home page
      if (location.pathname === '/') {
        const scrollY = window.scrollY;
        // Trigger background when scrolled past 100px (hero section height threshold)
        setIsScrolled(scrollY > 100);
      } else {
        // On other pages, always show background
        setIsScrolled(true);
      }
    };

    // Set initial state
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-[var(--space-md)] focus:left-[var(--space-md)] bg-primary text-primary-foreground px-[var(--space-md)] py-[var(--space-sm)] rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ease-out ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-md border-b border-neutral-10' 
            : 'bg-transparent backdrop-blur-none border-b-0'
        }`} 
        role="banner"
      >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={handleLogoClick}
              className="flex items-center h-10"
            >
              <img 
                src="/assets/age-logos/age-logo-header.png"
                alt="Alvi Global Enterprises"
                className="h-full w-auto"
                loading="eager"
                decoding="sync"
                width="120"
                height="40"
                fetchPriority="high"
              />
            </button>
          </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className="text-neutral-75 hover:text-primary font-medium transition-colors duration-500 ease-gentle"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
              <div className="hidden md:flex">
                <Button
                  type="button"
                  variant="cta"
                  size="default"
                  onClick={handleBookConsultation}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Consultation
                </Button>
              </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] text-neutral-75 hover:text-resolution-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/80 backdrop-blur-md border-b border-neutral-10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className="block w-full text-left px-3 py-2 text-neutral-75 hover:text-resolution-blue-700 hover:bg-neutral-5 font-medium transition-all duration-300 ease-out rounded-md active:bg-primary/10"
                >
                  {item.label}
                </button>
              ))}
              <div className="px-3 pt-2">
                <Button
                  type="button"
                  variant="cta"
                  size="default" 
                  className="w-full"
                  onClick={handleBookConsultation}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
    </>
  );
};

export default Header;