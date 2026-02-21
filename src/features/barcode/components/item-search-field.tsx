"use client"

import { Control } from "react-hook-form"
import { ItemComboboxField } from "@/features/items/components/item-combobox-field"

interface ItemSearchFieldProps {
  control: Control<any>
  name: string
  label?: string
}

export function ItemSearchField({ control, name, label = "Search Product to Print" }: ItemSearchFieldProps) {
  return (
    <ItemComboboxField
      control={control}
      name={name}
      label={label}
      placeholder="Type product name or SKU..."
    />
  )
}