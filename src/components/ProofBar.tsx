/**
 * Proof Bar Component - Social Proof and Key Metrics
 * 
 * This component displays key performance metrics and partner logos to build
 * credibility and social proof. It features animated counters that count up
 * when scrolled into view, creating an engaging visual experience.
 * 
 * Features:
 * - Animated counters for key metrics (Lead Velocity, CAC Reduction, etc.)
 * - Staggered animation timing for visual appeal
 * - Responsive grid layout for different screen sizes
 * - Partner logos for social proof
 * - Scroll-triggered animations using intersection observer
 */

import { AnimatedCounter } from "@/components/ui/animated-counter";
import { AnimatedCard } from "@/components/ui/animated-card";

/**
 * Proof Bar component displaying key metrics and partner logos
 * 
 * @returns JSX element with animated metrics and partner logos
 */
const ProofBar = () => {
  const metrics = [
    { value: 3, suffix: "×", label: "Lead Velocity" },
    { value: 27, prefix: "−", suffix: "%", label: "CAC Reduction" },
    { value: 180, suffix: "%", label: "Revenue Growth" },
    { value: 45, suffix: "%", label: "Faster GTM" },
  ];

  const partners = [
    "TechCorp",
    "InnovateLab", 
    "GrowthCo",
    "ScaleUp",
    "FintechPro",
    "DataFlow",
  ];

  return (
    <section className="py-16 bg-muted/30 border-t">
      <div className="max-w-7xl mx-auto px-6">
        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <AnimatedCard
              key={metric.label}
              delay={index * 100}
              direction="up"
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">
                <AnimatedCounter
                  endValue={metric.value}
                  duration={2000}
                  delay={index * 200}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                />
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wide">
                {metric.label}
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* Partners */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground uppercase tracking-wide mb-8 font-medium">
            Trusted by industry leaders
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {partners.map((partner, index) => (
              <div 
                key={partner}
                className="text-center opacity-60 hover:opacity-100 transition-opacity animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-12 flex items-center justify-center">
                  <span className="text-lg font-semibold text-muted-foreground">
                    {partner}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProofBar;