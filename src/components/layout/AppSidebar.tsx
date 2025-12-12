import { NavLink, useLocation } from "react-router-dom";
import { 
  ClipboardList, 
  FileCheck, 
  Truck, 
  DollarSign, 
  CreditCard,
  Ship
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "订单列表", path: "/orders", icon: ClipboardList },
  { title: "清关列表", path: "/clearance", icon: FileCheck },
  { title: "派送列表", path: "/delivery", icon: Truck },
  { title: "收入确认列表", path: "/income", icon: DollarSign },
  { title: "付款申请列表", path: "/payment", icon: CreditCard },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="w-56 bg-sidebar text-sidebar-foreground flex flex-col min-h-screen">
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-4 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center">
          <Ship className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        <div>
          <h1 className="font-semibold text-sidebar-accent-foreground text-sm">清关派送系统</h1>
          <p className="text-xs text-sidebar-foreground/60">跟单管理</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path === "/orders" && location.pathname === "/");
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/50 text-center">
          © 2025 清关派送系统
        </p>
      </div>
    </aside>
  );
}
