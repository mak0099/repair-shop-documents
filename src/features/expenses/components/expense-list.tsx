"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import type { UseMutationResult } from "@tanstack/react-query"

import { ResourceListPage } from "@/components/shared/resource-list-page"
import { ResourceActions } from "@/components/shared/resource-actions"
import { DataTableColumnHeader } from "@/components/shared/data-table-column-header"
import { ImageCell, DateCell } from "@/components/shared/data-table-cells"
import { Badge } from "@/components/ui/badge"

import {
  useExpenses,
  useDeleteExpense,
  usePartialUpdateExpense,
  useDeleteManyExpenses,
} from "../expense.api"
import { Expense } from "../expense.schema"
import { useExpenseModal } from "../expense-modal-context"

const INITIAL_FILTERS = {
  search: "",
  page: 1,
  pageSize: 10,
}

/**
 * Extended type to handle labels and ensure safe property access
 */
interface ExpenseWithLabels extends Expense {
  categoryLabel?: string;
}

export function ExpenseList() {
  const deleteExpenseMutation = useDeleteExpense()
  const updateExpenseMutation = usePartialUpdateExpense()
  const bulkDeleteMutation = useDeleteManyExpenses()
  const { openModal } = useExpenseModal()

  const columns: ColumnDef<Expense>[] = useMemo(
    () => [
      {
        accessorKey: "title",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Expense Title" />,
        cell: ({ row }) => (
          <div 
            className="font-semibold text-slate-700 cursor-pointer hover:text-blue-600 transition-colors" 
            onClick={() => openModal({ initialData: row.original, isViewMode: true })}
          >
            {row.getValue("title")}
            {row.original.vendorName && (
              <p className="text-[10px] text-slate-400 font-normal">To: {row.original.vendorName}</p>
            )}
          </div>
        ),
      },
      {
        accessorKey: "amount",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
        cell: ({ row }) => (
          <span className="font-bold text-slate-900">
            ৳{row.original.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        ),
      },
      {
        accessorKey: "date",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
        cell: ({ row }) => <DateCell date={row.original.date} />,
      },
      {
        accessorKey: "categoryId",
        header: "Category",
        cell: ({ row }) => {
          const item = row.original as ExpenseWithLabels;
          return (
            <Badge variant="secondary" className="font-medium bg-slate-100 text-slate-600 border-none">
              {item.categoryLabel || "General"}
            </Badge>
          );
        },
      },
      {
        accessorKey: "paymentMethod",
        header: "Payment",
        cell: ({ row }) => (
          <span className="text-[11px] font-bold uppercase text-slate-400 tracking-tight">
            {row.original.paymentMethod?.replace("_", " ")}
          </span>
        ),
      },
      {
        accessorKey: "attachmentUrl",
        header: "Receipt",
        cell: ({ row }) => (
          <ImageCell 
            src={row.original.attachmentUrl} 
            alt={row.original.title} 
            size={36}
            shape="rounded"
          />
        ),
      },
      {
        id: "actions",
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => (
          <ResourceActions
            resource={row.original}
            resourceName="Expense"
            resourceTitle={row.original.title}
            onView={(expense) => openModal({ initialData: expense, isViewMode: true })}
            onEdit={(expense) => openModal({ initialData: expense })}
            deleteMutation={deleteExpenseMutation}
            updateMutation={updateExpenseMutation}
          />
        ),
      },
    ],
    [deleteExpenseMutation, openModal, updateExpenseMutation]
  )

  return (
    <ResourceListPage<Expense, unknown>
      title="Expense Ledger"
      resourceName="expenses"
      description="Track and audit your shop's operational costs."
      onAdd={() => openModal()}
      addLabel="New Expense"
      columns={columns}
      useResourceQuery={useExpenses}
      bulkDeleteMutation={bulkDeleteMutation}
      initialFilters={INITIAL_FILTERS}
      searchPlaceholder="Search by title or vendor..."
    />
  )
}