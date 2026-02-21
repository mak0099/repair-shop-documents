"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { ResourceListPage } from "@/components/shared/resource-list-page"
import { DataTableColumnHeader } from "@/components/shared/data-table-column-header"
import { Badge } from "@/components/ui/badge"
import { useItems, useDeleteItem, useDeleteManyItems } from "../item.api"
import { Item, ItemVariant } from "../item.schema"
import { useItemModal } from "../item-modal-context"
import { ResourceActions } from "@/components/shared/resource-actions"

export function ItemList() {
  const { openModal } = useItemModal()
  const deleteMutation = useDeleteItem()
  const bulkDeleteMutation = useDeleteManyItems()

  const columns: ColumnDef<Item>[] = useMemo(() => [
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Product Name" />,
      cell: ({ row }) => (
        <div
          className="font-medium cursor-pointer hover:underline"
          onClick={() => openModal({ initialData: row.original, isViewMode: true })}
        >
          {row.original.name}
        </div>
      ),
    },
    {
      accessorKey: "hasVariants",
      header: "Type",
      cell: ({ row }) => (
        <Badge variant={row.original.hasVariants ? "default" : "outline"}>
          {row.original.hasVariants ? "Variable" : "Simple"}
        </Badge>
      )
    },
    {
      id: "stock",
      header: "Total Stock",
      cell: ({ row }) => {
        const total = Array.isArray(row.original.variants)
          ? row.original.variants.reduce((acc, v) => acc + (v.stockQuantity || 0), 0)
          : 0
        return <span className="font-bold">{total}</span>
      }
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <ResourceActions
          resourceTitle={row.original.name} // Added resourceTitle for better confirmation messages
          resource={row.original}
          resourceName="Product"
          onView={(item) => openModal({ initialData: item, isViewMode: true })}
          onEdit={(item) => openModal({ initialData: item })}
          deleteMutation={deleteMutation}
        />
      )
    }
  ], [openModal, deleteMutation])

  return (
    <ResourceListPage<Item, unknown>
      title="Products & Items"
      description="Manage all your products, items, and their variants."
      resourceName="items"
      columns={columns}
      useResourceQuery={useItems}
      onAdd={() => openModal()}
      addLabel="Add Product"
      bulkDeleteMutation={bulkDeleteMutation}
      searchPlaceholder="Search by product name..."
    />
  )
}