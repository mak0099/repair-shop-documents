export interface Acceptance {
  id: string; // Internal UUID
  acceptance_number: string; // e.g., 41604-2025
  
  // Basic Information
  customer_name: string; // Links to Customer ID
  estimated_price?: number;
  brand: string;
  model: string;
  color?: string;
  accessories?: string;
  device_type: string;
  current_status: string;
  defect_description?: string;
  notes?: string;
  created_date: string;
  imei: string;
  secondary_imei?: string;
  technician_id: string;
  warranty?: string;
  replacement_device?: string;
  dealer?: string;
  price_offered?: number;
  reserved_notes?: string;
  
  // Flags & Conditional Fields
  important_information: boolean;
  pin_unlock: boolean;
  pin_unlock_number?: string;
  urgent: boolean;
  urgent_date?: string;
  quote: boolean;
  
  // Media (URLs or paths for mock)
  photos: string[]; // photo_1 to photo_5
  
  // Metadata for Logic
  branch_id: string;
}