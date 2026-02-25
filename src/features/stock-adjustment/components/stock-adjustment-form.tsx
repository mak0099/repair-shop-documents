"use client"

import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Info, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { TextField } from "@/components/forms/text-field"
import { TextareaField } from "@/components/forms/textarea-field"
import { RadioGroupField } from "@/components/forms/radio-group-field"
import { ComboboxWithAdd } from "@/components/forms/combobox-with-add-field"

import { stockAdjustmentSchema, StockAdjustment } from "../stock-adjustment.schema"
import { useCreateStockAdjustment, useUpdateStockAdjustment } from "../stock-adjustment.api"
import { STOCK_ADJUSTMENT_REASON_OPTIONS, STOCK_ADJUSTMENT_TYPE_OPTIONS } from "../stock-adjustment.constants"
import { StockComboboxField } from "@/features/stock/components/stock-combobox-field"

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
  const [mode] = useState<"view" | "edit" | "create">(
    initialIsViewMode ? "view" : initialData ? "edit" : "create"
  )
  const isViewMode = mode === "view"

  const { mutate: createAdjustment, isPending: isCreating } = useCreateStockAdjustment()
  const { mutate: updateAdjustment, isPending: isUpdating } = useUpdateStockAdjustment()
  const isPending = isCreating || isUpdating

  const form = useForm<StockAdjustment>({
    resolver: zodResolver(stockAdjustmentSchema),
    defaultValues: initialData || {
      stockId: "",
      type: "OUT",
      quantity: 1,
      reason: "Inventory Audit",
      date: new Date().toISOString(),
    },
  })

  function onSubmit(data: StockAdjustment) {
    const callbacks = {
      onSuccess: (res: StockAdjustment) => {
        toast.success(`Stock adjusted successfully`)
        // Invalidate relevant queries to keep data fresh
        queryClient.invalidateQueries({ queryKey: ["stock-adjustments"] })
        queryClient.invalidateQueries({ queryKey: ["stock"] })
        onSuccess?.(res)
      },
      onError: (error: any) => toast.error(error.message),
    }

    if (initialData?.id) {
      updateAdjustment({ id: initialData.id, data }, callbacks)
    } else {
      createAdjustment(data, callbacks)
    }
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Adjustment Details</CardTitle>
              <CardDescription>
                Select the specific stock unit and provide details for the adjustment.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StockComboboxField
                  control={form.control}
                  name="stockId"
                  label="Select Specific Unit (IMEI)"
                  placeholder="Search IMEI or Model..."
                  readOnly={isViewMode || !!initialData}
                />
                <RadioGroupField
                  control={form.control}
                  name="type"
                  label="Movement Type"
                  options={STOCK_ADJUSTMENT_TYPE_OPTIONS}
                  readOnly={isViewMode}
                  layout="vertical"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField
                  control={form.control}
                  name="quantity"
                  label="Adjustment Quantity"
                  type="number"
                  readOnly={isViewMode}
                />
                <ComboboxWithAdd
                  control={form.control}
                  name="reason"
                  label="Reason for Adjustment"
                  options={STOCK_ADJUSTMENT_REASON_OPTIONS}
                  placeholder="Select or type a reason..."
                  readOnly={isViewMode}
                />
              </div>
              <TextareaField
                control={form.control}
                name="note"
                label="Additional Context / Notes"
                placeholder="Why are you making this change? (e.g., specific damage details, audit reference)"
                readOnly={isViewMode}
                className="min-h-[80px]"
              />
            </CardContent>
          </Card>

          {!isViewMode && (
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-md flex gap-3 items-start">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
              <p className="text-xs text-amber-800">
                <strong>Warning:</strong> Making an adjustment will directly impact your live stock levels. Please double-check the IMEI and Quantity before saving.
              </p>
            </div>
          )}

          {isViewMode && initialData && (
            <div className="flex items-start gap-3 text-xs text-blue-600 bg-blue-50/50 p-3 rounded-md border border-blue-100">
              <Info className="h-4 w-4 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">Audit Information:</p>
                <p>Adjusted by: {initialData.adjustedBy || "System Admin"}</p>
                <p>Processed on: {new Date(initialData.date).toLocaleString()}</p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="ghost"
              type="button"
              onClick={() => onSuccess?.(initialData as StockAdjustment)}
            >
              {isViewMode ? "Close" : "Cancel"}
            </Button>
            {!isViewMode && (
              <Button type="submit" className="bg-slate-900 px-10" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Applying...
                  </>
                ) : (
                  "Confirm Adjustment"
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </FormProvider>
  )
}