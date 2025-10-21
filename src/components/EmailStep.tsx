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
import { ArrowRight } from "lucide-react";
import { useState, memo, useCallback } from "react";
import { validateEmail, sanitizeEmail, formRateLimiter } from "@/lib/security";
import { ERROR_MESSAGES } from "@/constants/messages";
import { InlineSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";

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
  const [consentError, setConsentError] = useState<string>('');

  /**
   * Validate email input using security utilities
   * @param inputEmail - Email string to validate
   * @returns boolean - Whether email is valid
   */
  const validateEmailInput = useCallback((inputEmail: string): boolean => {
    if (!validateEmail(inputEmail)) {
      setEmailError(ERROR_MESSAGES.INVALID_EMAIL);
      return false;
    }
    
    setEmailError('');
    return true;
  }, []);

  /**
   * Handle email input change with validation
   * @param value - New email value
   */
  const handleEmailChange = useCallback((value: string) => {
    // Sanitize input using security utilities
    const sanitizedEmail = sanitizeEmail(value);
    
    setEmail(sanitizedEmail);
    
    // Clear error when user starts typing
    setEmailError('');
  }, [setEmail]);

  /**
   * Handle form submission with validation and rate limiting
   */
  const handleSubmit = useCallback(() => {
    // Prevent submission if there's already an error
    if (emailError) {
      return;
    }

    // Validate email is not empty
    if (!email || email.trim().length === 0) {
      setEmailError('Email is required');
      return;
    }

    // Check rate limiting
    const userIdentifier = email || 'anonymous';
    if (!formRateLimiter.isAllowed(userIdentifier)) {
      setEmailError(ERROR_MESSAGES.RATE_LIMIT);
      return;
    }

    // Validate email format
    if (!validateEmailInput(email)) {
      return;
    }

    // Check consent
    if (!hasConsent) {
      setConsentError('You must agree to receive the audit report');
      return;
    }

    // Clear consent error
    setConsentError('');

    // All validations passed - submit
    onSubmit();
  }, [email, emailError, hasConsent, onSubmit, validateEmailInput]);

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
            <div className="mt-2">
              <ErrorMessage
                id="email-error"
                message={emailError}
                variant="box"
                severity="error"
              />
            </div>
          )}
        </div>
        
        <div className="flex items-start gap-2 flex-col">
          <div className="flex items-start gap-2">
            <Checkbox
              id="consent"
              checked={hasConsent}
              onCheckedChange={(checked) => {
                // Type-safe: checked can be boolean | "indeterminate"
                setHasConsent(checked === true);
                setConsentError(''); // Clear error when user checks the box
              }}
              className="mt-1"
              aria-describedby={consentError ? "consent-error" : undefined}
              aria-invalid={consentError ? "true" : "false"}
            />
            <Label htmlFor="consent" className="text-sm text-muted-foreground cursor-pointer">
              I agree to receive my AI Growth Audit and occasional updates about AI automation. You can unsubscribe at any time.
            </Label>
          </div>
          {consentError && (
            <div className="w-full">
              <ErrorMessage
                id="consent-error"
                message={consentError}
                variant="box"
                severity="error"
              />
            </div>
          )}
        </div>
        
        <Button
          type="submit"
          size="lg"
          variant="cta"
          className="w-full sm:w-auto"
          disabled={!email || !hasConsent || isLoading}
        >
          {isLoading ? (
            <>
              <InlineSpinner />
              Generating Audit...
            </>
          ) : (
            <>
              Get My Audit
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
});

EmailStep.displayName = 'EmailStep';

export default EmailStep;