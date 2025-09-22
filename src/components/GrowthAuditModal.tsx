import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, TrendingUp } from "lucide-react";
import { useState } from "react";

interface GrowthAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GrowthAuditModal = ({ isOpen, onClose }: GrowthAuditModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    monthlyRevenue: "",
    goal: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Growth audit form submitted:", formData);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-3xl font-kufam font-bold bg-gradient-to-r from-resolution-blue-600 to-malibu-300 bg-clip-text text-transparent">
            <Calendar className="w-8 h-8 mr-4 text-resolution-blue-600" />
            Book Your Growth Audit
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          <div className="bg-gradient-to-br from-resolution-blue-600/10 to-malibu-300/10 p-8 rounded-xl mb-8 border border-resolution-blue-600/20">
            <div className="flex items-start md:items-center mb-6 gap-4">
              <div className="bg-resolution-blue-600/10 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-resolution-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-kufam font-semibold text-foreground mb-1">
                  Free 90-Minute Strategy Session
                </h3>
                <p className="text-muted-foreground/80">
                  Get actionable insights to accelerate your revenue growth
                </p>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-5 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-resolution-blue-600 rounded-full mr-3" />
                Market opportunity analysis
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-resolution-blue-600 rounded-full mr-3" />
                Revenue optimization roadmap
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-resolution-blue-600 rounded-full mr-3" />
                Competitive positioning review
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-resolution-blue-600 rounded-full mr-3" />
                Custom growth recommendations
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Your full name"
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@company.com"
                  className="h-12"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="company" className="text-sm font-medium">Company Name *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Your company name"
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="website" className="text-sm font-medium">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://yourcompany.com"
                  className="h-12"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="revenue" className="text-sm font-medium">Monthly Revenue Range *</Label>
              <Select onValueChange={(value) => handleInputChange("monthlyRevenue", value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select your monthly revenue range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-10k">Under $10K</SelectItem>
                  <SelectItem value="10k-50k">$10K - $50K</SelectItem>
                  <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                  <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                  <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                  <SelectItem value="over-1m">Over $1M</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="goal" className="text-sm font-medium">Primary Growth Goal *</Label>
              <Select onValueChange={(value) => handleInputChange("goal", value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="What's your main objective?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="increase-revenue">Increase Revenue</SelectItem>
                  <SelectItem value="reduce-cac">Reduce Customer Acquisition Cost</SelectItem>
                  <SelectItem value="market-expansion">Market Expansion</SelectItem>
                  <SelectItem value="product-development">Product Development</SelectItem>
                  <SelectItem value="operational-efficiency">Operational Efficiency</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button type="submit" variant="cta" size="xl" className="flex-1">
                <Calendar className="w-5 h-5" />
                Schedule My Audit
              </Button>
              <Button type="button" variant="cta-outline" size="xl" onClick={onClose} className="flex-1 sm:flex-none">
                Maybe Later
              </Button>
            </div>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-4">
            By submitting, you agree to receive follow-up communications. 
            We respect your privacy and won't spam you.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GrowthAuditModal;