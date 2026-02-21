"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, FieldErrors } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { TextField } from "@/components/forms/text-field"
import { CheckboxField } from "@/components/forms/checkbox-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { boxNumberSchema, BoxNumber } from "../box-number.schema"
import { useCreateBoxNumber, useUpdateBoxNumber } from "../box-number.api"
import { BOX_NUMBERS_BASE_HREF } from "@/config/paths"

interface BoxNumberFormProps {
  initialData?: BoxNumber | null
  onSuccess?: (data: BoxNumber) => void
  isViewMode?: boolean
}

export function BoxNumberForm({ initialData, onSuccess, isViewMode: initialIsViewMode = false }: BoxNumberFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate: createBoxNumber, isPending: isCreating } = useCreateBoxNumber()
  const { mutate: updateBoxNumber, isPending: isUpdating } = useUpdateBoxNumber()

  const [mode, setMode] = useState<"view" | "edit" | "create">(
    initialIsViewMode ? "view" : initialData ? "edit" : "create"
  )
  const isViewMode = mode === "view"

  const isPending = isCreating || isUpdating
  const isEditMode = !!initialData && mode !== "create"

  const form = useForm<BoxNumberFormValues>({
    resolver: zodResolver(boxNumberSchema),
    defaultValues: initialData
      ? { ...initialData, logo: undefined } // Set logo to undefined to avoid validation issues with URL string
      : {
          name: "",
          logo: undefined,
          isActive: true,
        },
  })

  const onFormError = (errors: FieldErrors<BoxNumberFormValues>) => {
    console.error("BoxNumber form validation errors:", errors)
    toast.error("Please fill all required fields correctly.")
  }

  const handleCancel = () => {
    if (onSuccess) {
      onSuccess(initialData as BoxNumber)
    } else {
      router.push(BOX_NUMBERS_BASE_HREF)
    }
  }

  function onSubmit(data: BoxNumberFormValues) {
    if (isEditMode && initialData) {
      updateBoxNumber(
        { id: initialData.id, data },
        {
          onSuccess: (updatedBoxNumber: BoxNumber) => {
            toast.success("Box Number updated successfully")
            queryClient.invalidateQueries({ queryKey: ["boxNumbers"] })
            if (onSuccess) {
              onSuccess(updatedBoxNumber)
            } else {
              router.push(BOX_NUMBERS_BASE_HREF)
            }
          },
          onError: (error) => {
            toast.error("Failed to update boxNumber: " + error.message)
          },
        }
      )
    } else {
      createBoxNumber(data, {
        onSuccess: (newBoxNumber) => {
          toast.success("Box Number created successfully")
          queryClient.invalidateQueries({ queryKey: ["boxNumbers"] })
          if (onSuccess) {
            onSuccess(newBoxNumber)
          } else {
            router.push(BOX_NUMBERS_BASE_HREF)
          }
        },
        onError: (error) => {
          toast.error("Failed to create boxNumber: " + error.message)
        },
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onFormError)} className="relative p-4 space-y-4">
        {isViewMode && (
          <div className="absolute top-4 right-4 z-10">
            <Button size="sm" type="button" onClick={(e) => {
              e.preventDefault()
              setMode("edit")
            }}>
              Edit
            </Button>
          </div>
        )}
        <div className={isViewMode ? "pt-10" : ""}>
          <TextField
            control={form.control}
            name="name"
            label="Box Name/Number"
            placeholder="e.g., Box-101"
            required
            readOnly={isViewMode}
          />
          <TextField
            control={form.control}
            name="location"
            label="Location"
            placeholder="e.g., Front Shelf"
            required
            isViewMode={isViewMode}
          />
          <TextField
            control={form.control}
            name="description"
            label="Description"
            placeholder="Optional description"
            isViewMode={isViewMode}
          />
          <CheckboxField
            control={form.control}
            name="status"
            label="Status (Active/Inactive)"
            className="rounded-md border p-3"
            disabled={isViewMode} // Assuming status can be toggled
            // You might need to adjust this to a RadioGroupField or SelectField
            // if the schema's enum is not directly compatible with a boolean checkbox.
            // For now, assuming a boolean representation for simplicity.
            // If status is "ACTIVE" or "INACTIVE", you'd need a different component.
            // Example:
            // <RadioGroupField
            //   control={form.control}
            //   name="status"
            //   label="Status"
            //   options={[
            //     { label: "Active", value: "ACTIVE" },
            //     { label: "Inactive", value: "INACTIVE" },
            //   ]}
            //   readOnly={isViewMode}
            // />
          />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          {isViewMode ? (
            <Button variant="outline" type="button" onClick={handleCancel}>Close</Button>
          ) : (
            <>
              <Button variant="outline" type="button" onClick={handleCancel}>Cancel</Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditMode ? "Save Changes" : "Save BoxNumber"}
              </Button>
            </>
          )}
        </div>
      </form>
    </Form>
  )
}