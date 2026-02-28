"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2, Save, Loader2, Tag } from "lucide-react"
import { toast } from "sonner"

import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { TextField } from "@/components/forms/text-field"
import { attributeSchema, type Attribute } from "../attribute.schema"
import { useUpdateAttribute } from "../attribute.api"

interface AttributeFormProps {
  initialData?: Attribute;
  onSuccess: (data: Attribute) => void;
}

export function AttributeForm({ initialData, onSuccess }: AttributeFormProps) {
  const { mutate: updateAttribute, isPending } = useUpdateAttribute()

  /**
   * We initialize the form using the strict Attribute type inferred from Zod.
   */
  const form = useForm<Attribute>({
    resolver: zodResolver(attributeSchema),
    defaultValues: {
      id: initialData?.id || "",
      name: initialData?.name || "",
      key: initialData?.key || "",
      description: initialData?.description || "",
      /**
       * Crucial: We map the initial values to ensure isActive is never undefined.
       * This resolves the boolean | undefined mismatch.
       */
      values: initialData?.values?.map(v => ({
        id: v.id,
        value: v.value,
        isActive: typeof v.isActive === 'boolean' ? v.isActive : true
      })) || []
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "values"
  })

  function onSubmit(data: Attribute) {
    if (!initialData?.id) {
      toast.error("Resource ID is required for updates.")
      return
    }

    updateAttribute(
      { id: initialData.id, data }, 
      {
        onSuccess: (updatedData) => {
          toast.success("Attribute updated successfully.")
          onSuccess(updatedData)
        },
        onError: (err) => toast.error(err.message)
      }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-center">
          <span className="text-xs font-bold uppercase text-slate-600 flex items-center justify-center gap-2 tracking-widest">
            <Tag className="h-3.5 w-3.5" /> Configure Attribute: {initialData?.name}
          </span>
        </div>

        <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4 custom-scrollbar px-1">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-3 items-end group animate-in fade-in slide-in-from-top-1">
              <div className="flex-1">
                <TextField 
                  control={form.control} 
                  name={`values.${index}.value`} 
                  label={index === 0 ? "Option Value" : ""} 
                  placeholder="e.g. Red, 8GB, Stainless Steel" 
                />
              </div>
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 text-destructive/70 hover:text-destructive hover:bg-destructive/5"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          {fields.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
              No options defined yet.
            </div>
          )}
        </div>

        <Button 
          type="button" 
          variant="outline" 
          className="w-full border-dashed border-2 h-10 text-xs font-semibold" 
          onClick={() => append({ value: "", isActive: true })}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Option
        </Button>

        <div className="flex gap-3 pt-4 sticky bottom-0 bg-white">
          <Button type="submit" className="flex-1 h-11 bg-slate-900 shadow-lg" disabled={isPending}>
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Update Configuration
          </Button>
        </div>
      </form>
    </Form>
  )
}