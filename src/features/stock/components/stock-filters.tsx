"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/form-select"

interface StockFiltersProps {
  onSearch: (value: string) => void
  onFilterChange: (key: string, value: string) => void
}

export function StockFilters({ onSearch, onFilterChange }: StockFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white p-4 rounded-lg border shadow-sm">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -reverse-y-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2" />
        <Input
          placeholder="Search by SKU or Item Name..."
          className="pl-9"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      
      <div className="flex gap-2 flex-wrap">
        <Select onValueChange={(v) => onFilterChange("stockStatus", v)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Stock Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Stock</SelectItem>
            <SelectItem value="LOW_STOCK">Low Stock</SelectItem>
            <SelectItem value="OUT_OF_STOCK">Out of Stock</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => onFilterChange("category", v)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {/* These would ideally come from your categories API */}
            <SelectItem value="displays">Displays</SelectItem>
            <SelectItem value="batteries">Batteries</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}