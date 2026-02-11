import * as z from "zod";

export const formSchema = z.object({
  // 1. Customer Name (Searchable Dropdown)
  customer_name: z.string().min(1, "Customer name is required"),

  // 2. Estimated Price (Number)
  estimated_price: z.string().optional(),

  // 3. Brand (Searchable Dropdown)
  brand: z.string().min(1, "Brand is required"),

  // 4. Model (Searchable Dropdown)
  model: z.string().min(1, "Model is required"),

  // 5. Color (Searchable Dropdown)
  color: z.string().optional(),

  // 6. Accessories (Text Input)
  accessories: z.string().optional(),

  // 7. Device Type (Dropdown)
  device_type: z.string().min(1, "Device type is required"),

  // 8. Current Status (Dropdown)
  current_status: z.string().min(1, "Current status is required"),

  // 9. Defect Description (Text Area)
  defect_description: z.string().optional(),

  // 10. Notes (Text Area)
  notes: z.string().optional(),

  // 11. Created Date (Date Picker) - Auto-populated
  created_date: z.date(),

  // 12. IMEI/Serial No (Text Input)
  imei: z.string().min(1, "IMEI is required"),

  // 13. Secondary IMEI (Text Input)
  secondary_imei: z.string().optional(),

  // 14. Technician (Dropdown)
  technician_id: z.string().min(1, "Technician is required"),

  // 15. Warranty (Dropdown)
  warranty: z.string().optional(),

  // 16. Replacement Device (Text Input)
  replacement_device: z.string().optional(),

  // 17. Dealer (Text Input)
  dealer: z.string().optional(),

  // 18. Price Offered (Number)
  price_offered: z.string().optional(),

  // 19. Reserved Notes (Text Area)
  reserved_notes: z.string().optional(),

  // 20. Important Information (Radio Yes/No)
  important_information: z.enum(["Yes", "No"]),

  // 21. Pin Unlock (Radio Yes/No)
  pin_unlock: z.enum(["Yes", "No"]),

  // 22. Pin Unlock Number (Text Input) - Conditional
  pin_unlock_number: z.string().optional(),

  // 23. Urgent (Radio Yes/No)
  urgent: z.enum(["Yes", "No"]),

  // 24. Urgent Date (Date Picker) - Conditional
  urgent_date: z.date().optional(),

  // 25. Quote (Radio Yes/No)
  quote: z.enum(["Yes", "No"]),

  // 26-30. Photos (File Upload)
  photo_1: z.any().optional(),
  photo_2: z.any().optional(),
  photo_3: z.any().optional(),
  photo_4: z.any().optional(),
  photo_5: z.any().optional(),
}).refine((data) => {
  // Conditional validation: Pin Unlock Number required if Pin Unlock = Yes
  if (data.pin_unlock === "Yes") {
    return data.pin_unlock_number && data.pin_unlock_number.length > 0
  }
  return true
}, {
  message: "Pin unlock number is required when Pin Unlock is Yes",
  path: ["pin_unlock_number"],
}).refine((data) => {
  // Conditional validation: Urgent Date required if Urgent = Yes
  if (data.urgent === "Yes") {
    return data.urgent_date
  }
  return true
}, {
  message: "Urgent date is required when Urgent is Yes",
  path: ["urgent_date"],
});

export type FormData = z.infer<typeof formSchema>;
