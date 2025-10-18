import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Smartphone, Gamepad2, Plane, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface WishlistItem {
  name: string;
  price: number;
  saved: number;
  icon: any;
  color: string;
}

const WishlistSection = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([
    {
      name: "iPhone 15 Pro",
      price: 1199,
      saved: 450,
      icon: Smartphone,
      color: "text-blue-500",
    },
    {
      name: "PlayStation 5",
      price: 499,
      saved: 320,
      icon: Gamepad2,
      color: "text-purple-500",
    },
    {
      name: "Japan Trip",
      price: 3000,
      saved: 800,
      icon: Plane,
      color: "text-green-500",
    },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const addWishlistItem = () => {
    if (newName && newPrice) {
      setWishlist([
        ...wishlist,
        {
          name: newName,
          price: parseFloat(newPrice),
          saved: 0,
          icon: Sparkles,
          color: "text-yellow-500",
        },
      ]);
      setNewName("");
      setNewPrice("");
      setShowAdd(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Dream Wishlist</h2>
            <p className="text-sm text-muted-foreground">
              Track your savings goals with AI insights
            </p>
          </div>
          <Button
            onClick={() => setShowAdd(!showAdd)}
            className="glass-button bg-primary/10 hover:bg-primary/20"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </div>

        {showAdd && (
          <div className="mb-6 p-4 glass rounded-2xl space-y-4 animate-fade-in">
            <div>
              <Label>Item Name</Label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g., MacBook Pro"
                className="glass-button border-glass-border"
              />
            </div>
            <div>
              <Label>Target Price ($)</Label>
              <Input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="0.00"
                className="glass-button border-glass-border"
              />
            </div>
            <Button onClick={addWishlistItem} className="w-full bg-primary hover:bg-primary/90">
              Add to Wishlist
            </Button>
          </div>
        )}

        <div className="space-y-4">
          {wishlist.map((item, index) => {
            const Icon = item.icon;
            const progress = (item.saved / item.price) * 100;
            const remaining = item.price - item.saved;
            const monthsToGoal = Math.ceil(remaining / 200); // Assuming $200 saved per month

            return (
              <div
                key={index}
                className="p-5 glass rounded-2xl hover-lift transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 bg-muted/50 rounded-2xl ${item.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{progress.toFixed(0)}%</p>
                    <p className="text-xs text-muted-foreground">saved</p>
                  </div>
                </div>

                <Progress value={progress} className="h-3 mb-3" />

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Saved: ${item.saved.toFixed(2)}
                  </span>
                  <span className="font-medium">
                    ${remaining.toFixed(2)} to go
                  </span>
                </div>

                <div className="mt-3 p-3 bg-primary/5 rounded-xl border border-primary/20">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <p className="text-xs text-foreground/80">
                      <span className="font-semibold">AI Tip:</span> At your current savings rate,
                      you'll reach this goal in <span className="font-bold">{monthsToGoal} months</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default WishlistSection;
