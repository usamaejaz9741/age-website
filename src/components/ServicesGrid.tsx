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
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Complete business{" "}
            <span className="text-primary">ecosystems</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Five integrated service pillars that work together to create 
            revenue-generating business systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <AnimatedCard
                key={service.title}
                delay={index * 100}
                direction="up"
                className="group p-4 sm:p-6 md:p-8 bg-gradient-card rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ease-bounce mx-auto"
                  style={{ backgroundColor: service.bgColor }}
                >
                  <Icon 
                    className="w-8 h-8 flex-shrink-0 mx-auto my-auto" 
                    style={{ color: service.iconColor }}
                  />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4 leading-tight">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
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