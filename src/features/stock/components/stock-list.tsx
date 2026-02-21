"use client"

import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { AlertTriangle, ArrowRight } from "lucide-react"

import { ResourceListPage } from "@/components/shared/resource-list-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useStockAdjustments } from "@/features/stock-adjustment/stock-adjustment.api" // Reusing API if needed
import { Stock } from "../stock.schema"

export function StockList() {
  const columns: ColumnDef<Stock>[] = useMemo(() => [
    {
      accessorKey: "sku",
      header: "SKU",
      cell: ({ row }) => <code className="text-xs font-bold">{row.original.sku}</code>
    },
    {
      accessorKey: "itemName",
      header: "Item Name",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.itemName}</span>
          <span className="text-[10px] text-muted-foreground">
            {Object.values(row.original.attributes).join(" | ")}
          </span>
        </div>
      )
    },
    {
      accessorKey: "stockQuantity",
      header: "Available Stock",
      cell: ({ row }) => {
        const isLow = row.original.stockQuantity <= row.original.lowStockThreshold
        const isOut = row.original.stockQuantity === 0
        
        return (
          <div className="flex items-center gap-2">
            <span className={`text-lg font-bold ${isOut ? "text-destructive" : isLow ? "text-orange-500" : ""}`}>
              {row.original.stockQuantity}
            </span>
            {isLow && !isOut && <AlertTriangle className="h-4 w-4 text-orange-500" title="Low Stock Warning" />}
          </div>
        )
      }
    },
    {
      accessorKey: "boxLocationName",
      header: "Location",
      cell: ({ row }) => <Badge variant="secondary">{row.original.boxLocationName || "N/A"}</Badge>
    },
    {
      id: "actions",
      header: "Details",
      cell: ({ row }) => (
        <Button variant="ghost" size="sm">
          History <ArrowRight className="ml-2 h-3 w-3" />
        </Button>
      )
    }
  ], [])

  return (
    <div className="space-y-4">
      <ResourceListPage<Stock, any>
        title="Current Stock Levels"
        description="Monitor real-time inventory and low stock alerts."
        resourceName="stock"
        columns={columns}
        useResourceQuery={useStockAdjustments as any} // Replace with your actual useStock query
        showAddButton={false} // Reporting view usually doesn't have an 'Add' button
      />
    </div>
  )
}