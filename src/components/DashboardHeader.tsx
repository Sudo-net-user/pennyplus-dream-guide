import { Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DashboardHeaderProps {
  monthlyIncome: number;
  setMonthlyIncome: (income: number) => void;
  previousSavings: number;
  setPreviousSavings: (savings: number) => void;
}

const DashboardHeader = ({ monthlyIncome, setMonthlyIncome, previousSavings, setPreviousSavings }: DashboardHeaderProps) => {
  return (
    <header className="glass border-b border-glass-border sticky top-0 z-40">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-2xl animate-glow">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Penny +</h1>
              <p className="text-sm text-muted-foreground">Your Smart Finance Companion</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <div>
            <Label htmlFor="income" className="text-sm font-medium mb-2 block">
              Monthly Income
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="income"
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(parseFloat(e.target.value) || 0)}
                className="pl-8 glass-button border-glass-border"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="savings" className="text-sm font-medium mb-2 block">
              Previous Savings
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="savings"
                type="number"
                value={previousSavings}
                onChange={(e) => setPreviousSavings(parseFloat(e.target.value) || 0)}
                className="pl-8 glass-button border-glass-border"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
