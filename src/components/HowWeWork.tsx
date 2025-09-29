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

/**
 * How We Work component displaying the 90-day methodology
 * 
 * @returns JSX element with animated process cards
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
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            <span className="text-primary">90 days</span> to revenue
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our proven methodology delivers measurable results in 3 months, 
            not 3 years.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <AnimatedCard
                key={step.title}
                delay={index * 200}
                direction="up"
                className="relative group"
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30 z-0" />
                )}
                
                <div className="relative p-4 sm:p-6 md:p-8 bg-gradient-card rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 ease-out hover:-translate-y-1">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ease-bounce mx-auto"
                    style={{ backgroundColor: step.bgColor }}
                  >
                    <Icon 
                      className="w-8 h-8 flex-shrink-0 mx-auto my-auto" 
                      style={{ color: step.iconColor }}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-foreground leading-tight">
                      {step.title}
                    </div>
                    <div className="text-primary font-bold text-base sm:text-lg">
                      {step.subtitle}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    {step.description}
                  </p>

                  <ul className="space-y-2">
                    {step.features.map((feature) => (
                      <li key={feature} className="flex items-center text-base text-muted-foreground">
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
        <div className="relative p-8 bg-gradient-card rounded-xl shadow-soft">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="text-3xl font-bold text-primary mb-2">30</div>
              <div className="text-base text-muted-foreground">Days to MVP</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-3xl font-bold text-primary mb-2">60</div>
              <div className="text-base text-muted-foreground">Days to optimization</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="text-3xl font-bold text-primary mb-2">90</div>
              <div className="text-base text-muted-foreground">Days to scale</div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default HowWeWork;