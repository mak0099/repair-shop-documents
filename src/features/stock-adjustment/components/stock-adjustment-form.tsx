"use client"

import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { TextField } from "@/components/forms/text-field"
import { TextareaField } from "@/components/forms/textarea-field"
import { RadioGroupField } from "@/components/forms/radio-group-field"
import { ItemComboboxField } from "@/features/items/components/item-combobox-field"

import { stockAdjustmentSchema, StockAdjustment } from "../stock-adjustment.schema"
import { useCreateStockAdjustment, useUpdateStockAdjustment } from "../stock-adjustment.api"
import { ComboboxWithAdd } from "@/components/forms/combobox-with-add-field"

interface StockAdjustmentFormProps {
  initialData?: StockAdjustment | null
  onSuccess?: (data: StockAdjustment) => void
  isViewMode?: boolean
}

export function StockAdjustmentForm({
  initialData,
  onSuccess,
  isViewMode: initialIsViewMode = false,
}: StockAdjustmentFormProps) {
  const queryClient = useQueryClient()
  const [mode, setMode] = useState<"view" | "edit" | "create">(
    initialIsViewMode ? "view" : initialData ? "edit" : "create"
  )
  const isViewMode = mode === "view"
  
  const { mutate: createAdjustment, isPending: isCreating } = useCreateStockAdjustment()
  const { mutate: updateAdjustment, isPending: isUpdating } = useUpdateStockAdjustment()
  const isPending = isCreating || isUpdating

  const form = useForm<StockAdjustment>({
    resolver: zodResolver(stockAdjustmentSchema),
    defaultValues: initialData || {
      type: "OUT",
      quantity: 1,
      reason: "Damage",
      // The date is automatically set to the current date and is not user-editable in this form.
      date: new Date().toISOString(),
    },
  })

  function onSubmit(data: StockAdjustment) {
    const callbacks = {
      onSuccess: (res: StockAdjustment) => {
        toast.success(`Stock adjusted successfully`)
        queryClient.invalidateQueries({ queryKey: ["stock-adjustments"] })
        onSuccess?.(res)
      },
      onError: (error: any) => toast.error(error.message),
    }

    const action = initialData?.id
      ? (d: StockAdjustment) => updateAdjustment({ id: initialData.id!, data: d }, callbacks)
      : (d: StockAdjustment) => createAdjustment(d, callbacks)

    action(data)
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <ItemComboboxField 
                  control={form.control} 
                  name="itemId" 
                  label="Select Item" 
                  // Item selection is read-only in view mode or if editing an existing adjustment.
                  readOnly={isViewMode || !!initialData}
                />
                
                <RadioGroupField
                  control={form.control}
                  name="type"
                  label="Adjustment Type"
                  options={[
                    { label: "Stock In (+)", value: "IN" },
                    { label: "Stock Out (-)", value: "OUT" },
                  ]}
                  readOnly={isViewMode}
                />

                <TextField
                  control={form.control}
                  name="quantity"
                  label="Quantity"
                  type="number"
                  readOnly={isViewMode}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-4">
                <ComboboxWithAdd 
                  control={form.control} 
                  name="reason" 
                  readOnly={isViewMode} 
                />
                
                <TextareaField
                  control={form.control}
                  name="note"
                  label="Additional Notes"
                  placeholder="Explain why this adjustment is being made..."
                  readOnly={isViewMode}
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => onSuccess?.(initialData as StockAdjustment)}>
              {isViewMode ? "Close" : "Cancel"}
            </Button>
            {!isViewMode && (
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Adjustment
              </Button>
            )}
          </div>
        </form>
      </Form>
    </FormProvider>
  )
}