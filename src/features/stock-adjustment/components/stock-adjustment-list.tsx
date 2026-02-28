"use client"

import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Smartphone, User } from "lucide-react"

import { ResourceListPage } from "@/components/shared/resource-list-page"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { 
  useStockAdjustments, 
  useDeleteStockAdjustment,
  useDeleteManyStockAdjustments 
} from "../stock-adjustment.api"
import { StockAdjustment } from "../stock-adjustment.schema"
import { useStockAdjustmentModal } from "../stock-adjustment-modal-context"
import { ResourceActions } from "@/components/shared/resource-actions"

/**
 * FIX: Create a strict type for the list where ID is guaranteed to be a string.
 * This satisfies ResourceActions' requirement.
 */
interface StrictStockAdjustment extends StockAdjustment {
  id: string;
}

export function StockAdjustmentList() {
  const { openModal } = useStockAdjustmentModal()
  const deleteMutation = useDeleteStockAdjustment()
  const bulkDeleteMutation = useDeleteManyStockAdjustments()

  const columns: ColumnDef<StrictStockAdjustment>[] = useMemo(() => [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-xs font-medium">
            {format(new Date(row.original.date), "dd MMM yyyy")}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {format(new Date(row.original.date), "hh:mm a")}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "itemName",
      header: "Product & IMEI",
      cell: ({ row }) => (
        <div className="flex flex-col gap-0.5">
          <span className="font-bold text-slate-900 text-xs">
            {row.original.itemName || "Unknown Product"}
          </span>
          {row.original.imei && (
            <div className="flex items-center gap-1 text-[10px] text-indigo-600 font-mono">
              <Smartphone className="h-3 w-3" /> {row.original.imei}
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Movement",
      cell: ({ row }) => {
        const isStockIn = row.original.type === "IN";
        return (
          <Badge 
            variant="outline"
            className={cn(
              "text-[9px] px-1.5 h-4 font-bold border-none",
              isStockIn 
                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" 
                : "bg-red-100 text-red-700 hover:bg-red-100"
            )}
          >
            {isStockIn ? "STOCK IN" : "STOCK OUT"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: "Qty",
      cell: ({ row }) => (
        <span className={cn(
          "font-bold",
          row.original.type === "IN" ? "text-emerald-600" : "text-red-600"
        )}>
          {row.original.type === "IN" ? "+" : "-"}{row.original.quantity}
        </span>
      ),
    },
    {
      accessorKey: "reason",
      header: "Reason",
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <Badge variant="outline" className="text-[9px] w-fit border-slate-300 text-slate-600">
            {row.original.reason}
          </Badge>
          {row.original.adjustedBy && (
            <div className="flex items-center gap-1 text-[9px] text-slate-400">
              <User className="h-2.5 w-2.5" /> {row.original.adjustedBy}
            </div>
          )}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <ResourceActions
          resource={row.original}
          resourceName="Adjustment"
          resourceTitle={`Adjustment for ${row.original.itemName}`}
          onView={(data) => openModal({ initialData: data as StockAdjustment, isViewMode: true })}
          onEdit={(data) => openModal({ initialData: data as StockAdjustment })}
          deleteMutation={deleteMutation}
        />
      ),
    },
  ], [openModal, deleteMutation])

  return (
    <ResourceListPage<StrictStockAdjustment, Record<string, unknown>>
      title="Stock Adjustments"
      resourceName="stock-adjustments"
      description="Monitor all manual stock movements, corrections, and damage records."
      columns={columns}
      useResourceQuery={useStockAdjustments}
      onAdd={() => openModal()}
      addLabel="New Adjustment"
      bulkDeleteMutation={bulkDeleteMutation}
      searchPlaceholder="Search by IMEI, product or reason..."
    />
  )
}