export interface Customer {
  id?: string;
  name: string; // Required
  email?: string;
  login_name?: string;
  phone?: string;
  mobile: string; // Required
  fax?: string;
  "fiscal-code"?: string; // Italian Fiscal Code
  location?: string;
  province?: string;
  address?: string;
  "postal-code"?: string;
  vat?: string; // Business VAT
  branch_tid: string; // Required
  box_number_tid?: string;
  
  // Flags
  isDealer: boolean;
  isDesktopCustomer: boolean; // Default: true
  isCustomer: boolean; // Online customer flag
  active_inactive: boolean; // Default: true
}