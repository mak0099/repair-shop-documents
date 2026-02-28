"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { ResourceListPage } from "@/components/shared/resource-list-page"
import { ResourceActions } from "@/components/shared/resource-actions"
import { DataTableColumnHeader } from "@/components/shared/data-table-column-header"
import { StatusCell } from "@/components/shared/data-table-cells"
import {
  useBoxNumbers,
  useDeleteBoxNumber,
  useDeleteManyBoxNumbers,
  usePartialUpdateBoxNumber,
  useUpdateManyBoxNumbers,
} from "../box-number.api"
import { BoxNumber } from "../box-number.schema"
import { useBoxNumberModal } from "../box-number-modal-context"

/**
 * Filter Options: Standardizing to 'isActive' pattern.
 */
const ACTIVE_STATUS_OPTIONS = [
  { label: "Active", value: "true" },
  { label: "Inactive", value: "false" },
]

const INITIAL_FILTERS = {
  search: "",
  page: 1,
  pageSize: 10,
  isActive: "all",
}

export function BoxNumberList() {
  const deleteBoxNumberMutation = useDeleteBoxNumber()
  const updateBoxNumberMutation = usePartialUpdateBoxNumber()
  const bulkDeleteMutation = useDeleteManyBoxNumbers()
  const bulkStatusUpdateMutation = useUpdateManyBoxNumbers()
  const { openModal } = useBoxNumberModal()

  /**
   * Column Definitions
   * No more 'BoxNumberWithId' hacks. Using the base BoxNumber type.
   */
  const columns: ColumnDef<BoxNumber>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Box Name/Number" />,
        cell: ({ row }) => (
          <div
            className="font-medium cursor-pointer hover:underline text-primary"
            onClick={() => openModal({ initialData: row.original, isViewMode: true })}
          >
            {row.getValue("name")}
          </div>
        ),
      },
      {
        accessorKey: "location",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Location" />,
      },
      {
        accessorKey: "isActive",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => <StatusCell isActive={row.original.isActive} />,
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <ResourceActions
            // Here we only cast the specific resource for the actions
            resource={row.original as BoxNumber & { id: string }}
            resourceName="Box Number"
            resourceTitle={row.original.name}
            onView={(data) => openModal({ initialData: data, isViewMode: true })}
            onEdit={(data) => openModal({ initialData: data })}
            deleteMutation={deleteBoxNumberMutation}
            updateMutation={updateBoxNumberMutation as never}
          />
        ),
      },
    ],
    [openModal, deleteBoxNumberMutation, updateBoxNumberMutation]
  )

  return (
    <ResourceListPage<BoxNumber, unknown>
      title="Box Numbers"
      resourceName="box-numbers"
      description="Manage and track physical storage boxes."
      onAdd={() => openModal()}
      addLabel="Add Box"
      columns={columns}
      useResourceQuery={useBoxNumbers}
      bulkDeleteMutation={bulkDeleteMutation}
      bulkStatusUpdateMutation={bulkStatusUpdateMutation}
      initialFilters={INITIAL_FILTERS}
      searchPlaceholder="Search name or location..."
      filterDefinitions={[
        {
          key: "isActive",
          title: "Status",
          options: ACTIVE_STATUS_OPTIONS,
        },
      ]}
    />
  )
}