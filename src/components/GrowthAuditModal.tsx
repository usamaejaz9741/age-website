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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl font-bold text-foreground">
            <Calendar className="w-6 h-6 mr-3 text-success" />
            Book Your Growth Audit
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          <div className="bg-gradient-hero p-6 rounded-lg mb-8">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-8 h-8 text-success mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Free 90-Minute Strategy Session
                </h3>
                <p className="text-muted-foreground">
                  Get actionable insights to accelerate your revenue growth
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-success rounded-full mr-2" />
                Market opportunity analysis
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-success rounded-full mr-2" />
                Revenue optimization roadmap
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-success rounded-full mr-2" />
                Competitive positioning review
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-success rounded-full mr-2" />
                Custom growth recommendations
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@company.com"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Your company name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://yourcompany.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="revenue">Monthly Revenue Range *</Label>
              <Select onValueChange={(value) => handleInputChange("monthlyRevenue", value)}>
                <SelectTrigger>
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

            <div className="space-y-2">
              <Label htmlFor="goal">Primary Growth Goal *</Label>
              <Select onValueChange={(value) => handleInputChange("goal", value)}>
                <SelectTrigger>
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

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button type="submit" variant="cta" className="flex-1">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule My Audit
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 sm:flex-none">
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