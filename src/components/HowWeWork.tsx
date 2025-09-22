import { Calendar, BarChart3, Rocket } from "lucide-react";

const HowWeWork = () => {
  const steps = [
    {
      icon: Calendar,
      title: "BUILD",
      subtitle: "Days 1-30",
      description: "Strategic foundation, system architecture, and initial deployment",
      features: ["Market analysis & positioning", "Tech stack selection", "MVP development", "Team integration"]
    },
    {
      icon: BarChart3, 
      title: "MEASURE",
      subtitle: "Days 31-60",
      description: "Data collection, performance tracking, and optimization insights",
      features: ["KPI dashboard setup", "User behavior analysis", "Performance monitoring", "Feedback loops"]
    },
    {
      icon: Rocket,
      title: "SCALE",
      subtitle: "Days 61-90",
      description: "Growth acceleration, market expansion, and revenue optimization",
      features: ["Growth strategy execution", "Market expansion", "Revenue optimization", "Sustainable systems"]
    }
  ];

  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="text-success">90 days</span> to revenue
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our proven methodology delivers measurable results in 3 months, 
            not 3 years.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.title}
                className="relative group animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-success/30 z-0" />
                )}
                
                <div className="relative p-8 bg-card rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-success/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-success" />
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-foreground">
                      {step.title}
                    </div>
                    <div className="text-success font-semibold">
                      {step.subtitle}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  <ul className="space-y-2">
                    {step.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-success rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline Visualization */}
        <div className="relative p-8 bg-gradient-card rounded-xl shadow-soft">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="text-3xl font-bold text-success mb-2">30</div>
              <div className="text-sm text-muted-foreground">Days to MVP</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-3xl font-bold text-success mb-2">60</div>
              <div className="text-sm text-muted-foreground">Days to optimization</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="text-3xl font-bold text-success mb-2">90</div>
              <div className="text-sm text-muted-foreground">Days to scale</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;