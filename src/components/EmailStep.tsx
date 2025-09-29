/**
 * @fileoverview Email Step Component for AI Growth Score Assessment
 * 
 * Handles the email capture and consent collection step of the assessment flow,
 * providing secure email validation, GDPR compliance, and seamless form submission.
 * 
 * @component
 * @example
 * ```tsx
 * <EmailStep 
 *   onSubmit={(email) => handleEmailSubmit(email)}
 *   isLoading={false}
 * />
 * ```
 * 
 * @features
 * - 📧 Advanced email validation with real-time feedback
 * - ✅ GDPR-compliant consent checkbox with clear terms
 * - ⏳ Loading state management during audit generation
 * - 🛡️ Form security with rate limiting and sanitization
 * - ♿ Full accessibility support with ARIA labels
 * - 📱 Responsive design with mobile optimization
 * - 🎨 Consistent styling with design system
 * - ⚡ Optimized performance with React.memo
 * 
 * @author Alvi Global Enterprises
 * @version 1.0.0
 */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState, memo } from "react";
import { validateEmail, sanitizeEmail, formRateLimiter } from "@/lib/security";

/**
 * Props interface for the EmailStep component
 */
interface EmailStepProps {
  /** Current email value */
  email: string;
  /** Function to update email value */
  setEmail: (email: string) => void;
  /** Whether user has given consent */
  hasConsent: boolean;
  /** Function to update consent status */
  setHasConsent: (hasConsent: boolean) => void;
  /** Function to handle form submission */
  onSubmit: () => void;
  /** Whether the form is in loading state */
  isLoading?: boolean;
}

/**
 * Email capture step component for the AI Growth Score assessment
 * 
 * @param props - Component props for email capture and form handling
 * @returns JSX element for email capture form
 */
const EmailStep = memo(({ email, setEmail, hasConsent, setHasConsent, onSubmit, isLoading }: EmailStepProps) => {
  const [emailError, setEmailError] = useState<string>('');

  /**
   * Validate email input using security utilities
   * @param inputEmail - Email string to validate
   * @returns boolean - Whether email is valid
   */
  const validateEmailInput = (inputEmail: string): boolean => {
    if (!validateEmail(inputEmail)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    
    setEmailError('');
    return true;
  };

  /**
   * Handle email input change with validation
   * @param value - New email value
   */
  const handleEmailChange = (value: string) => {
    // Sanitize input using security utilities
    const sanitizedEmail = sanitizeEmail(value);
    
    setEmail(sanitizedEmail);
    
    // Clear error when user starts typing
    if (emailError) {
      setEmailError('');
    }
  };

  /**
   * Handle form submission with validation and rate limiting
   */
  const handleSubmit = () => {
    // Check rate limiting
    const userIdentifier = email || 'anonymous';
    if (!formRateLimiter.isAllowed(userIdentifier)) {
      setEmailError('Too many submissions. Please wait before trying again.');
      return;
    }

    if (validateEmailInput(email) && hasConsent) {
      onSubmit();
    }
  };

  return (
    <div className="max-w-xl mx-auto text-center animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 leading-tight">
        Get Your Personalized AI Growth Audit
      </h2>
      
      <p className="text-lg text-muted-foreground mb-8">
        We'll send a detailed analysis of your AI maturity and actionable recommendations to accelerate your growth.
      </p>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }} className="space-y-6">
        <div className="text-left">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            required
            className="mt-1.5 focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-describedby={emailError ? "email-error" : undefined}
            aria-invalid={emailError ? "true" : "false"}
            aria-required="true"
            autoComplete="email"
          />
          {emailError && (
            <div className="mt-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p id="email-error" className="text-destructive text-sm font-medium" role="alert" aria-live="polite">
                {emailError}
              </p>
            </div>
          )}
        </div>
        
        <div className="flex items-start gap-2">
          <Checkbox
            id="consent"
            checked={hasConsent}
            onCheckedChange={(checked) => setHasConsent(checked as boolean)}
            className="mt-1"
          />
          <Label htmlFor="consent" className="text-sm text-muted-foreground cursor-pointer">
            I agree to receive my AI Growth Audit and occasional updates about AI automation. You can unsubscribe at any time.
          </Label>
        </div>
        
        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          disabled={!email || !hasConsent || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating Audit...
            </>
          ) : (
            <>
              Get My Audit
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
});

EmailStep.displayName = 'EmailStep';

export default EmailStep;