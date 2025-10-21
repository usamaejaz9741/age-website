/**
 * Industries Component - Industry Expertise Display
 * 
 * This component showcases the industries and sectors where Alvi Global
 * Enterprises has deep domain expertise. It displays various industry
 * verticals with icons and descriptions in an animated grid layout.
 * 
 * Features:
 * - Five core industry verticals with detailed descriptions
 * - Animated cards with scroll-triggered animations
 * - Responsive grid layout for different screen sizes
 * - Icon-based visual representation for each industry
 * - Industry-specific descriptions and expertise areas
 */

import { Brain, DollarSign, Home, Plane, ShoppingCart } from "lucide-react";
import { AnimatedCard } from "@/components/ui/animated-card";
import { 
  HEADING_SIZES, 
  TEXT_SIZES, 
  MARGIN_BOTTOM, 
  CARD_PADDING, 
  ICON_CONTAINER, 
  ICON_SIZES, 
  BORDER_RADIUS,
  SHADOWS,
  GAP,
  GRID_COLS,
  TRANSITIONS,
  HOVER_EFFECTS
} from "@/constants/design-system";
import { ANIMATION_DELAYS } from "@/constants/animations";
import { generateMailtoLink } from "@/constants/contact";

/**
 * Industries component displaying industry expertise areas
 * 
 * @returns JSX element with animated industry cards
 */
const Industries = () => {
  const industries = [
    {
      icon: Brain,
      name: "AI & Machine Learning",
      description: "Next-gen AI solutions for enterprise automation and intelligence",
      iconColorClass: "text-icon-purple",
      bgColorClass: "bg-icon-purple-bg"
    },
    {
      icon: DollarSign,
      name: "Fintech & Banking",
      description: "Digital financial services and payment platform development",
      iconColorClass: "text-icon-blue",
      bgColorClass: "bg-icon-blue-bg"
    },
    {
      icon: Home,
      name: "Real Estate Tech",
      description: "PropTech solutions for property management and transactions",
      iconColorClass: "text-icon-green",
      bgColorClass: "bg-icon-green-bg"
    },
    {
      icon: Plane,
      name: "Travel & Hospitality",
      description: "Booking platforms and customer experience optimization",
      iconColorClass: "text-icon-indigo",
      bgColorClass: "bg-icon-indigo-bg"
    },
    {
      icon: ShoppingCart,
      name: "E-commerce & Retail",
      description: "Omnichannel commerce and marketplace solutions",
      iconColorClass: "text-icon-red",
      bgColorClass: "bg-icon-red-bg"
    }
  ];

  return (
    <div>
        <div className={`text-center ${MARGIN_BOTTOM.section} animate-fade-in`}>
          <h2 className={`${HEADING_SIZES.h2} text-foreground ${MARGIN_BOTTOM.default}`}>
            Industries we<br />
            <span className="text-primary">accelerate</span>
          </h2>
          <p className={`${TEXT_SIZES.medium} text-muted-foreground max-w-3xl mx-auto`}>
            Deep domain expertise across high-growth sectors in emerging markets.
          </p>
        </div>

        <div className={`${GRID_COLS.three} ${GAP.medium}`}>
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <AnimatedCard
                key={industry.name}
                delay={index * ANIMATION_DELAYS.SMALL}
                direction="up"
                className={`group ${CARD_PADDING.responsive} bg-gradient-card ${BORDER_RADIUS.xl} ${SHADOWS.soft} hover:${SHADOWS.medium} transition-all ${TRANSITIONS.default} ease-out ${HOVER_EFFECTS.lift} cursor-pointer`}
              >
                <div 
                  className={`${ICON_CONTAINER.large} ${industry.bgColorClass} ${BORDER_RADIUS.xl} flex items-center justify-center ${MARGIN_BOTTOM.default} group-hover:scale-110 transition-transform ${TRANSITIONS.default} ease-bounce mx-auto`}
                >
                  <Icon 
                    className={`${ICON_SIZES.large} ${industry.iconColorClass} flex-shrink-0 mx-auto my-auto`}
                  />
                </div>
                
                <h3 className={`${HEADING_SIZES.h4} text-foreground ${MARGIN_BOTTOM.small} group-hover:text-primary transition-colors`}>
                  {industry.name}
                </h3>
                
                <p className={`${TEXT_SIZES.base} text-muted-foreground`}>
                  {industry.description}
                </p>

                <div className={`mt-6 flex items-center justify-center ${TEXT_SIZES.small} text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Learn more →
                </div>
              </AnimatedCard>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className={`mt-16 text-center ${CARD_PADDING.large} bg-gradient-hero ${BORDER_RADIUS.xl}`}>
          <h3 className={`${HEADING_SIZES.h4} text-foreground ${MARGIN_BOTTOM.default}`}>
            Don't see your industry?
          </h3>
          <p className={`${TEXT_SIZES.base} text-muted-foreground ${MARGIN_BOTTOM.medium}`}>
            We adapt our expertise to any high-growth market opportunity.
          </p>
          <button 
            type="button"
            className={`${TEXT_SIZES.base} text-primary font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1`}
            onClick={() => {
              window.location.href = generateMailtoLink('generalInquiry', 'Industry-Specific Solutions');
            }}
            aria-label="Contact us to discuss your specific industry needs"
          >
            Discuss your market →
          </button>
        </div>
    </div>
  );
};

export default Industries;