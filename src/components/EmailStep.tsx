/**
 * Email Step Component for AI Growth Score Assessment
 * 
 * This component handles the email capture step of the assessment flow.
 * It collects the user's email address and consent for receiving the
 * AI Growth Audit report and future communications.
 * 
 * Features:
 * - Email input validation
 * - GDPR-compliant consent checkbox
 * - Loading state during audit generation
 * - Form submission handling
 */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
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
const EmailStep = ({ email, setEmail, hasConsent, setHasConsent, onSubmit, isLoading }: EmailStepProps) => {
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
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
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
            className="mt-1.5"
            aria-describedby={emailError ? "email-error" : undefined}
            aria-invalid={emailError ? "true" : "false"}
          />
          {emailError && (
            <p id="email-error" className="text-red-600 text-sm mt-1" role="alert">
              {emailError}
            </p>
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
          className="w-full sm:w-auto"
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
};

export default EmailStep;