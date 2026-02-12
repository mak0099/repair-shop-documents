// src/features/acceptances/types/forms.ts

import { z } from "zod"

export const formSchema = z.object({
  customer_name: z.string().min(1, "Customer name is required"),
  estimated_price: z.string().optional(),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  color: z.string().optional(),
  accessories: z.string().optional(),
  device_type: z.string().min(1, "Device type is required"),
  current_status: z.string().min(1, "Status is required"),
  defect_description: z.string().optional(),
  notes: z.string().optional(),
  created_date: z.date(),
  imei: z.string().min(1, "IMEI is required"),
  secondary_imei: z.string().optional(),
  technician_id: z.string().min(1, "Technician is required"),
  warranty: z.string().optional(),
  replacement_device: z.string().optional(),
  dealer: z.string().optional(),
  price_offered: z.string().optional(),
  reserved_notes: z.string().optional(),
  important_information: z.enum(["Yes", "No"]),
  pin_unlock: z.enum(["Yes", "No"]),
  pin_unlock_number: z.string().optional(),
  urgent: z.enum(["Yes", "No"]),
  urgent_date: z.date().optional(),
  quote: z.enum(["Yes", "No"]),
  photo_1: z.any().optional(),
  photo_2: z.any().optional(),
  photo_3: z.any().optional(),
  photo_4: z.any().optional(),
  photo_5: z.any().optional(),
})

export type FormData = z.infer<typeof formSchema>
