"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm, FieldErrors } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { TextField } from "@/components/forms/text-field"
import { TextareaField } from "@/components/forms/textarea-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { permissionSchema, PermissionFormValues, Permission } from "../permission.schema"
import { useCreatePermission, useUpdatePermission } from "../permission.api"

const PERMISSIONS_BASE_HREF = "/dashboard/admin/permissions"

interface PermissionFormProps {
  initialData?: Permission | null
  onSuccess?: (data: Permission) => void
  isViewMode?: boolean
}

export function PermissionForm({ initialData, onSuccess, isViewMode: initialIsViewMode = false }: PermissionFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate: createPermission, isPending: isCreating } = useCreatePermission()
  const { mutate: updatePermission, isPending: isUpdating } = useUpdatePermission()

  const [mode, setMode] = useState<"view" | "edit" | "create">(
    initialIsViewMode ? "view" : initialData ? "edit" : "create"
  )
  const isViewMode = mode === "view"

  const isPending = isCreating || isUpdating
  const isEditMode = !!initialData && mode !== "create"

  const form = useForm<PermissionFormValues>({
    resolver: zodResolver(permissionSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
    },
  })

  useEffect(() => {
    if (isEditMode && initialData) {
      form.reset({ ...initialData })
    }
  }, [initialData, isEditMode, form])

  const onFormError = (errors: FieldErrors<PermissionFormValues>) => {
    console.error("Permission form validation errors:", errors)
    toast.error("Please fill all required fields correctly.")
  }

  const handleCancel = () => {
    if (onSuccess) {
      onSuccess(initialData as Permission)
    } else {
      router.push(PERMISSIONS_BASE_HREF)
    }
  }

  function onSubmit(data: PermissionFormValues) {
    if (isEditMode && initialData) {
      updatePermission(
        { id: initialData.id, data },
        {
          onSuccess: (updatedPermission: Permission) => {
            toast.success("Permission updated successfully")
            queryClient.invalidateQueries({ queryKey: ["permissions"] })
            if (onSuccess) {
              onSuccess(updatedPermission)
            } else {
              router.push(PERMISSIONS_BASE_HREF)
            }
          },
          onError: (error) => {
            toast.error("Failed to update permission: " + error.message)
          },
        }
      )
    } else {
      createPermission(data, {
        onSuccess: (newPermission) => {
          toast.success("Permission created successfully")
          queryClient.invalidateQueries({ queryKey: ["permissions"] })
          if (onSuccess) {
            onSuccess(newPermission)
          } else {
            router.push(PERMISSIONS_BASE_HREF)
          }
        },
        onError: (error) => {
          toast.error("Failed to create permission: " + error.message)
        },
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onFormError)} className="relative p-4 space-y-4">
        {isViewMode && (
          <div className="absolute top-4 right-4 z-10">
            <Button size="sm" type="button" onClick={(e) => { e.preventDefault(); setMode("edit"); }}>
              Edit
            </Button>
          </div>
        )}
        <div className={isViewMode ? "pt-10" : ""}>
          <TextField control={form.control} name="name" label="Permission Name" required readOnly={isViewMode} placeholder="e.g., create:user" />
          <TextareaField control={form.control} name="description" label="Description" readOnly={isViewMode} placeholder="e.g., Allows creating a new user." />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          {isViewMode ? (
            <Button variant="outline" type="button" onClick={handleCancel}>Close</Button>
          ) : (
            <>
              <Button variant="outline" type="button" onClick={handleCancel}>Cancel</Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditMode ? "Save Changes" : "Save Permission"}
              </Button>
            </>
          )}
        </div>
      </form>
    </Form>
  )
}
