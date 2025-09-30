/**
 * Services Grid Component - Service Offerings Display
 * 
 * This component displays the five core service pillars offered by Alvi Global
 * Enterprises. Each service is presented with an icon, title, description,
 * and key features in an animated grid layout.
 * 
 * Features:
 * - Five core service pillars with detailed descriptions
 * - Animated cards with scroll-triggered animations
 * - Responsive grid layout for different screen sizes
 * - Icon-based visual representation for each service
 * - Feature lists for each service offering
 */

import { Bot, Code, TrendingUp, Palette, Settings } from "lucide-react";
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

/**
 * Services Grid component displaying core service offerings
 * 
 * @returns JSX element with animated service cards
 */
const ServicesGrid = () => {
  const services = [
    {
      icon: Bot,
      title: "AI & Automation",
      description: "Intelligent systems that scale your operations and reduce manual overhead",
      features: ["Process Automation", "AI-Powered Analytics", "Smart Decision Systems"],
      iconColor: "var(--icon-purple)",
      bgColor: "var(--icon-purple-bg)"
    },
    {
      icon: Code,
      title: "Product & Engineering", 
      description: "Full-stack development with performance and scalability at the core",
      features: ["Custom Software", "API Development", "Cloud Infrastructure"],
      iconColor: "var(--icon-blue)",
      bgColor: "var(--icon-blue-bg)"
    },
    {
      icon: TrendingUp,
      title: "Growth & GTM",
      description: "Data-driven strategies that accelerate market entry and revenue growth",
      features: ["Market Analysis", "Sales Optimization", "Performance Marketing"],
      iconColor: "var(--icon-green)",
      bgColor: "var(--icon-green-bg)"
    },
    {
      icon: Palette,
      title: "Creative & Content",
      description: "Brand experiences that resonate with your target markets and drive conversion",
      features: ["Brand Strategy", "Content Systems", "Design Systems"],
      iconColor: "var(--icon-indigo)",
      bgColor: "var(--icon-indigo-bg)"
    },
    {
      icon: Settings,
      title: "Revenue Ops",
      description: "Operational excellence that ensures sustainable growth and profitability",
      features: ["Sales Operations", "Customer Success", "Business Intelligence"],
      iconColor: "var(--icon-red)",
      bgColor: "var(--icon-red-bg)"
    }
  ];

  return (
    <div>
        <div className={`text-center ${MARGIN_BOTTOM.section} animate-fade-in`}>
          <h2 className={`${HEADING_SIZES.h2} font-bold text-foreground ${MARGIN_BOTTOM.default} leading-tight`}>
            Complete business{" "}
            <span className="text-primary">ecosystems</span>
          </h2>
          <p className={`${TEXT_SIZES.medium} text-muted-foreground max-w-3xl mx-auto leading-relaxed`}>
            Five integrated service pillars that work together to create 
            revenue-generating business systems.
          </p>
        </div>

        <div className={`${GRID_COLS.three} ${GAP.medium}`}>
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <AnimatedCard
                key={service.title}
                delay={index * ANIMATION_DELAYS.SMALL}
                direction="up"
                className={`group ${CARD_PADDING.responsive} bg-gradient-card ${BORDER_RADIUS.xl} ${SHADOWS.soft} hover:${SHADOWS.medium} transition-all ${TRANSITIONS.default} ease-out ${HOVER_EFFECTS.lift} ${HOVER_EFFECTS.scale} ${HOVER_EFFECTS.scaleDown}`}
              >
                <div 
                  className={`${ICON_CONTAINER.large} ${BORDER_RADIUS.xl} flex items-center justify-center ${MARGIN_BOTTOM.default} group-hover:scale-110 transition-transform ${TRANSITIONS.default} ease-bounce mx-auto`}
                  style={{ backgroundColor: service.bgColor }}
                >
                  <Icon 
                    className={`${ICON_SIZES.large} flex-shrink-0 mx-auto my-auto`}
                    style={{ color: service.iconColor }}
                  />
                </div>
                
                <h3 className={`${HEADING_SIZES.h4} font-bold text-foreground ${MARGIN_BOTTOM.small} leading-tight`}>
                  {service.title}
                </h3>
                
                <p className={`text-muted-foreground ${MARGIN_BOTTOM.default} leading-relaxed`}>
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-base text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </AnimatedCard>
            );
          })}
        </div>
    </div>
  );
};

export default ServicesGrid;