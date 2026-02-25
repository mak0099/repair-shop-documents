"use client"

import { useMemo, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { AlertTriangle, ArrowRight, Smartphone, MapPin, Tag, Package, ListFilter } from "lucide-react"

import { ResourceListPage, FilterDefinition } from "@/components/shared/resource-list-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useStock } from "../stock.api"
import { useStockAdjustmentModal } from "@/features/stock-adjustment/stock-adjustment-modal-context"
import { Stock } from "../stock.schema"
import { STOCK_CATEGORY_FILTER_OPTIONS, STOCK_STATUS_FILTER_OPTIONS } from "../stock.constants"
import { StockDetailsModal } from "./stock-details-modal"

export function StockList() {
  const { openModal } = useStockAdjustmentModal()
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null)
  const columns: ColumnDef<Stock>[] = useMemo(() => [
    {
      accessorKey: "itemName",
      header: "Product & Specs",
      cell: ({ row }) => (
        <div className="flex flex-col gap-1.5">
          <span className="font-bold text-slate-900 leading-tight">
            {row.original.itemName}
          </span>
          <div className="flex flex-wrap gap-1">
            {row.original.attributes["RAM"] && (
              <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-100 text-[9px] h-4 px-1.5">
                {row.original.attributes["RAM"]}
              </Badge>
            )}
            {row.original.attributes["ROM"] && (
              <Badge className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50 border-indigo-100 text-[9px] h-4 px-1.5">
                {row.original.attributes["ROM"]}
              </Badge>
            )}
            {row.original.attributes["COLOR"] && (
              <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200 text-[9px] h-4 px-1.5">
                {row.original.attributes["COLOR"]}
              </Badge>
            )}
          </div>
        </div>
      )
    },
    {
      id: "identifiers",
      header: "SKU & IMEI",
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Tag className="h-3 w-3" /> {row.original.sku}
          </div>
          {row.original.imei && (
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-medium text-indigo-600">
              <Smartphone className="h-3 w-3" /> {row.original.imei}
            </div>
          )}
        </div>
      )
    },
    {
      accessorKey: "stockQuantity",
      header: "Available",
      cell: ({ row }) => {
        const isLow = row.original.stockQuantity <= row.original.lowStockThreshold
        const isOut = row.original.stockQuantity === 0
        
        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className={`text-base font-bold ${isOut ? "text-destructive" : isLow ? "text-orange-500" : "text-slate-900"}`}>
                {row.original.stockQuantity} {row.original.unit || "Pcs"}
              </span>
              {isLow && !isOut && <AlertTriangle className="h-3.5 w-3.5 text-orange-500 animate-pulse" />}
            </div>
            <Badge className={`text-[9px] w-fit uppercase px-1.5 h-4 ${getStatusColor(row.original.status)}`}>
              {row.original.status}
            </Badge>
          </div>
        )
      }
    },
    {
      id: "location",
      header: "Storage Location",
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <MapPin className="h-3 w-3 text-red-500" /> {row.original.boxNumber || "N/A"}
          </div>
          {row.original.storageNote && (
            <span className="text-[10px] text-slate-400 italic max-w-[120px] leading-tight">
              {row.original.storageNote}
            </span>
          )}
        </div>
      )
    },
    {
      accessorKey: "sellingPrice",
      header: () => <div className="text-right">Price</div>,
      cell: ({ row }) => (
        <div className="text-right font-bold text-slate-900">
          ৳{row.original.sellingPrice.toLocaleString()}
        </div>
      )
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
          onClick={() => setSelectedStock(row.original)}
        >
          History <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
        </Button>
      )
    }
  ], [setSelectedStock])

  const filterDefinitions: FilterDefinition[] = [
    {
      key: 'status',
      title: 'Status',
      icon: Package,
      options: STOCK_STATUS_FILTER_OPTIONS,
    },
    {
      key: 'category',
      title: 'Category',
      icon: ListFilter,
      options: STOCK_CATEGORY_FILTER_OPTIONS,
    },
  ]

  return (
    <>
      <ResourceListPage<Stock, any>
        title="Stock"
        description="Monitor real-time stock levels, IMEIs, and storage locations."
        resourceName="stock"
        columns={columns} 
        useResourceQuery={useStock} 
        filterDefinitions={filterDefinitions}
        searchPlaceholder="Search by SKU, IMEI or Item Name..."
        onAdd={() => openModal()}
        addLabel="Stock Adjustment"
      />
      <StockDetailsModal
        isOpen={!!selectedStock}
        onClose={() => setSelectedStock(null)}
        stockItem={selectedStock}
      />
    </>
  )
}

/**
 * Helper function to determine badge colors based on master-setting status.
 */
function getStatusColor(status: string) {
  const s = status.toLowerCase()
  if (s.includes("ready")) return "bg-emerald-50 text-emerald-700 border-emerald-100"
  if (s.includes("sold")) return "bg-slate-100 text-slate-500 border-slate-200"
  if (s.includes("testing") || s.includes("pending")) return "bg-amber-50 text-amber-700 border-amber-100"
  return "bg-blue-50 text-blue-700 border-blue-100"
}