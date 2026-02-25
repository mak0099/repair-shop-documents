"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { ResourceListPage } from "@/components/shared/resource-list-page"
import { ResourceActions } from "@/components/shared/resource-actions"
import { DataTableColumnHeader } from "@/components/shared/data-table-column-header"
import { DateCell } from "@/components/shared/data-table-cells"

import {
  usePermissions,
  useDeletePermission,
  useDeleteManyPermissions,
  usePartialUpdatePermission,
  useUpdateManyPermissions,
} from "../permission.api"
import { Permission } from "../permission.schema"
import { usePermissionModal } from "../permission-modal-context"

const INITIAL_FILTERS = {
  search: "",
  page: 1,
  pageSize: 10,
}

export function PermissionList() {
  const deletePermissionMutation = useDeletePermission()
  const updatePermissionMutation = usePartialUpdatePermission()
  const bulkDeleteMutation = useDeleteManyPermissions()
  const bulkStatusUpdateMutation = useUpdateManyPermissions()
  const { openModal } = usePermissionModal()

  const columns: ColumnDef<Permission>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        cell: ({ row }) => (
          <div className="font-medium cursor-pointer hover:underline" onClick={() => openModal({ initialData: row.original, isViewMode: true })}>
            {row.getValue("name")}
          </div>
        ),
      },
      {
        accessorKey: "description",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
        cell: ({ row }) => <DateCell date={row.original.createdAt} />,
      },
      {
        id: "actions",
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => (
          <ResourceActions
            resource={row.original}
            resourceName="Permission"
            resourceTitle={row.original.name}
            onView={(permission) => openModal({ initialData: permission, isViewMode: true })}
            onEdit={(permission) => openModal({ initialData: permission })}
            deleteMutation={deletePermissionMutation}
            updateMutation={updatePermissionMutation}
          />
        ),
      },
    ],
    [deletePermissionMutation, updatePermissionMutation, openModal]
  )

  return (
    <>
      <ResourceListPage<Permission, unknown>
        title="Permissions"
        resourceName="permissions"
        description="Manage system permissions"
        onAdd={() => openModal()}
        addLabel="Add Permission"
        columns={columns}
        useResourceQuery={usePermissions}
        bulkDeleteMutation={bulkDeleteMutation}
        bulkStatusUpdateMutation={bulkStatusUpdateMutation}
        initialFilters={INITIAL_FILTERS}
        searchPlaceholder="Search by name..."
      />
    </>
  )
}
