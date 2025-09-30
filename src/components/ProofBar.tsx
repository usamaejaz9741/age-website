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
 * - Client logos for social proof with hover effects
 * - Scroll-triggered animations using intersection observer
 */

import { AnimatedCounter } from "@/components/ui/animated-counter";
import { AnimatedCard } from "@/components/ui/animated-card";
import { getOptimizedImageAttrs, handleImageError } from "@/lib/image-utils";
import { ANIMATION_DURATIONS, ANIMATION_DELAYS } from "@/constants/animations";

/**
 * Proof Bar component displaying key metrics and client logos
 * 
 * @returns JSX element with animated metrics and client logos
 */
const ProofBar = () => {
  const metrics = [
    { value: 3, suffix: "×", label: "Lead Velocity" },
    { value: 27, prefix: "−", suffix: "%", label: "CAC Reduction" },
    { value: 180, suffix: "%", label: "Revenue Growth" },
    { value: 45, suffix: "%", label: "Faster GTM" },
  ];

  const clientLogos = [
    { name: "Boltshift", logo: "/assets/client-logos/boltshift.png" },
    { name: "FeatherDev", logo: "/assets/client-logos/featherdev.png" },
    { name: "GlobalBank", logo: "/assets/client-logos/globalbank.png" },
    { name: "Lightbox", logo: "/assets/client-logos/lightbox.png" },
    { name: "Nietzsche", logo: "/assets/client-logos/nietzsche.png" },
    { name: "Spherule", logo: "/assets/client-logos/spherule.png" },
  ];

  return (
    <div>
        {/* Metrics */}
        <section aria-label="Key performance metrics" className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <AnimatedCard
              key={metric.label}
              delay={index * ANIMATION_DELAYS.SMALL}
              direction="up"
              className="text-center"
            >
              <div 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2"
                aria-label={`${metric.prefix || ''}${metric.value}${metric.suffix || ''} ${metric.label}`}
              >
                <AnimatedCounter
                  endValue={metric.value}
                  duration={ANIMATION_DURATIONS.COUNTER_DEFAULT}
                  delay={index * ANIMATION_DURATIONS.METRIC_STAGGER}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  aria-hidden="true"
                />
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wide" aria-hidden="true">
                {metric.label}
              </div>
            </AnimatedCard>
          ))}
        </section>

        {/* Client Logos */}
        <section aria-label="Client logos and partnerships" className="text-center">
          <p className="text-base text-muted-foreground uppercase tracking-wide mb-8 font-medium">
            Trusted by industry leaders
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-12 items-center" role="list">
            {clientLogos.map((client, index) => (
              <div 
                key={client.name}
                className="text-center opacity-60 hover:opacity-100 transition-opacity"
                style={{ animationDelay: `${index * 0.1}s` }}
                role="listitem"
              >
                <div className="h-8 flex items-center justify-center">
                <img 
                  src={client.logo}
                  alt={`${client.name} - Trusted client partner`}
                  className="max-h-8 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500 ease-gentle"
                  {...getOptimizedImageAttrs('logo')}
                  onLoad={() => {
                    // Image loaded successfully
                  }}
                  onError={(e) => handleImageError(e)}
                />
                </div>
              </div>
            ))}
          </div>
        </section>
    </div>
  );
};

export default ProofBar;