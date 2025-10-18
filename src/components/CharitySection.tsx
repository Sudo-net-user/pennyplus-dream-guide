import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Heart, Globe, Users } from "lucide-react";

interface CharitySectionProps {
  monthlyIncome: number;
}

const CharitySection = ({ monthlyIncome }: CharitySectionProps) => {
  const [charityEnabled, setCharityEnabled] = useState(true);
  const [donationPercentage, setDonationPercentage] = useState(2);

  const donationAmount = (monthlyIncome * donationPercentage) / 100;

  return (
    <Card className="glass-card border-2 border-accent/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-accent to-secondary rounded-2xl">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Give Back</h2>
            <p className="text-sm text-muted-foreground">Automated charity donations</p>
          </div>
        </div>
        <Switch checked={charityEnabled} onCheckedChange={setCharityEnabled} />
      </div>

      {charityEnabled && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-4 bg-gradient-to-br from-accent/10 to-secondary/10 rounded-2xl border border-accent/20">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium">Monthly Donation</Label>
              <p className="text-2xl font-bold text-accent">${donationAmount.toFixed(2)}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              {donationPercentage}% of your monthly income
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 glass rounded-2xl text-center hover-lift">
              <Globe className="h-8 w-8 text-secondary mx-auto mb-2" />
              <p className="text-sm font-semibold">World Food</p>
              <p className="text-xs text-muted-foreground">Programme</p>
            </div>

            <div className="p-4 glass rounded-2xl text-center hover-lift">
              <Users className="h-8 w-8 text-accent mx-auto mb-2" />
              <p className="text-sm font-semibold">UNICEF</p>
              <p className="text-xs text-muted-foreground">Children's Fund</p>
            </div>
          </div>

          <div className="p-4 bg-success/10 rounded-2xl border border-success/20">
            <div className="flex items-start gap-3">
              <Heart className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-success mb-1">Making a Difference</p>
                <p className="text-xs text-foreground/80">
                  Your monthly ${donationAmount.toFixed(2)} donation can provide meals for 3
                  children for a week. Thank you for your generosity! 🙏
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default CharitySection;
