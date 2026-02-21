"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { ResourceListPage } from "@/components/shared/resource-list-page"
import { ResourceActions } from "@/components/shared/resource-actions"
import { DataTableColumnHeader } from "@/components/shared/data-table-column-header"
import { DateCell, ImageCell, StatusCell } from "@/components/shared/data-table-cells"
import {
  useBoxNumbers,
  useDeleteBoxNumber,
  useDeleteManyBoxNumbers,
  usePartialUpdateBoxNumber,
  useUpdateManyBoxNumbers,
} from "../box-number.api"
import { BoxNumber } from "../box-number.schema"
import { useBoxNumberModal } from "../box-number-modal-context"
import { BOX_NUMBER_STATUS_OPTIONS } from "../box-number.constants"

const INITIAL_FILTERS = {
  search: "",
  page: 1,
  pageSize: 10,
  status: "all", // Assuming "all" is a valid filter for status
}

export function BoxNumberList() {
  const deleteBoxNumberMutation = useDeleteBoxNumber()
  const updateBoxNumberMutation = usePartialUpdateBoxNumber()
  const bulkDeleteMutation = useDeleteManyBoxNumbers()
  const bulkStatusUpdateMutation = useUpdateManyBoxNumbers()
  const { openModal } = useBoxNumberModal()

  const columns: ColumnDef<BoxNumber>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Box Name/Number" />,
        cell: ({ row }) => (
          <div
            className="font-medium cursor-pointer hover:underline"
            onClick={() => openModal({ initialData: row.original, isViewMode: true })}
          >{row.getValue("name")}</div>
        ),
      },
      {
        accessorKey: "location",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Location" />,
        cell: ({ row }) => (
          <div
            className="font-medium cursor-pointer hover:underline"
            onClick={() => openModal({ initialData: row.original, isViewMode: true })}
          >{row.getValue("location")}</div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
        cell: ({ row }) => <DateCell date={row.original.createdAt} />,
      },
      {
        accessorKey: "status",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => (
          <StatusCell isActive={row.original.status === "ACTIVE"} />
        ),
      },
      {
        id: "actions",
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => (
          <ResourceActions
            resource={row.original}
            resourceName="Box Number"
            resourceTitle={row.original.name} // Display name in confirmation
            onView={(boxNumber) => openModal({ initialData: boxNumber, isViewMode: true })}
            onEdit={(boxNumber) => openModal({ initialData: boxNumber })}
            deleteMutation={deleteBoxNumberMutation}
            updateMutation={updateBoxNumberMutation}
          />
        ),
      },
    ], [openModal, deleteBoxNumberMutation, updateBoxNumberMutation]
  )

  const filterDefinitions = [
      {
        key: "status",
        title: "Status",
        options: BOX_NUMBER_STATUS_OPTIONS,
      },
    ]

  return (
    <>
      <ResourceListPage<BoxNumber, unknown>
        title="Box Numbers"
        resourceName="box-numbers"
        description="Manage box number locations for inventory."
        onAdd={() => openModal()}
        addLabel="Add Box Number"
        columns={columns}
        useResourceQuery={useBoxNumbers}
        bulkDeleteMutation={bulkDeleteMutation}
        bulkStatusUpdateMutation={bulkStatusUpdateMutation}
        initialFilters={INITIAL_FILTERS}
        searchPlaceholder="Search by name or location..."
        filterDefinitions={filterDefinitions}
      />
    </>
  )
}