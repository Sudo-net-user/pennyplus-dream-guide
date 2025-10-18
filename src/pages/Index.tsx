import { useState } from "react";
import { Wallet, TrendingUp, Heart, Sparkles, PiggyBank, ShoppingBag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import DashboardHeader from "@/components/DashboardHeader";
import ExpenseTracker from "@/components/ExpenseTracker";
import WishlistSection from "@/components/WishlistSection";
import AIAssistant from "@/components/AIAssistant";
import CharitySection from "@/components/CharitySection";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [monthlyIncome, setMonthlyIncome] = useState(5000);
  const [previousSavings, setPreviousSavings] = useState(0);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <DashboardHeader 
        monthlyIncome={monthlyIncome} 
        setMonthlyIncome={setMonthlyIncome}
        previousSavings={previousSavings}
        setPreviousSavings={setPreviousSavings}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {activeTab === "dashboard" && (
          <div className="space-y-6 animate-fade-in">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="glass-card hover-lift">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-2xl">
                    <Wallet className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Balance</p>
                    <p className="text-2xl font-bold">${monthlyIncome.toFixed(2)}</p>
                  </div>
                </div>
              </Card>

              <Card className="glass-card hover-lift">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-secondary/10 rounded-2xl">
                    <TrendingUp className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="text-2xl font-bold text-success">+12%</p>
                  </div>
                </div>
              </Card>

              <Card className="glass-card hover-lift">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent/10 rounded-2xl">
                    <Heart className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Donated</p>
                    <p className="text-2xl font-bold">${(monthlyIncome * 0.02).toFixed(2)}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Expense Tracker */}
            <ExpenseTracker monthlyIncome={monthlyIncome} />

            {/* Charity Section */}
            <CharitySection monthlyIncome={monthlyIncome} />
          </div>
        )}

        {activeTab === "wishlist" && (
          <div className="animate-fade-in">
            <WishlistSection />
          </div>
        )}

        {activeTab === "insights" && (
          <div className="space-y-6 animate-fade-in">
            <Card className="glass-card">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">AI Insights</h2>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-success/10 rounded-2xl border border-success/20">
                  <p className="font-semibold text-success mb-2">Great Job! 🎉</p>
                  <p className="text-sm text-foreground/80">
                    You've saved 15% more this month compared to last month. Keep up the excellent work!
                  </p>
                </div>

                <div className="p-4 bg-warning/10 rounded-2xl border border-warning/20">
                  <p className="font-semibold text-warning mb-2">Watch Out ⚠️</p>
                  <p className="text-sm text-foreground/80">
                    Your entertainment spending is 20% higher than usual. Consider reducing it next week.
                  </p>
                </div>

                <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                  <p className="font-semibold text-primary mb-2">Smart Tip 💡</p>
                  <p className="text-sm text-foreground/80">
                    Based on your current savings rate, you could afford your wishlist iPhone in 4 months!
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* AI Assistant Floating Button */}
      <AIAssistant />

      {/* Bottom Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Index;
