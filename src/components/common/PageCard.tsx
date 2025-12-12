import { ReactNode } from "react";

interface PageCardProps {
  title: string;
  children: ReactNode;
  extra?: ReactNode;
}

export function PageCard({ title, children, extra }: PageCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-muted/30">
        <h3 className="font-medium text-foreground">{title}</h3>
        {extra}
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
