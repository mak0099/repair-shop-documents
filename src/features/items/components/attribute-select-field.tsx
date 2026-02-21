"use client"

import { Control } from "react-hook-form"
import { ComboboxWithAdd } from "@/components/forms/combobox-with-add-field"
import { useAttributes } from "@/features/attributes/attribute.api"
import { useAttributeModal } from "@/features/attributes/attribute-modal-context"

interface AttributeSelectFieldProps {
  control: Control<any>
  name: string
  label: string
  attributeName: string // e.g., "RAM", "ROM", "Color"
  required?: boolean
  readOnly?: boolean
}

export function AttributeSelectField({
  control,
  name,
  label,
  attributeName,
  required = false,
  readOnly = false,
}: AttributeSelectFieldProps) {
  const { data: attributes, isLoading } = useAttributes()
  const { openModal } = useAttributeModal()

  // Finding the specific attribute (e.g., RAM) and its values
  const attribute = attributes?.find((a) => a.name.toLowerCase() === attributeName.toLowerCase())
  const options = attribute?.values.map((v) => ({
    label: v.value,
    value: v.value,
  })) || []

  return (
    <ComboboxWithAdd
      control={control}
      name={name}
      label={label}
      placeholder={`Select ${attributeName}`}
      options={options}
      isLoading={isLoading}
      required={required}
      readOnly={readOnly}
      onAddClick={() => openModal()}
    />
  )
}