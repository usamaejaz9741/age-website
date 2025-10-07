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
import { useState, useCallback } from "react";
import { validateEmail, sanitizeEmail } from "@/lib/security";
import { ErrorMessage } from "@/components/ui/error-message";
import { 
  HEADING_SIZES, 
  TEXT_SIZES, 
  MARGIN_BOTTOM, 
  CARD_PADDING, 
  ICON_CONTAINER, 
  ICON_SIZES, 
  BORDER_RADIUS,
  SHADOWS,
  GAP,
  GRID_COLS,
  TRANSITIONS,
  HOVER_EFFECTS
} from "@/constants/design-system";
import { ANIMATION_DELAYS } from "@/constants/animations";
import { ERROR_MESSAGES } from "@/constants/messages";

/**
 * Content Teaser component displaying content offerings and subscription form
 * 
 * @returns JSX element with content teasers and subscription form
 */
const ContentTeaser = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = useCallback((value: string) => {
    // Sanitize email input and limit length
    const sanitized = sanitizeEmail(value).substring(0, 254);
    setEmail(sanitized);
    setEmailError(""); // Clear error when user starts typing
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email before submission
    if (!validateEmail(email)) {
      setEmailError(ERROR_MESSAGES.INVALID_EMAIL);
      return;
    }
    
    // Handle email subscription
    // Note: Subscription logic should be implemented based on requirements
    // This could integrate with email marketing services like Mailchimp, ConvertKit, etc.
    
    // Clear form after successful submission
    setEmail("");
    setEmailError("");
  }, [email]);

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
        <div className={`text-center ${MARGIN_BOTTOM.section} animate-fade-in`}>
          <h2 className={`${HEADING_SIZES.h2} text-foreground ${MARGIN_BOTTOM.default}`}>
            Stay ahead with{" "}
            <span className="text-primary">actionable insights</span>
          </h2>
          <p className={`${TEXT_SIZES.medium} text-muted-foreground max-w-3xl mx-auto`}>
            Get exclusive access to growth strategies, market intelligence, 
            and revenue optimization tactics that work in emerging markets.
          </p>
        </div>

        <div className={`${GRID_COLS.three} ${GAP.medium} ${MARGIN_BOTTOM.section}`}>
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <AnimatedCard
                key={insight.title}
                delay={index * ANIMATION_DELAYS.SMALL}
                direction="up"
                className={`group ${CARD_PADDING.responsive} bg-gradient-card ${BORDER_RADIUS.xl} ${SHADOWS.soft} hover:${SHADOWS.medium} transition-all ${TRANSITIONS.default} ease-out ${HOVER_EFFECTS.lift} cursor-pointer`}
              >
                <div 
                  className={`${ICON_CONTAINER.large} ${BORDER_RADIUS.xl} flex items-center justify-center ${MARGIN_BOTTOM.default} group-hover:scale-110 transition-transform ${TRANSITIONS.default} ease-bounce mx-auto`}
                  style={{ backgroundColor: insight.bgColor }}
                >
                  <Icon 
                    className={`${ICON_SIZES.large} flex-shrink-0 mx-auto my-auto`}
                    style={{ color: insight.iconColor }}
                  />
                </div>
                
                <div className={`${TEXT_SIZES.xs} text-primary font-semibold uppercase tracking-wide ${MARGIN_BOTTOM.xs}`}>
                  {insight.type}
                </div>
                
                <h3 className={`${HEADING_SIZES.h4} text-foreground ${MARGIN_BOTTOM.small} group-hover:text-primary transition-colors`}>
                  {insight.title}
                </h3>
                
                <p className={`${TEXT_SIZES.base} text-muted-foreground`}>
                  {insight.description}
                </p>

                <div className={`mt-4 flex items-center justify-center ${TEXT_SIZES.base} text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity ${TRANSITIONS.default}`}>
                  Access now →
                </div>
              </AnimatedCard>
            );
          })}
        </div>

        {/* Email Capture */}
        <div className={`max-w-2xl mx-auto ${CARD_PADDING.large} bg-gradient-card ${BORDER_RADIUS.xl} ${SHADOWS.medium}`}>
          <div className={`text-center ${MARGIN_BOTTOM.default}`}>
            <h3 className={`${HEADING_SIZES.h4} text-foreground ${MARGIN_BOTTOM.small}`}>
              Get started today
            </h3>
            <p className={`${TEXT_SIZES.base} text-muted-foreground`}>
              Join 500+ growth leaders getting weekly insights that drive results.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                className="w-full min-h-[44px]"
                required
                aria-label="Email address for subscription"
                aria-invalid={emailError ? "true" : "false"}
                aria-describedby={emailError ? "email-subscription-error" : undefined}
              />
              {emailError && (
                <div className="mt-2">
                  <ErrorMessage
                    id="email-subscription-error"
                    message={emailError}
                    variant="inline"
                    severity="error"
                  />
                </div>
              )}
            </div>
            <Button 
              type="submit" 
              variant="cta" 
              size="lg" 
              className="sm:w-auto min-h-[44px]"
              disabled={!email}
            >
              <Mail className="mr-2 w-4 h-4" aria-hidden="true" />
              Subscribe
            </Button>
          </form>

          <p className={`${TEXT_SIZES.small} text-muted-foreground text-center mt-4`}>
            No spam. Unsubscribe anytime. Read our{" "}
            <button 
              type="button"
              className="text-primary hover:underline"
              onClick={() => window.open('/privacy-policy', '_blank', 'noopener,noreferrer')}
              aria-label="Read our privacy policy in a new tab"
            >
              privacy policy
            </button>.
          </p>
        </div>
    </div>
  );
};

export default ContentTeaser;