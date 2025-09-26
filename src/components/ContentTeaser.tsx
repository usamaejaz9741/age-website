/**
 * Content Teaser Component - Lead Generation and Content Marketing
 * 
 * This component showcases valuable content offerings and provides a lead
 * generation form for users to subscribe to insights, guides, and tools.
 * It displays three key content types with descriptions and a subscription form.
 * 
 * Features:
 * - Three content offerings with detailed descriptions
 * - Email subscription form for lead generation
 * - Responsive grid layout for different screen sizes
 * - Icon-based visual representation for each content type
 * - Form validation and submission handling
 */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedCard } from "@/components/ui/animated-card";
import { Mail, FileText, TrendingUp } from "lucide-react";
import { useState } from "react";

/**
 * Content Teaser component displaying content offerings and subscription form
 * 
 * @returns JSX element with content teasers and subscription form
 */
const ContentTeaser = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email subscription
    setEmail("");
  };

  const insights = [
    {
      icon: TrendingUp,
      title: "Emerging Market Playbook 2025",
      description: "Complete strategy guide for scaling B2B SaaS in Southeast Asia",
      type: "Strategy Guide",
      iconColor: "var(--icon-purple)",
      bgColor: "var(--icon-purple-bg)"
    },
    {
      icon: FileText,
      title: "AI Automation ROI Calculator",
      description: "Calculate potential savings and revenue impact of AI implementation",
      type: "Interactive Tool",
      iconColor: "var(--icon-blue)",
      bgColor: "var(--icon-blue-bg)"
    },
    {
      icon: Mail,
      title: "Weekly Growth Insights",
      description: "Data-driven strategies and market intelligence delivered weekly",
      type: "Newsletter",
      iconColor: "var(--icon-green)",
      bgColor: "var(--icon-green-bg)"
    }
  ];

  return (
    <div>
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
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
              <AnimatedCard
                key={insight.title}
                delay={index * 100}
                direction="up"
                className="group p-4 sm:p-6 md:p-8 bg-gradient-card rounded-xl shadow-soft hover:shadow-medium transition-all duration-500 ease-gentle hover:-translate-y-1 cursor-pointer"
              >
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ease-bounce"
                  style={{ backgroundColor: insight.bgColor }}
                >
                  <Icon 
                    className="w-8 h-8" 
                    style={{ color: insight.iconColor }}
                  />
                </div>
                
                <div className="text-xs text-primary font-semibold uppercase tracking-wide mb-2">
                  {insight.type}
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                  {insight.title}
                </h3>
                
                <p className="text-base text-muted-foreground leading-relaxed">
                  {insight.description}
                </p>

                <div className="mt-4 flex items-center text-base text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Access now →
                </div>
              </AnimatedCard>
            );
          })}
        </div>

        {/* Email Capture */}
        <div className="max-w-2xl mx-auto p-8 bg-gradient-card rounded-xl shadow-medium">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-foreground mb-4 leading-tight">
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

          <p className="text-sm text-muted-foreground text-center mt-4">
            No spam. Unsubscribe anytime. Read our{" "}
            <button className="text-primary hover:underline">privacy policy</button>.
          </p>
        </div>
    </div>
  );
};

export default ContentTeaser;