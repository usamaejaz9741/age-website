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
 * Renders a form for capturing the user's email and consent.
 *
 * This component is a step in the AI Growth Score assessment. It includes client-side validation for the email format,
 * a required consent checkbox, and displays a loading state during submission. It also utilizes a rate limiter
 * to prevent form abuse.
 *
 * @param {EmailStepProps} props - The properties for the component.
 * @param {string} props.email - The current email value from the parent state.
 * @param {(email: string) => void} props.setEmail - Function to update the email value in the parent state.
 * @param {boolean} props.hasConsent - The current consent status from the parent state.
 * @param {(hasConsent: boolean) => void} props.setHasConsent - Function to update the consent status in the parent state.
 * @param {() => void} props.onSubmit - Callback function to trigger when the form is submitted successfully.
 * @param {boolean} [props.isLoading=false] - Optional flag to show a loading state on the submit button.
 * @returns {JSX.Element} The email and consent form.
 */
const EmailStep = memo(({ email, setEmail, hasConsent, setHasConsent, onSubmit, isLoading }: EmailStepProps) => {
  const [emailError, setEmailError] = useState<string>('');
  const [consentError, setConsentError] = useState<string>('');

  /**
   * Validates an email string using a regular expression and sets an error state if invalid.
   * @param {string} inputEmail - The email string to validate.
   * @returns {boolean} `true` if the email is valid, `false` otherwise.
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
   * Handles changes to the email input field. It sanitizes the input and updates the component's state.
   * @param {string} value - The new value from the email input field.
   */
  const handleEmailChange = useCallback((value: string) => {
    // Sanitize input using security utilities
    const sanitizedEmail = sanitizeEmail(value);
    
    setEmail(sanitizedEmail);
    
    // Clear error when user starts typing
    setEmailError('');
  }, [setEmail]);

  /**
   * Handles the form submission. It performs validation on the email and consent fields,
   * checks against a rate limiter, and calls the `onSubmit` prop if all checks pass.
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
                setHasConsent(checked as boolean);
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