import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";

const CaseStudies = () => {
  const cases = [
    {
      company: "FintechScale",
      industry: "Financial Services",
      challenge: "Market entry in SEA",
      results: {
        before: { revenue: "$2.1M ARR", conversion: "1.2%", cac: "$450" },
        after: { revenue: "$8.7M ARR", conversion: "4.1%", cac: "$280" }
      },
      timeframe: "12 months",
      highlight: "312% revenue growth"
    },
    {
      company: "PropTech Pro",
      industry: "Real Estate Tech",
      challenge: "Scaling operations across 3 markets",
      results: {
        before: { revenue: "$5.2M ARR", conversion: "2.8%", cac: "$680" },
        after: { revenue: "$18.9M ARR", conversion: "6.2%", cac: "$420" }
      },
      timeframe: "18 months", 
      highlight: "263% revenue growth"
    }
  ];

  return (
    <section id="case-studies" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Results that{" "}
            <span className="text-primary">speak numbers</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real companies, real growth, real revenue impact.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {cases.map((caseStudy, index) => (
            <div 
              key={caseStudy.company}
              className="group p-8 bg-gradient-card rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">
                    {caseStudy.company}
                  </h3>
                  <p className="text-muted-foreground">{caseStudy.industry}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                    {caseStudy.highlight}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    in {caseStudy.timeframe}
                  </div>
                </div>
              </div>

              {/* Challenge */}
              <div className="mb-6">
                <h4 className="font-semibold text-foreground mb-2">Challenge:</h4>
                <p className="text-muted-foreground">{caseStudy.challenge}</p>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-3 gap-4 p-6 bg-muted/30 rounded-lg">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">Revenue</div>
                  <div className="text-xs text-destructive mb-1">{caseStudy.results.before.revenue}</div>
                  <TrendingUp className="w-4 h-4 text-primary mx-auto mb-1" />
                  <div className="text-sm font-semibold text-primary">{caseStudy.results.after.revenue}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">Conversion</div>
                  <div className="text-xs text-destructive mb-1">{caseStudy.results.before.conversion}</div>
                  <TrendingUp className="w-4 h-4 text-primary mx-auto mb-1" />
                  <div className="text-sm font-semibold text-primary">{caseStudy.results.after.conversion}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">CAC</div>
                  <div className="text-xs text-destructive mb-1">{caseStudy.results.before.cac}</div>
                  <TrendingUp className="w-4 h-4 text-primary mx-auto mb-1 rotate-180" />
                  <div className="text-sm font-semibold text-primary">{caseStudy.results.after.cac}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="cta-outline" size="lg" className="group">
            View All Case Studies
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;