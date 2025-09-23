import { Brain, DollarSign, Home, Plane, ShoppingCart } from "lucide-react";

const Industries = () => {
  const industries = [
    {
      icon: Brain,
      name: "AI & Machine Learning",
      description: "Next-gen AI solutions for enterprise automation and intelligence"
    },
    {
      icon: DollarSign,
      name: "Fintech & Banking",
      description: "Digital financial services and payment platform development"
    },
    {
      icon: Home,
      name: "Real Estate Tech",
      description: "PropTech solutions for property management and transactions"
    },
    {
      icon: Plane,
      name: "Travel & Hospitality",
      description: "Booking platforms and customer experience optimization"
    },
    {
      icon: ShoppingCart,
      name: "E-commerce & Retail",
      description: "Omnichannel commerce and marketplace solutions"
    }
  ];

  return (
    <section id="industries" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Industries we{" "}
            <span className="text-primary">accelerate</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Deep domain expertise across high-growth sectors in emerging markets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div 
                key={industry.name}
                className="group p-4 sm:p-6 md:p-8 bg-gradient-card rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 animate-slide-up cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {industry.name}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {industry.description}
                </p>

                <div className="mt-6 flex items-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more →
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center p-8 bg-gradient-hero rounded-xl">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Don't see your industry?
          </h3>
          <p className="text-muted-foreground mb-6">
            We adapt our expertise to any high-growth market opportunity.
          </p>
          <button className="text-primary font-semibold hover:underline">
            Discuss your market →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Industries;