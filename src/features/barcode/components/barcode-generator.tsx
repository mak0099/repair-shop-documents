"use client"

import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Printer, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TextField } from "@/components/forms/text-field"
import { CheckboxField } from "@/components/forms/checkbox-field"

import { barcodeSchema, BarcodeRequest } from "../barcode.schema"
import { ItemSearchField } from "./item-search-field"
import { BarcodePrintLayout } from "./barcode-print-layout"
import { ComboboxWithAdd } from "@/components/forms/combobox-with-add-field"

export function BarcodeGenerator() {
  const [previewData, setPreviewData] = useState<BarcodeRequest | null>(null)

  const form = useForm<BarcodeRequest>({
    resolver: zodResolver(barcodeSchema),
    defaultValues: {
      quantity: 1,
      labelSize: "38x25mm",
      includePrice: true,
      includeName: true,
    },
  })

  const { control, handleSubmit, watch } = form

  function handlePreview(data: BarcodeRequest) {
    setPreviewData(data)
  }

  const handlePrint = () => {
    window.print() // Simple browser print trigger
  }

  return (
    <div className="space-y-6">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(handlePreview)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Configuration */}
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-md">Print Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ItemSearchField control={control} name="itemId" />
                  
                  <TextField 
                    control={control} 
                    name="quantity" 
                    label="Number of Labels" 
                    type="number" 
                  />

                  <ComboboxWithAdd
                    control={control}
                    name="labelSize"
                    label="Label Size"
                    options={[
                      { label: "Small (38x25mm)", value: "38x25mm" },
                      { label: "Medium (50x30mm)", value: "50x30mm" },
                      { label: "Standard A4 (40 labels)", value: "A4_40_Labels" },
                    ]}
                  />

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <CheckboxField control={control} name="includeName" label="Show Name" />
                    <CheckboxField control={control} name="includePrice" label="Show Price" />
                  </div>

                  <Button type="submit" className="w-full">
                    <RefreshCw className="mr-2 h-4 w-4" /> Generate Preview
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right: Preview Area */}
            <div className="lg:col-span-2">
              <Card className="min-h-[400px]">
                <CardHeader className="flex flex-row items-center justify-between border-b">
                  <CardTitle className="text-md">Print Preview</CardTitle>
                  {previewData && (
                    <Button onClick={handlePrint} variant="default" size="sm">
                      <Printer className="mr-2 h-4 w-4" /> Print Labels
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="bg-muted/30 p-8 flex justify-center overflow-auto">
                  {previewData ? (
                    <BarcodePrintLayout data={previewData} />
                  ) : (
                    <div className="text-center text-muted-foreground py-20">
                      Select an item and click generate to see preview
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}