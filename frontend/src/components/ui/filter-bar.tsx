import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export interface FilterField {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  type?: "text" | "number";
}

interface FilterBarProps {
  filters: FilterField[];
  onFilterChange?: () => void;
}

/**
 * Reusable filter bar component for search/filter inputs with clear button
 */
export function FilterBar({ filters }: FilterBarProps) {
  return (
    <div className="flex gap-4 flex-wrap">
      {filters.map((filter, index) => (
        <div key={index} className="relative max-w-sm">
          <Input
            placeholder={filter.placeholder}
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            className="pr-8"
            type={filter.type || "text"}
          />
          {filter.value && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-2 hover:bg-transparent"
              onClick={() => filter.onChange("")}
              type="button"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
