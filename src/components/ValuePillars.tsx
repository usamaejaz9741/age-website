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
      description: "Every solution optimized for measurable business outcomes and revenue impact"
    },
    {
      icon: Brain,
      title: "AI-embedded",
      description: "Native AI integration across automation, analytics, and decision-making processes"
    },
    {
      icon: Layers,
      title: "Full-stack delivery",
      description: "End-to-end execution from strategy through implementation and optimization"
    },
    {
      icon: Globe,
      title: "Emerging-market edge",
      description: "Deep expertise in high-growth markets with localized strategies that scale"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Built different, built to{" "}
            <span className="text-primary">win</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We don't just build software—we engineer complete revenue systems 
            designed for the realities of emerging markets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <AnimatedCard
                key={pillar.title}
                delay={index * 100}
                direction="up"
                className="group p-4 sm:p-6 md:p-8 bg-gradient-card rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValuePillars;