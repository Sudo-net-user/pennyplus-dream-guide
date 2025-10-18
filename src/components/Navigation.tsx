import { Home, ShoppingBag, TrendingUp } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const tabs = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "wishlist", label: "Wishlist", icon: ShoppingBag },
    { id: "insights", label: "Insights", icon: TrendingUp },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t border-glass-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                  isActive
                    ? "text-primary scale-110"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div
                  className={`p-2 rounded-2xl transition-all duration-300 ${
                    isActive ? "bg-primary/10" : "hover:bg-muted"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
