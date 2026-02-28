"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { ResourceListPage } from "@/components/shared/resource-list-page"
import { ResourceActions } from "@/components/shared/resource-actions"
import { DataTableColumnHeader } from "@/components/shared/data-table-column-header"
import { StatusCell } from "@/components/shared/data-table-cells"

import {
  useCustomers,
  useDeleteCustomer,
  useDeleteManyCustomers,
  useUpdateCustomer,
  useUpdateManyCustomers,
} from "../customer.api"
import { Customer } from "../customer.schema"
import { useCustomerModal } from "../customer-modal-context"

/**
 * Filter Options: Standardized for Boolean Consistency.
 */
const ACTIVE_STATUS_OPTIONS = [
  { label: "Active Only", value: "true" },
  { label: "Inactive Only", value: "false" },
]

const DEALER_OPTIONS = [
  { label: "Business/Dealer", value: "true" },
  { label: "Regular Customer", value: "false" },
]

const INITIAL_FILTERS = {
  search: "",
  page: 1,
  pageSize: 10,
  isActive: "all",
}

export function CustomerList() {
  const deleteCustomerMutation = useDeleteCustomer()
  const updateCustomerMutation = useUpdateCustomer()
  const bulkDeleteMutation = useDeleteManyCustomers()
  const bulkStatusUpdateMutation = useUpdateManyCustomers()
  const { openModal } = useCustomerModal()

  const columns: ColumnDef<Customer>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Customer Name" />,
        cell: ({ row }) => (
          <div
            className="font-semibold text-blue-600 cursor-pointer hover:underline transition-all"
            onClick={() => openModal({ initialData: row.original, isViewMode: true })}
          >
            {row.getValue("name")}
          </div>
        ),
      },
      {
        accessorKey: "mobile",
        header: "Contact Number",
        cell: ({ row }) => <span className="font-mono text-xs">{row.original.mobile}</span>,
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <span className="text-slate-500">{row.original.email || "—"}</span>,
      },
      {
        accessorKey: "isDealer",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <StatusCell isActive={row.original.isDealer} />
            <span className="text-[10px] uppercase font-black text-slate-400">
              {row.original.isDealer ? "Dealer" : "Retail"}
            </span>
          </div>
        ),
      },
      {
        id: "actions",
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => (
          <ResourceActions
            resource={row.original}
            resourceName="Customer"
            resourceTitle={row.original.name}
            onView={() => openModal({ initialData: row.original, isViewMode: true })}
            onEdit={() => openModal({ initialData: row.original })}
            
            deleteMutation={deleteCustomerMutation}
            updateMutation={updateCustomerMutation}
          />
        ),
      },
    ],
    [deleteCustomerMutation, updateCustomerMutation, openModal]
  )

  return (
    <ResourceListPage<Customer, unknown>
      title="Customer Directory"
      resourceName="customers"
      description="Manage your client base, including retail customers and business dealers."
      onAdd={() => openModal()}
      addLabel="Add New Customer"
      columns={columns}
      useResourceQuery={useCustomers}
      bulkDeleteMutation={bulkDeleteMutation}
      bulkStatusUpdateMutation={bulkStatusUpdateMutation}
      initialFilters={INITIAL_FILTERS}
      searchPlaceholder="Search by name, mobile, or email..."
      filterDefinitions={[
        { key: "isActive", title: "Status", options: ACTIVE_STATUS_OPTIONS },
        { key: "isDealer", title: "Type", options: DEALER_OPTIONS },
      ]}
    />
  )
}