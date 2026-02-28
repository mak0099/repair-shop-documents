"use client"

import { useForm, useFieldArray, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2, Save, Loader2, Wrench } from "lucide-react"
import { toast } from "sonner"

import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { TextField } from "@/components/forms/text-field"
import { masterSettingSchema, MasterSetting, MasterSettingFormValues } from "../master-setting.schema"
import { useUpdateMasterSetting } from "../master-setting.api";

interface MasterSettingFormProps {
  initialData?: MasterSetting;
  onSuccess: (data: MasterSetting) => void;
}

export function MasterSettingForm({ initialData, onSuccess }: MasterSettingFormProps) {
  const { mutate: updateMaster, isPending } = useUpdateMasterSetting()

  const form = useForm<MasterSettingFormValues>({
    resolver: zodResolver(masterSettingSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      key: initialData.key,
      description: initialData.description,
      values: initialData.values || [],
    } : { 
      name: "", 
      key: "", 
      values: [] 
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "values"
  })

  function onSubmit(data: MasterSettingFormValues) {
    if (!initialData?.id) {
      toast.error("Resource ID is missing. Cannot perform update.");
      return;
    }

    updateMaster({ id: initialData.id, data }, {
      onSuccess: (updatedData) => {
        toast.success(`${updatedData.name} configuration updated.`);
        onSuccess(updatedData as MasterSetting);
      },
      onError: (err) => toast.error(err.message)
    })
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200 flex items-center justify-center gap-3">
            <Wrench className="h-4 w-4 text-slate-400" />
            <span className="text-xs font-bold uppercase text-slate-600 tracking-widest">
              Configuring: {initialData?.name || "System Master"}
            </span>
          </div>

          <div className="max-h-[400px] overflow-y-auto pr-3 space-y-4 custom-scrollbar">
            {fields.map((field, index) => (
              <div 
                key={field.id} 
                className="flex gap-3 items-end group animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <div className="flex-1">
                  <TextField 
                    control={form.control} 
                    name={`values.${index}.value`} 
                    label={index === 0 ? "Entry Name" : ""} 
                    placeholder="Enter value..." 
                    inputClassName="h-10 focus-visible:ring-slate-900"
                  />
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 text-destructive hover:bg-red-50 hover:text-red-600 transition-all"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {fields.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-sm border-2 border-dashed rounded-xl bg-slate-50/50">
                No entries found. Add a new row to get started.
              </div>
            )}
          </div>

          <Button 
            type="button" 
            variant="outline" 
            className="w-full border-dashed h-10 text-xs font-semibold hover:bg-slate-50 transition-colors" 
            onClick={() => append({ value: "", isActive: true })}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Row
          </Button>

          <div className="flex gap-3 pt-6 border-t border-slate-100">
            <Button 
              type="submit" 
              className="flex-1 bg-slate-900 hover:bg-slate-800 shadow-md" 
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Master Settings
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  )
}