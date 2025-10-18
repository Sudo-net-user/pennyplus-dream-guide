import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Utensils, Home, Zap, Car, ShoppingCart, Film, MoreHorizontal, PiggyBank, TrendingUp, TrendingDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Expense {
  category: string;
  amount: number;
  icon: any;
  color: string;
}

interface ExpenseTrackerProps {
  monthlyIncome: number;
}

const ExpenseTracker = ({ monthlyIncome }: ExpenseTrackerProps) => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { category: "Food", amount: 500, icon: Utensils, color: "text-orange-500" },
    { category: "Rent", amount: 1200, icon: Home, color: "text-blue-500" },
    { category: "Utilities", amount: 200, icon: Zap, color: "text-yellow-500" },
    { category: "Transport", amount: 150, icon: Car, color: "text-green-500" },
    { category: "Shopping", amount: 300, icon: ShoppingCart, color: "text-pink-500" },
    { category: "Entertainment", amount: 200, icon: Film, color: "text-purple-500" },
  ]);

  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = monthlyIncome - totalExpenses;
  const percentageUsed = (totalExpenses / monthlyIncome) * 100;

  const addExpense = () => {
    if (newCategory && newAmount) {
      setExpenses([
        ...expenses,
        {
          category: newCategory,
          amount: parseFloat(newAmount),
          icon: MoreHorizontal,
          color: "text-gray-500",
        },
      ]);
      setNewCategory("");
      setNewAmount("");
      setShowAddExpense(false);
    }
  };

  const updateExpenseAmount = (index: number, newAmount: number) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index].amount = newAmount;
    setExpenses(updatedExpenses);
  };

  return (
    <div className="space-y-6">
      {/* Savings Overview Card */}
      <Card className="glass-card border-2 border-secondary/30 bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-secondary to-primary rounded-2xl">
            <PiggyBank className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Total Savings</h3>
            <p className="text-xs text-muted-foreground">This Month</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Income</p>
            <div className="flex items-center justify-center gap-1">
              <TrendingUp className="h-4 w-4 text-success" />
              <p className="text-lg font-bold">${monthlyIncome.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Expenses</p>
            <div className="flex items-center justify-center gap-1">
              <TrendingDown className="h-4 w-4 text-destructive" />
              <p className="text-lg font-bold">${totalExpenses.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="text-center p-3 bg-white/50 rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Saved</p>
            <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-success' : 'text-destructive'}`}>
              ${Math.abs(remaining).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <Progress 
            value={percentageUsed} 
            className="h-2"
          />
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {remaining >= 0 
              ? `You're saving ${((remaining / monthlyIncome) * 100).toFixed(1)}% of your income! 🎉`
              : `You're overspending by $${Math.abs(remaining).toFixed(2)} ⚠️`
            }
          </p>
        </div>
      </Card>

      <Card className="glass-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Monthly Expenses</h2>
          <Button
            onClick={() => setShowAddExpense(!showAddExpense)}
            className="glass-button bg-primary/10 hover:bg-primary/20"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        {/* Add Expense Form */}
        {showAddExpense && (
          <div className="mb-6 p-4 glass rounded-2xl space-y-4 animate-fade-in">
            <div>
              <Label>Category</Label>
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="e.g., Groceries"
                className="glass-button border-glass-border"
              />
            </div>
            <div>
              <Label>Amount ($)</Label>
              <Input
                type="number"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                placeholder="0.00"
                className="glass-button border-glass-border"
              />
            </div>
            <Button onClick={addExpense} className="w-full bg-primary hover:bg-primary/90">
              Add Expense
            </Button>
          </div>
        )}

        {/* Expense Categories */}
        <div className="space-y-3">
          {expenses.map((expense, index) => {
            const Icon = expense.icon;
            const percentage = (expense.amount / monthlyIncome) * 100;

            return (
              <div
                key={index}
                className="p-4 glass rounded-2xl hover-lift transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-muted/50 rounded-xl ${expense.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{expense.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">$</span>
                    <Input
                      type="number"
                      value={expense.amount}
                      onChange={(e) => updateExpenseAmount(index, parseFloat(e.target.value) || 0)}
                      className="w-24 h-8 text-right font-bold glass-button border-glass-border"
                      step="0.01"
                    />
                  </div>
                </div>
                <Progress value={percentage} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {percentage.toFixed(1)}% of income
                </p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default ExpenseTracker;
