"use client"

import { useFieldArray, useFormContext } from "react-hook-form"
import { Plus, Trash2 } from "lucide-react"

import { TextField } from "@/components/forms/text-field"
import { Button } from "@/components/ui/button"
import { FormLabel } from "@/components/ui/form"

interface AttributeValueFieldProps {
  name: string
  label?: string
  readOnly?: boolean
}

export function AttributeValueField({
  name,
  label = "Possible Values",
  readOnly = false,
}: AttributeValueFieldProps) {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormLabel className="text-base font-semibold">{label}</FormLabel>
        {!readOnly && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ value: "" })}
            className="h-8"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Value
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
            <div className="flex-1">
              <TextField
                control={control}
                name={`${name}.${index}.value`}
                placeholder="e.g. 8GB, Blue, or OLED"
                readOnly={readOnly}
                label={index === 0 ? "Value" : ""} 
              />
            </div>
            
            {!readOnly && fields.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={`text-destructive hover:text-destructive/80 ${index === 0 ? "mt-8" : "mt-0"}`}
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}