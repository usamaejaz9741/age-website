/**
 * Value Pillars Component - Core Value Propositions
 * 
 * This component displays the four core value pillars that differentiate
 * Alvi Global Enterprises from competitors. It showcases the unique
 * approach and methodology in an animated grid layout.
 * 
 * Features:
 * - Four core value pillars with detailed descriptions
 * - Animated cards with scroll-triggered animations
 * - Responsive grid layout for different screen sizes
 * - Icon-based visual representation for each pillar
 * - Hover effects and smooth transitions
 */

import { Zap, Brain, Layers, Globe } from "lucide-react";
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
 * Value Pillars component displaying core value propositions
 * 
 * @returns JSX element with animated value pillar cards
 */
const ValuePillars = () => {
  const pillars = [
    {
      icon: Zap,
      title: "Performance-first",
      description: "Every solution optimized for measurable business outcomes and revenue impact",
      iconColor: "var(--icon-purple)",
      bgColor: "var(--icon-purple-bg)"
    },
    {
      icon: Brain,
      title: "AI-embedded",
      description: "Native AI integration across automation, analytics, and decision-making processes",
      iconColor: "var(--icon-blue)",
      bgColor: "var(--icon-blue-bg)"
    },
    {
      icon: Layers,
      title: "Full-stack delivery",
      description: "End-to-end execution from strategy through implementation and optimization",
      iconColor: "var(--icon-green)",
      bgColor: "var(--icon-green-bg)"
    },
    {
      icon: Globe,
      title: "Emerging-market edge",
      description: "Deep expertise in high-growth markets with localized strategies that scale",
      iconColor: "var(--icon-indigo)",
      bgColor: "var(--icon-indigo-bg)"
    }
  ];

  return (
    <div>
        <div className={`text-center ${MARGIN_BOTTOM.section} animate-fade-in`}>
          <h2 className={`${HEADING_SIZES.h2} text-foreground ${MARGIN_BOTTOM.default}`}>
            Built different, built to{" "}
            <span className="text-primary">win</span>
          </h2>
          <p className={`${TEXT_SIZES.medium} text-muted-foreground max-w-3xl mx-auto`}>
            We don't just build software—we engineer complete revenue systems 
            designed for the realities of emerging markets.
          </p>
        </div>

        <div className={`${GRID_COLS.four} ${GAP.medium}`}>
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <AnimatedCard
                key={pillar.title}
                delay={index * ANIMATION_DELAYS.SMALL}
                direction="up"
                className={`group ${CARD_PADDING.responsive} bg-gradient-card ${BORDER_RADIUS.xl} ${SHADOWS.soft} hover:${SHADOWS.medium} transition-all ${TRANSITIONS.default} ease-out ${HOVER_EFFECTS.lift} ${HOVER_EFFECTS.scale} ${HOVER_EFFECTS.scaleDown}`}
              >
                <div 
                  className={`${ICON_CONTAINER.large} ${BORDER_RADIUS.xl} flex items-center justify-center ${MARGIN_BOTTOM.default} group-hover:scale-110 transition-transform ${TRANSITIONS.default} ease-bounce mx-auto`}
                  style={{ backgroundColor: pillar.bgColor }}
                >
                  <Icon 
                    className={`${ICON_SIZES.large} flex-shrink-0 mx-auto my-auto`}
                    style={{ color: pillar.iconColor }}
                  />
                </div>
                <h3 className={`${HEADING_SIZES.h5} text-foreground ${MARGIN_BOTTOM.small}`}>
                  {pillar.title}
                </h3>
                <p className={`${TEXT_SIZES.base} text-muted-foreground`}>
                  {pillar.description}
                </p>
              </AnimatedCard>
            );
          })}
        </div>
    </div>
  );
};

export default ValuePillars;