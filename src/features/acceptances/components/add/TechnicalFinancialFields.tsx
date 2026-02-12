"use client"

import { useFormContext } from "react-hook-form";

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type FormData } from "@/features/acceptances/types/forms";
import { DatePickerField } from "@/components/forms/date-picker-field";
import { ComboboxWithAdd } from "@/components/forms/combobox-with-add-field";

const warrantyOptions = ["No Warranty", "3 Months", "6 Months", "12 Months", "Lifetime"].map(v => ({ value: v, label: v }));
const technicianOptions = [
  { value: "tech-1", label: "John Technician" },
  { value: "tech-2", label: "Jane Repair" },
];
const replacementDeviceOptions = [
  { value: "iphone-x-loaner", label: "iPhone X (Loaner)" },
  { value: "samsung-s10-loaner", label: "Samsung S10 (Loaner)" },
];

export function TechnicalFinancialFields() {
  const { control } = useFormContext<FormData>();
  const handleAdd = (field: string) => {
    alert(`Add new ${field}`);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow border space-y-3">
      <DatePickerField
        control={control}
        name="created_date"
        label="Created Date"
        required
        disabled={(date: Date) => date > new Date() || date < new Date("1900-01-01")}
      />

      <FormField
        control={control}
        name="imei"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs required">IMEI/Serial No</FormLabel>
            <FormControl>
              <Input placeholder="Enter IMEI" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="secondary_imei"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Secondary IMEI</FormLabel>
            <FormControl>
              <Input placeholder="Enter secondary IMEI" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <ComboboxWithAdd
        control={control}
        name="technician_id"
        label="Technician"
        placeholder="Select technician"
        searchPlaceholder="Search technicians..."
        noResultsMessage="No technician found."
        options={technicianOptions}
        onAdd={() => handleAdd("Technician")}
        required
      />

      <ComboboxWithAdd
        control={control}
        name="warranty"
        label="Warranty"
        placeholder="Choose an option"
        searchPlaceholder="Search warranties..."
        noResultsMessage="No warranty found."
        options={warrantyOptions}
        onAdd={() => handleAdd("Warranty")}
      />

      <ComboboxWithAdd
        control={control}
        name="replacement_device"
        label="Replacement Device"
        placeholder="Select replacement device"
        searchPlaceholder="Search devices..."
        noResultsMessage="No device found."
        options={replacementDeviceOptions}
        onAdd={() => handleAdd("Replacement Device")}
      />

        <FormField
          control={control}
          name="dealer"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Dealer</FormLabel>
              <FormControl>
                <Input placeholder="For B2B partner reference" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="price_offered"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Price Offered</FormLabel>
              <FormControl>
                <Input type="number" placeholder="XXXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      <FormField
        control={control}
        name="reserved_notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Reserved Notes</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter reserved notes" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
