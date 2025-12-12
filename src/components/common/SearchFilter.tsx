import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface FilterField {
  key: string;
  label: string;
  placeholder?: string;
}

interface SearchFilterProps {
  fields: FilterField[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onSearch: () => void;
  onReset?: () => void;
}

export function SearchFilter({ fields, values, onChange, onSearch, onReset }: SearchFilterProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {fields.map((field) => (
          <div key={field.key} className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">
              {field.label}
            </label>
            <Input
              value={values[field.key] || ""}
              onChange={(e) => onChange(field.key, e.target.value)}
              placeholder={field.placeholder || `输入${field.label}`}
              className="h-9 text-sm"
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        <Button onClick={onSearch} size="sm" className="gap-1.5">
          <Search className="w-4 h-4" />
          查询
        </Button>
        {onReset && (
          <Button onClick={onReset} variant="outline" size="sm">
            重置
          </Button>
        )}
      </div>
    </div>
  );
}
