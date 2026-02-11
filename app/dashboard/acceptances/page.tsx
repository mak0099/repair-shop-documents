"use client"

import { useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export type Acceptance = {
  number: string
  customer: string
  createdDate: string
  deviceType: string
  brand: string
  model: string
  statusType: string
  currentStatus: "IN REPAIR" | "WAITING PARTS" | "READY" | "DELIVERED" | "CANCELLED"
  technician: string
  createdBy: string
  deliveryDate: string
  estimatedPrice: number
}

const data: Acceptance[] = [
  {
    number: "41604-2025",
    customer: "John Doe",
    createdDate: "2025-01-15",
    deviceType: "Smartphone",
    brand: "Apple",
    model: "iPhone 12",
    statusType: "Repair",
    currentStatus: "IN REPAIR",
    technician: "John Tech",
    createdBy: "Admin",
    deliveryDate: "2025-01-20",
    estimatedPrice: 150,
  },
  {
    number: "41605-2025",
    customer: "Jane Smith",
    createdDate: "2025-01-16",
    deviceType: "Tablet",
    brand: "Samsung",
    model: "Galaxy Tab S7",
    statusType: "Repair",
    currentStatus: "WAITING PARTS",
    technician: "Jane Tech",
    createdBy: "Manager",
    deliveryDate: "",
    estimatedPrice: 120,
  },
  {
    number: "41606-2025",
    customer: "Bob Johnson",
    createdDate: "2025-01-14",
    deviceType: "Laptop",
    brand: "Dell",
    model: "XPS 13",
    statusType: "Repair",
    currentStatus: "READY",
    technician: "Bob Tech",
    createdBy: "Front Desk",
    deliveryDate: "2025-01-18",
    estimatedPrice: 200,
  },
  {
    number: "41607-2025",
    customer: "Alice Brown",
    createdDate: "2025-01-17",
    deviceType: "Smartphone",
    brand: "Google",
    model: "Pixel 6",
    statusType: "Repair",
    currentStatus: "DELIVERED",
    technician: "Alice Tech",
    createdBy: "Supervisor",
    deliveryDate: "2025-01-19",
    estimatedPrice: 100,
  },
  {
    number: "41608-2025",
    customer: "Charlie Wilson",
    createdDate: "2025-01-18",
    deviceType: "Smartphone",
    brand: "OnePlus",
    model: "9 Pro",
    statusType: "Repair",
    currentStatus: "CANCELLED",
    technician: "Charlie Tech",
    createdBy: "Admin",
    deliveryDate: "",
    estimatedPrice: 180,
  },
]

export const columns: ColumnDef<Acceptance>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "number",
    header: "Number",
    cell: ({ row }) => <div className="font-medium">{row.getValue("number")}</div>,
  },
  {
    accessorKey: "customer",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("customer")}</div>,
  },
  {
    accessorKey: "createdDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("createdDate")}</div>,
  },
  {
    accessorKey: "deviceType",
    header: "Device Type",
    cell: ({ row }) => <div>{row.getValue("deviceType")}</div>,
  },
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({ row }) => <div>{row.getValue("brand")}</div>,
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => <div>{row.getValue("model")}</div>,
  },
  {
    accessorKey: "statusType",
    header: "Status Type",
    cell: ({ row }) => <div>{row.getValue("statusType")}</div>,
  },
  {
    accessorKey: "currentStatus",
    header: "Current Status",
    cell: ({ row }) => {
      const status = row.getValue("currentStatus") as string
      const getStatusBadgeVariant = (status: string) => {
        switch (status) {
          case "DELIVERED":
            return "default"
          case "READY":
            return "secondary"
          case "IN REPAIR":
            return "outline"
          case "WAITING PARTS":
            return "destructive"
          case "CANCELLED":
            return "destructive"
          default:
            return "outline"
        }
      }
      return (
        <Badge variant={getStatusBadgeVariant(status)}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "technician",
    header: "Technician",
    cell: ({ row }) => <div>{row.getValue("technician")}</div>,
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({ row }) => <div>{row.getValue("createdBy")}</div>,
  },
  {
    accessorKey: "deliveryDate",
    header: "Delivery Date",
    cell: ({ row }) => <div>{row.getValue("deliveryDate") || "-"}</div>,
  },
  {
    accessorKey: "estimatedPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estimated Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>${row.getValue("estimatedPrice")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const acceptance = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(acceptance.number)}
            >
              Copy acceptance number
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit acceptance</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function AcceptanceListPage() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Acceptance List</h1>
        <p className="text-muted-foreground">TanStack Table with sorting, filtering, status badges, and actions</p>
      </div>

      <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter acceptances..."
          value={(table.getColumn("customer")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("customer")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      </div>
    </div>
  )
}