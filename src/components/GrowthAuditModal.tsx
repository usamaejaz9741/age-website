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

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, TrendingUp, ExternalLink } from "lucide-react";
import { openCalendlyBooking } from "@/lib/calendly";
import { useFocusTrap } from "@/hooks/use-focus-trap";

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
 * Growth Audit Modal component for consultation booking
 * 
 * This modal provides information about the AI Growth Audit service
 * and allows users to book a consultation through Calendly integration.
 * 
 * Features:
 * - Service description and benefits
 * - Calendly booking integration
 * - UTM tracking for marketing attribution
 * - Responsive design for all screen sizes
 * - Proper event handling to prevent double navigation
 * 
 * @param isOpen - Whether the modal is currently open
 * @param onClose - Function to close the modal
 */
const GrowthAuditModal = ({ isOpen, onClose }: GrowthAuditModalProps) => {
  // Set up focus trap for accessibility
  const trapRef = useFocusTrap(isOpen);

  /**
   * Handle Calendly booking button click
   * 
   * Opens Calendly in a new tab with UTM tracking parameters
   * and closes the modal after initiating the booking process.
   * 
   * @param e - Optional mouse event to prevent default behavior
   */
  const handleBookConsultation = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
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
        className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-6"
        role="dialog"
        aria-modal="true"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl sm:text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
            <Calendar className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mr-3 sm:mr-4 text-[var(--icon-blue)]" />
            Book Your Growth Audit
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 sm:py-6">
          <div className="bg-gradient-card p-4 sm:p-6 md:p-8 rounded-xl mb-6 sm:mb-8 shadow-soft hover:shadow-medium transition-all">
            <div className="flex items-start md:items-center mb-6 gap-4">
              <div className="p-3 rounded-lg group-hover:scale-110 transition-transform flex items-center justify-center" style={{ backgroundColor: 'var(--icon-green-bg)' }}>
                <TrendingUp className="w-6 h-6 text-[var(--icon-green)] flex-shrink-0 mx-auto my-auto" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-1" style={{ lineHeight: 'var(--line-height-tight)' }}>
                  Free AI Growth Consultation
                </h3>
                <p className="text-muted-foreground/80">
                  Get personalized insights to accelerate your AI adoption and growth
                </p>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-5 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-resolution-blue-600 rounded-full mr-3" />
                AI maturity assessment
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-resolution-blue-600 rounded-full mr-3" />
                Growth strategy roadmap
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-resolution-blue-600 rounded-full mr-3" />
                Implementation recommendations
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-resolution-blue-600 rounded-full mr-3" />
                ROI optimization plan
              </div>
            </div>
          </div>

          <div className="text-center space-y-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">
                Ready to accelerate your AI growth?
              </h4>
              <p className="text-muted-foreground">
                Book a free consultation to discuss your AI strategy and get personalized recommendations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                type="button"
                onClick={handleBookConsultation}
                variant="cta" 
                size="xl" 
                className="flex-1 py-4 px-6"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Free Consultation
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                type="button" 
                variant="cta-outline" 
                size="xl" 
                onClick={onClose} 
                className="flex-1 sm:flex-none py-4 px-6"
              >
                Maybe Later
              </Button>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            By booking, you agree to receive follow-up communications. 
            We respect your privacy and won't spam you.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GrowthAuditModal;