/**
 * How We Work Component - Process and Methodology
 * 
 * This component displays the three-phase methodology used by Alvi Global
 * Enterprises to deliver results in 90 days. It showcases the BUILD, MEASURE,
 * and SCALE phases with detailed descriptions and features.
 * 
 * Features:
 * - Three-phase methodology (BUILD, MEASURE, SCALE)
 * - Timeline-based approach (30-day phases)
 * - Animated cards with scroll-triggered animations
 * - Responsive grid layout for different screen sizes
 * - Feature lists for each phase
 */

import { Calendar, BarChart3, Rocket } from "lucide-react";
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
import { ANIMATION_DURATIONS } from "@/constants/animations";

/**
 * Renders a section explaining the company's 90-day methodology.
 *
 * This component visually breaks down the "BUILD, MEASURE, SCALE" process into three
 * distinct phases, each presented in an animated card. It highlights the key activities
 * and timeline for each phase, reinforcing the company's promise of delivering results
 * within a 90-day timeframe.
 *
 * @returns {JSX.Element} The "How We Work" section, including animated cards for each phase of the methodology.
 */
const HowWeWork = () => {
  const steps = [
    {
      icon: Calendar,
      title: "BUILD",
      subtitle: "Days 1-30",
      description: "Strategic foundation, system architecture, and initial deployment",
      features: ["Market analysis & positioning", "Tech stack selection", "MVP development", "Team integration"],
      iconColor: "var(--icon-purple)",
      bgColor: "var(--icon-purple-bg)"
    },
    {
      icon: BarChart3, 
      title: "MEASURE",
      subtitle: "Days 31-60",
      description: "Data collection, performance tracking, and optimization insights",
      features: ["KPI dashboard setup", "User behavior analysis", "Performance monitoring", "Feedback loops"],
      iconColor: "var(--icon-blue)",
      bgColor: "var(--icon-blue-bg)"
    },
    {
      icon: Rocket,
      title: "SCALE",
      subtitle: "Days 61-90",
      description: "Growth acceleration, market expansion, and revenue optimization",
      features: ["Growth strategy execution", "Market expansion", "Revenue optimization", "Sustainable systems"],
      iconColor: "var(--icon-green)",
      bgColor: "var(--icon-green-bg)"
    }
  ];

  return (
    <div>
        <div className={`text-center ${MARGIN_BOTTOM.section} animate-fade-in`}>
          <h2 className={`${HEADING_SIZES.h2} text-foreground ${MARGIN_BOTTOM.default}`}>
            <span className="text-primary">90 days</span> to revenue
          </h2>
          <p className={`${TEXT_SIZES.medium} text-muted-foreground max-w-3xl mx-auto`}>
            Our proven methodology delivers measurable results in 3 months, 
            not 3 years.
          </p>
        </div>

        <div className={`${GRID_COLS.three} ${GAP.medium} ${MARGIN_BOTTOM.section}`}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <AnimatedCard
                key={step.title}
                delay={index * ANIMATION_DURATIONS.CASE_STUDY_STAGGER}
                direction="up"
                className="relative group"
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30 z-0" />
                )}
                
                <div className={`relative ${CARD_PADDING.responsive} bg-gradient-card ${BORDER_RADIUS.xl} ${SHADOWS.soft} hover:${SHADOWS.medium} transition-all ${TRANSITIONS.default} ease-out ${HOVER_EFFECTS.lift}`}>
                  <div 
                    className={`${ICON_CONTAINER.large} ${BORDER_RADIUS.xl} flex items-center justify-center ${MARGIN_BOTTOM.default} group-hover:scale-110 transition-transform ${TRANSITIONS.default} ease-bounce mx-auto`}
                    style={{ backgroundColor: step.bgColor }}
                  >
                    <Icon 
                      className={`${ICON_SIZES.large} flex-shrink-0 mx-auto my-auto`}
                      style={{ color: step.iconColor }}
                    />
                  </div>
                  
                  <div className={MARGIN_BOTTOM.small}>
                    <div className={`${HEADING_SIZES.h4} text-foreground`}>
                      {step.title}
                    </div>
                    <div className={`${TEXT_SIZES.base} text-primary font-bold`}>
                      {step.subtitle}
                    </div>
                  </div>
                  
                  <p className={`${TEXT_SIZES.base} text-muted-foreground ${MARGIN_BOTTOM.large}`}>
                    {step.description}
                  </p>

                  <ul className={GAP.xs}>
                    {step.features.map((feature) => (
                      <li key={feature} className={`flex items-center ${TEXT_SIZES.base} text-muted-foreground`}>
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedCard>
            );
          })}
        </div>

        {/* Timeline Visualization */}
        <div className={`relative ${CARD_PADDING.large} bg-gradient-card ${BORDER_RADIUS.xl} ${SHADOWS.soft}`}>
          <div className={`grid grid-cols-3 ${GAP.small} text-center`}>
            <div className="animate-fade-in" style={{ animationDelay: "var(--animation-delay-small)" }}>
              <div className={`${HEADING_SIZES.h3} text-primary ${MARGIN_BOTTOM.xs}`}>30</div>
              <div className={`${TEXT_SIZES.base} text-muted-foreground`}>Days to MVP</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "var(--animation-delay-medium)" }}>
              <div className={`${HEADING_SIZES.h3} text-primary ${MARGIN_BOTTOM.xs}`}>60</div>
              <div className={`${TEXT_SIZES.base} text-muted-foreground`}>Days to optimization</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "var(--animation-delay-large)" }}>
              <div className={`${HEADING_SIZES.h3} text-primary ${MARGIN_BOTTOM.xs}`}>90</div>
              <div className={`${TEXT_SIZES.base} text-muted-foreground`}>Days to scale</div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default HowWeWork;