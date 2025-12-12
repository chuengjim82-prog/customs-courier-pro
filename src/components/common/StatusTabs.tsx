import { cn } from "@/lib/utils";

export interface Tab {
  key: string;
  label: string;
  count?: number;
}

interface StatusTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

export function StatusTabs({ tabs, activeTab, onTabChange }: StatusTabsProps) {
  return (
    <div className="filter-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={cn("filter-tab", activeTab === tab.key && "active")}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className="ml-1.5 opacity-80">({tab.count})</span>
          )}
        </button>
      ))}
    </div>
  );
}
