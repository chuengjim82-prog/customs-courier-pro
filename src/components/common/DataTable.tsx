import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  title: string;
  width?: string;
  render?: (value: unknown, record: T, index: number) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: keyof T;
  loading?: boolean;
}

export function DataTable<T extends object>({ 
  columns, 
  data, 
  rowKey,
  loading 
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
        <p className="mt-2 text-sm text-muted-foreground">加载中...</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th 
                  key={col.key} 
                  style={{ width: col.width }}
                  className="whitespace-nowrap"
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-8 text-muted-foreground">
                  暂无数据
                </td>
              </tr>
            ) : (
              data.map((record, index) => (
                <tr key={String((record as Record<string, unknown>)[rowKey as string])} className="animate-fade-in">
                  {columns.map((col) => (
                    <td key={col.key} className="whitespace-nowrap">
                      {col.render 
                        ? col.render((record as Record<string, unknown>)[col.key], record, index)
                        : String((record as Record<string, unknown>)[col.key] ?? "-")
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Status Badge Component
interface StatusBadgeProps {
  status: "pending" | "processing" | "completed" | "closed";
  children: ReactNode;
}

export function StatusBadge({ status, children }: StatusBadgeProps) {
  const statusClass = {
    pending: "status-pending",
    processing: "status-processing", 
    completed: "status-completed",
    closed: "status-closed",
  }[status];

  return <span className={cn("status-badge", statusClass)}>{children}</span>;
}

// Action Button Component
interface ActionButtonProps {
  variant?: "primary" | "warning" | "success";
  onClick?: () => void;
  children: ReactNode;
}

export function ActionButton({ variant = "primary", onClick, children }: ActionButtonProps) {
  const variantClass = {
    primary: "action-btn-primary",
    warning: "action-btn-warning",
    success: "action-btn-success",
  }[variant];

  return (
    <button onClick={onClick} className={cn("action-btn", variantClass)}>
      {children}
    </button>
  );
}
