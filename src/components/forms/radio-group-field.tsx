import { Control } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface RadioOption {
  value: string
  label: string
}

interface RadioGroupFieldProps {
  control: Control<any>
  name: string
  label: React.ReactNode
  options?: RadioOption[]
  required?: boolean
  className?: string
}

export function RadioGroupField({
  control,
  name,
  label,
  required = false,
  options = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ],
  className,
}: RadioGroupFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("grid grid-cols-1 lg:grid-cols-2 gap-6 ", className)}>
          <FormLabel className={cn("text-xs", required && "required")}>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="flex flex-row space-x-6"
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`${name}_${option.value}`} />
                  <Label htmlFor={`${name}_${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
