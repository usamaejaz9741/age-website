/**
 * Growth Audit Modal Component
 * 
 * This component provides a modal dialog for booking AI growth consultations.
 * It integrates with Calendly for scheduling and includes UTM tracking for
 * marketing attribution.
 * 
 * Features:
 * - Modal dialog with responsive design
 * - Calendly integration for booking
 * - UTM parameter tracking
 * - Mobile-optimized layout
 * - Accessibility features
 */

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, TrendingUp, ExternalLink } from "lucide-react";
import { openCalendlyBooking } from "@/lib/calendly";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { blurActiveElement } from "@/lib/console-utils";
import { useEffect } from "react";
import { HEADING_SIZES, TEXT_SIZES, MARGIN_BOTTOM, ICON_SIZES, BORDER_RADIUS, SHADOWS, TRANSITIONS, CARD_PADDING, GAP } from "@/constants/design-system";

/**
 * Props interface for GrowthAuditModal component
 */
interface GrowthAuditModalProps {
  /** Whether the modal is currently open */
  isOpen: boolean;
  /** Function to close the modal */
  onClose: () => void;
}

/**
 * A modal dialog for booking an AI growth audit consultation.
 *
 * This component uses a dialog to present users with an option to schedule a consultation via Calendly.
 * It is designed to be accessible, with focus trapping, and includes marketing attribution through UTM parameters.
 *
 * @param {GrowthAuditModalProps} props - The properties for the component.
 * @param {boolean} props.isOpen - Controls whether the modal is open or closed.
 * @param {() => void} props.onClose - A callback function to be invoked when the modal should be closed.
 * @returns {JSX.Element} The growth audit modal component.
 */
const GrowthAuditModal = ({ isOpen, onClose }: GrowthAuditModalProps) => {
  // Set up focus trap for accessibility
  const trapRef = useFocusTrap(isOpen);

  /**
   * Manages focus when the modal opens or closes to prevent accessibility issues.
   * When the modal opens, it blurs the currently active element to avoid `aria-hidden` warnings.
   */
  useEffect(() => {
    if (isOpen) {
      // When modal opens, blur any currently focused element to prevent aria-hidden warning
      blurActiveElement();
    }
  }, [isOpen]);

  /**
   * Handles the click event for the "Book Consultation" button.
   * It opens the Calendly booking page in a new tab with appropriate UTM parameters for tracking,
   * and then closes the modal.
   *
   * @param {React.MouseEvent} [e] - An optional mouse event, which if provided, will have its default action and propagation stopped.
   */
  const handleBookConsultation = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Blur any currently focused element to prevent aria-hidden warning
    blurActiveElement();
    
    openCalendlyBooking(
      undefined, // No prefill data
      {
        utmCampaign: 'growth-audit-modal',
        utmSource: 'age-website',
        utmMedium: 'modal',
        utmContent: 'hero-cta'
      },
      'Growth Audit Modal'
    );
    
    // Close the modal
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        ref={trapRef}
        className="max-w-[calc(100vw-2rem)] sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 pt-12 sm:pt-6"
        role="dialog"
        aria-modal="true"
      >
        <DialogHeader>
          <DialogTitle className={`flex items-center ${HEADING_SIZES.h5} text-foreground ${MARGIN_BOTTOM.xs}`}>
            <Calendar className={`${ICON_SIZES.medium} mr-2 sm:mr-3 text-[var(--icon-blue)]`} />
            Book Your Growth Audit
          </DialogTitle>
          <DialogDescription className={`${TEXT_SIZES.small} text-muted-foreground ${MARGIN_BOTTOM.small}`}>
            Schedule a free 30-minute consultation to assess your AI maturity and discover growth opportunities tailored to your business.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 sm:py-6">
          <div className={`bg-gradient-card ${CARD_PADDING.large} ${BORDER_RADIUS.xl} ${MARGIN_BOTTOM.large} ${SHADOWS.soft} hover:${SHADOWS.medium} transition-all ${TRANSITIONS.default}`}>
            <div className={`flex items-start md:items-center ${MARGIN_BOTTOM.medium} ${GAP.small}`}>
              <div className={`${CARD_PADDING.small} ${BORDER_RADIUS.lg} group-hover:scale-110 transition-transform ${TRANSITIONS.default} flex items-center justify-center`} style={{ backgroundColor: 'var(--icon-green-bg)' }}>
                <TrendingUp className={`${ICON_SIZES.medium} text-[var(--icon-green)] flex-shrink-0 mx-auto my-auto`} />
              </div>
              <div>
                <h3 className={`${HEADING_SIZES.h4} text-foreground ${MARGIN_BOTTOM.xs}`}>
                  Free AI Growth Consultation
                </h3>
                <p className={`${TEXT_SIZES.small} text-muted-foreground/80`}>
                  Get personalized insights to accelerate your AI adoption and growth
                </p>
              </div>
            </div>
            
            <div className={`grid sm:grid-cols-2 ${GAP.medium} ${TEXT_SIZES.small}`}>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                AI maturity assessment
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                Growth strategy roadmap
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                Implementation recommendations
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                ROI optimization plan
              </div>
            </div>
          </div>

          <div className="text-center space-y-6">
            <div className="space-y-4">
              <h4 className={`${HEADING_SIZES.h5} text-foreground`}>
                Ready to accelerate your AI growth?
              </h4>
              <p className={`${TEXT_SIZES.base} text-muted-foreground`}>
                Book a free consultation to discuss your AI strategy and get personalized recommendations.
              </p>
            </div>

            <div className={`flex flex-col sm:flex-row ${GAP.small} pt-6`}>
              <Button 
                type="button"
                onClick={handleBookConsultation}
                variant="cta" 
                size="xl" 
                className="flex-1"
              >
                <Calendar className={`${ICON_SIZES.default} mr-2`} />
                Book Free Consultation
                <ExternalLink className={`${ICON_SIZES.xs} ml-2`} />
              </Button>
              <Button 
                type="button" 
                variant="cta-outline" 
                size="xl" 
                onClick={onClose} 
                className="flex-1 sm:flex-none"
              >
                Maybe Later
              </Button>
            </div>
          </div>

          <p className={`${TEXT_SIZES.xs} text-muted-foreground text-center mt-6`}>
            By booking, you agree to receive follow-up communications. 
            We respect your privacy and won't spam you.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GrowthAuditModal;