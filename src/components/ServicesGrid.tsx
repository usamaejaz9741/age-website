import { Bot, Code, TrendingUp, Palette, Settings } from "lucide-react";

const ServicesGrid = () => {
  const services = [
    {
      icon: Bot,
      title: "AI & Automation",
      description: "Intelligent systems that scale your operations and reduce manual overhead",
      features: ["Process Automation", "AI-Powered Analytics", "Smart Decision Systems"]
    },
    {
      icon: Code,
      title: "Product & Engineering", 
      description: "Full-stack development with performance and scalability at the core",
      features: ["Custom Software", "API Development", "Cloud Infrastructure"]
    },
    {
      icon: TrendingUp,
      title: "Growth & GTM",
      description: "Data-driven strategies that accelerate market entry and revenue growth",
      features: ["Market Analysis", "Sales Optimization", "Performance Marketing"]
    },
    {
      icon: Palette,
      title: "Creative & Content",
      description: "Brand experiences that resonate with your target markets and drive conversion",
      features: ["Brand Strategy", "Content Systems", "Design Systems"]
    },
    {
      icon: Settings,
      title: "Revenue Ops",
      description: "Operational excellence that ensures sustainable growth and profitability",
      features: ["Sales Operations", "Customer Success", "Business Intelligence"]
    }
  ];

  return (
    <section id="services" className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Complete business{" "}
            <span className="text-primary">ecosystems</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Five integrated service pillars that work together to create 
            revenue-generating business systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.title}
                className="group p-4 sm:p-6 md:p-8 bg-card rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;