import {
  FunnelIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  EllipsisHorizontalIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import type { Filter, FilterOption } from "@/types/filters.ts";

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: Filter;
  onFilterChange: (filters: Filter) => void;
  ownerOptions: FilterOption[];
}

const FilterBar = ({ searchTerm, setSearchTerm, filters, onFilterChange, ownerOptions }: FilterBarProps) => {
  const handleFilterChange = (key: keyof Filter, value: number | undefined) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex flex-1 items-center space-x-4">
        <div className="relative max-w-md flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            placeholder="Hledat..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center space-x-2"
            >
              <UserIcon className="h-4 w-4" />
              <span>Vlastník {filters.owner ? "✓" : ""}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {ownerOptions.map(option => (
              <DropdownMenuItem
                key={option.id}
                onClick={() => handleFilterChange("owner", option.id as number)}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem onClick={() => handleFilterChange("owner", undefined)}>Zrušit filtr</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center space-x-2">
        <Button className="flex items-center space-x-2">
          <PlusIcon className="h-4 w-4" />
          <span>Přidat</span>
        </Button>
        <Button
          variant="outline"
          className="flex items-center space-x-2"
        >
          <FunnelIcon className="h-4 w-4" />
          <span>Filtrování</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
        >
          <EllipsisHorizontalIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
