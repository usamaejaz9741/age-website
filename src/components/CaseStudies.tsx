/**
 * Case Studies Component - Success Stories and Results
 * 
 * This component showcases real client success stories with detailed metrics
 * and results. It features animated counters for key performance indicators
 * and provides social proof through concrete business outcomes.
 * 
 * Features:
 * - Real client case studies with before/after metrics
 * - Animated counters for revenue growth and key metrics
 * - Responsive grid layout for different screen sizes
 * - Scroll-triggered animations using intersection observer
 * - Call-to-action for consultation booking
 */

import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import { AnimatedCard } from "@/components/ui/animated-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ANIMATION_DURATIONS } from "@/constants/animations";
import { 
  HEADING_SIZES, 
  TEXT_SIZES, 
  MARGIN_BOTTOM, 
  CARD_PADDING, 
  BORDER_RADIUS,
  SHADOWS,
  GAP,
  GRID_COLS,
  TRANSITIONS,
  HOVER_EFFECTS
} from "@/constants/design-system";

/**
 * Case Studies component displaying client success stories and metrics
 * 
 * @returns JSX element with case studies and animated metrics
 */
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
      highlight: { value: 312, suffix: "% revenue growth" }
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
      highlight: { value: 263, suffix: "% revenue growth" }
    }
  ];

  return (
    <div>
        <div className={`text-center ${MARGIN_BOTTOM.section} animate-fade-in`}>
          <h2 className={`${HEADING_SIZES.h2} font-bold text-foreground ${MARGIN_BOTTOM.default} leading-tight`}>
            Results that{" "}
            <span className="text-primary">speak numbers</span>
          </h2>
          <p className={`${TEXT_SIZES.medium} text-muted-foreground max-w-3xl mx-auto leading-relaxed`}>
            Real companies, real growth, real revenue impact.
          </p>
        </div>

        <div className={`${GRID_COLS.twoLarge} gap-12 ${MARGIN_BOTTOM.section}`} role="list" aria-label="Client case studies">
          {cases.map((caseStudy, index) => (
            <AnimatedCard
              key={caseStudy.company}
              delay={index * ANIMATION_DURATIONS.CASE_STUDY_STAGGER}
              direction="up"
              className={`group ${CARD_PADDING.responsive} bg-gradient-card ${BORDER_RADIUS.xl} ${SHADOWS.soft} hover:${SHADOWS.medium} transition-all ${TRANSITIONS.default} ease-out`}
              role="listitem"
            >
              {/* Header */}
              <div className={`flex items-center justify-between ${MARGIN_BOTTOM.default}`}>
                <div className="text-left">
                  <h3 className={`${HEADING_SIZES.h4} font-bold text-foreground mb-1`}>
                    {caseStudy.company}
                  </h3>
                  <p className="text-muted-foreground" aria-label={`Industry: ${caseStudy.industry}`}>{caseStudy.industry}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                    <AnimatedCounter
                      endValue={caseStudy.highlight.value}
                      duration={ANIMATION_DURATIONS.COUNTER_SLOW}
                      delay={index * 300}
                      suffix={caseStudy.highlight.suffix}
                    />
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
              <div className="grid grid-cols-3 gap-4 p-6 bg-muted/30 rounded-xl">
                <div className="text-center">
                  <div className="text-base text-muted-foreground mb-1">Revenue</div>
                  <div className="text-xs text-destructive mb-1">{caseStudy.results.before.revenue}</div>
                  <TrendingUp className="w-4 h-4 mx-auto mb-1 text-[var(--icon-green)] flex-shrink-0" />
                  <div className="text-base font-semibold text-[var(--icon-green)]">{caseStudy.results.after.revenue}</div>
                </div>
                <div className="text-center">
                  <div className="text-base text-muted-foreground mb-1">Conversion</div>
                  <div className="text-xs text-destructive mb-1">{caseStudy.results.before.conversion}</div>
                  <TrendingUp className="w-4 h-4 mx-auto mb-1 text-[var(--icon-blue)] flex-shrink-0" />
                  <div className="text-base font-semibold text-[var(--icon-blue)]">{caseStudy.results.after.conversion}</div>
                </div>
                <div className="text-center">
                  <div className="text-base text-muted-foreground mb-1">CAC</div>
                  <div className="text-xs text-destructive mb-1">{caseStudy.results.before.cac}</div>
                  <TrendingUp className="w-4 h-4 mx-auto mb-1 rotate-180 text-[var(--icon-red)] flex-shrink-0" />
                  <div className="text-base font-semibold text-[var(--icon-red)]">{caseStudy.results.after.cac}</div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>

        <div className="text-center">
          <Button variant="cta-outline" size="lg" className="group">
            View All Case Studies
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
    </div>
  );
};

export default CaseStudies;