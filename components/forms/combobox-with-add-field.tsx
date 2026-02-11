"use client"

import * as React from "react"
import { Control, useController } from "react-hook-form"
import { type FormData } from "@/types/forms"

import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

interface ComboboxWithAddProps {
  control: Control<any>
  name: any
  label: string
  placeholder: string
  searchPlaceholder: string
  noResultsMessage: string
  options: { value: string; label: string }[]
  onAdd: () => void
  required?: boolean
}

export function ComboboxWithAdd({
  control,
  name,
  label,
  placeholder,
  searchPlaceholder,
  noResultsMessage,
  options,
  onAdd,
  required,
}: ComboboxWithAddProps) {
  const [open, setOpen] = React.useState(false)
  const {
    field,
  } = useController({
    name,
    control,
  })

  const selectedValue = options.find((option) => option.value === field.value)?.label

  return (
    <FormItem>
      <FormLabel className={cn("text-xs", required && "required")}>{label}</FormLabel>
      <div className="flex items-end">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "flex-1 justify-between rounded-r-none",
                  !field.value && "text-muted-foreground"
                )}
              >
                {selectedValue || placeholder}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="p-0" style={{ width: "var(--radix-popover-trigger-width)" }} align="start">
            <Command>
              <CommandInput placeholder={searchPlaceholder} />
              <CommandList>
                <CommandEmpty>{noResultsMessage}</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      value={option.label}
                      key={option.value}
                      onSelect={() => {
                        field.onChange(option.value)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          option.value === field.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Button 
          type="button" 
          variant="outline" 
          size="icon" 
          className="rounded-l-none border-l-0"
          onClick={onAdd}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <FormMessage />
    </FormItem>
  )
}
