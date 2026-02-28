"use client"

import { useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { ResourceListPage } from "@/components/shared/resource-list-page"
import { ResourceActions } from "@/components/shared/resource-actions"
import { DataTableColumnHeader } from "@/components/shared/data-table-column-header"
import { DateCell, StatusCell } from "@/components/shared/data-table-cells"

import {
  useCategories,
  useDeleteCategory,
  useDeleteManyCategories,
  usePartialUpdateCategory,
  useUpdateManyCategories,
} from "../category.api"
import { Category } from "../category.schema"
import { useCategoryModal } from "../category-modal-context"

/**
 * Filter Options: Standardized to use the 'isActive' boolean pattern.
 */
const ACTIVE_STATUS_OPTIONS = [
  { label: "Active Only", value: "true" },
  { label: "Inactive Only", value: "false" },
]

const INITIAL_FILTERS = {
  search: "",
  page: 1,
  pageSize: 10,
  isActive: "all", // Changed from 'status' to 'isActive'
}

/**
 * Extended type for the list to include the joined 'parent' object 
 * that usually comes from the backend.
 */
interface CategoryInList extends Category {
  parent?: Pick<Category, 'id' | 'name'>;
}

export function CategoryList() {
  const deleteCategoryMutation = useDeleteCategory()
  const updateCategoryMutation = usePartialUpdateCategory()
  const bulkDeleteMutation = useDeleteManyCategories()
  const bulkStatusUpdateMutation = useUpdateManyCategories()
  const { openModal } = useCategoryModal()

  const columns: ColumnDef<Category>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Category Name" />,
        cell: ({ row }) => (
          <div 
            className="font-medium cursor-pointer hover:underline text-blue-600" 
            onClick={() => openModal({ initialData: row.original, isViewMode: true })}
          >
            {row.getValue("name")}
          </div>
        ),
      },
      {
        accessorKey: "description",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
        cell: ({ row }) => (
          <span className="text-muted-foreground line-clamp-1">
            {row.original.description || "—"}
          </span>
        ),
      },
      {
        id: "parent",
        header: "Parent Category",
        cell: ({ row }) => {
          const category = row.original as CategoryInList;
          return category.parent?.name ?? "Main Category";
        },
      },
      {
        accessorKey: "isActive",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Active?" />,
        cell: ({ row }) => <StatusCell isActive={row.original.isActive} />,
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
            resourceName="Category"
            resourceTitle={row.original.name}
            onView={(category) => openModal({ initialData: category as Category, isViewMode: true })}
            onEdit={(category) => openModal({ initialData: category as Category })}
            deleteMutation={deleteCategoryMutation}
            updateMutation={updateCategoryMutation}
          />
        ),
      },
    ],
    [deleteCategoryMutation, updateCategoryMutation, openModal]
  )

  return (
    <ResourceListPage<Category, unknown>
      title="Categories"
      resourceName="categories"
      description="Organize your inventory with a hierarchical category structure."
      onAdd={() => openModal()}
      addLabel="Add Category"
      columns={columns}
      useResourceQuery={useCategories}
      bulkDeleteMutation={bulkDeleteMutation}
      bulkStatusUpdateMutation={bulkStatusUpdateMutation}
      initialFilters={INITIAL_FILTERS}
      searchPlaceholder="Search category name..."
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