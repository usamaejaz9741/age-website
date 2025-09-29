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
      iconColor: "var(--icon-purple)",
      bgColor: "var(--icon-purple-bg)"
    },
    {
      icon: DollarSign,
      name: "Fintech & Banking",
      description: "Digital financial services and payment platform development",
      iconColor: "var(--icon-blue)",
      bgColor: "var(--icon-blue-bg)"
    },
    {
      icon: Home,
      name: "Real Estate Tech",
      description: "PropTech solutions for property management and transactions",
      iconColor: "var(--icon-green)",
      bgColor: "var(--icon-green-bg)"
    },
    {
      icon: Plane,
      name: "Travel & Hospitality",
      description: "Booking platforms and customer experience optimization",
      iconColor: "var(--icon-indigo)",
      bgColor: "var(--icon-indigo-bg)"
    },
    {
      icon: ShoppingCart,
      name: "E-commerce & Retail",
      description: "Omnichannel commerce and marketplace solutions",
      iconColor: "var(--icon-red)",
      bgColor: "var(--icon-red-bg)"
    }
  ];

  return (
    <div>
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Industries we{" "}
            <span className="text-primary">accelerate</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Deep domain expertise across high-growth sectors in emerging markets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <AnimatedCard
                key={industry.name}
                delay={index * 100}
                direction="up"
                className="group p-4 sm:p-6 md:p-8 bg-gradient-card rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 ease-out hover:-translate-y-1 cursor-pointer"
              >
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ease-bounce mx-auto"
                  style={{ backgroundColor: industry.bgColor }}
                >
                  <Icon 
                    className="w-8 h-8 flex-shrink-0 mx-auto my-auto" 
                    style={{ color: industry.iconColor }}
                  />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                  {industry.name}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {industry.description}
                </p>

                <div className="mt-6 flex items-center justify-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more →
                </div>
              </AnimatedCard>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center p-8 bg-gradient-hero rounded-xl">
          <h3 className="text-2xl font-bold text-foreground mb-6 leading-tight">
            Don't see your industry?
          </h3>
          <p className="text-muted-foreground mb-6">
            We adapt our expertise to any high-growth market opportunity.
          </p>
          <button className="text-primary font-bold hover:underline">
            Discuss your market →
          </button>
        </div>
    </div>
  );
};

export default Industries;