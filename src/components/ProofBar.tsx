const ProofBar = () => {
  const metrics = [
    { value: "3×", label: "Lead Velocity" },
    { value: "−27%", label: "CAC Reduction" },
    { value: "180%", label: "Revenue Growth" },
    { value: "45%", label: "Faster GTM" },
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
            <div 
              key={metric.label}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {metric.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                {metric.label}
              </div>
            </div>
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