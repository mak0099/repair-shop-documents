"use client"

import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

import { ResourceListPage } from "@/components/shared/resource-list-page"
import { Badge } from "@/components/ui/badge"
import { 
  useStockAdjustments, 
  useDeleteStockAdjustment,
  useDeleteManyStockAdjustments 
} from "../stock-adjustment.api"
import { StockAdjustment } from "../stock-adjustment.schema"
import { useStockAdjustmentModal } from "../stock-adjustment-modal-context"
import { ResourceActions } from "@/components/shared/resource-actions"
import { Item } from "@/features/items"

interface StockAdjustmentInList extends StockAdjustment {
  item?: Pick<Item, "id" | "name">
}

export function StockAdjustmentList() {
  const { openModal } = useStockAdjustmentModal()
  const deleteMutation = useDeleteStockAdjustment()
  const bulkDeleteMutation = useDeleteManyStockAdjustments()

  const columns: ColumnDef<StockAdjustmentInList>[] = useMemo(() => [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => format(new Date(row.original.date), "dd MMM yyyy, hh:mm a"),
    },
    {
      accessorKey: "itemId",
      header: "Item",
      cell: ({ row }) => row.original.item?.name ?? row.original.itemId,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <Badge variant={row.original.type === "IN" ? "success" : "destructive"}>
          {row.original.type === "IN" ? "STOCK IN" : "STOCK OUT"}
        </Badge>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Qty",
      cell: ({ row }) => (
        <span className="font-bold">
          {row.original.type === "IN" ? "+" : "-"}{row.original.quantity}
        </span>
      ),
    },
    {
      accessorKey: "reason",
      header: "Reason",
      cell: ({ row }) => <Badge variant="outline">{row.original.reason}</Badge>,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <ResourceActions
          resource={row.original}
          resourceName="Adjustment"
          resourceTitle={`Adjustment for ${row.original.item?.name ?? row.original.itemId}`}
          onView={(data) => openModal({ initialData: data, isViewMode: true })}
          onEdit={(data) => openModal({ initialData: data })}
          deleteMutation={deleteMutation}
        />
      ),
    },
  ], [openModal, deleteMutation])

  return (
    <ResourceListPage<StockAdjustmentInList, any>
      title="Stock Adjustments"
      resourceName="stock-adjustments"
      description="Track manual inventory changes like damages, losses, or returns."
      columns={columns}
      useResourceQuery={useStockAdjustments}
      onAdd={() => openModal()}
      addLabel="New Adjustment"
      bulkDeleteMutation={bulkDeleteMutation}
      searchPlaceholder="Search by reason or item..."
    />
  )
}