import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, FileText, TrendingUp } from "lucide-react";
import { useState } from "react";

const ContentTeaser = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email subscription
    console.log("Email submitted:", email);
    setEmail("");
  };

  const insights = [
    {
      icon: TrendingUp,
      title: "Emerging Market Playbook 2025",
      description: "Complete strategy guide for scaling B2B SaaS in Southeast Asia",
      type: "Strategy Guide"
    },
    {
      icon: FileText,
      title: "AI Automation ROI Calculator",
      description: "Calculate potential savings and revenue impact of AI implementation",
      type: "Interactive Tool"
    },
    {
      icon: Mail,
      title: "Weekly Growth Insights",
      description: "Data-driven strategies and market intelligence delivered weekly",
      type: "Newsletter"
    }
  ];

  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Stay ahead with{" "}
            <span className="text-primary">actionable insights</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get exclusive access to growth strategies, market intelligence, 
            and revenue optimization tactics that work in emerging markets.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div 
                key={insight.title}
                className="group p-6 bg-card rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 animate-slide-up cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                
                <div className="text-xs text-primary font-semibold uppercase tracking-wide mb-2">
                  {insight.type}
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {insight.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {insight.description}
                </p>

                <div className="mt-4 flex items-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Access now →
                </div>
              </div>
            );
          })}
        </div>

        {/* Email Capture */}
        <div className="max-w-2xl mx-auto p-8 bg-gradient-card rounded-xl shadow-medium">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Get started today
            </h3>
            <p className="text-muted-foreground">
              Join 500+ growth leaders getting weekly insights that drive results.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" variant="cta" size="lg" className="sm:w-auto">
              <Mail className="mr-2 w-4 h-4" />
              Subscribe
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-4">
            No spam. Unsubscribe anytime. Read our{" "}
            <button className="text-primary hover:underline">privacy policy</button>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContentTeaser;