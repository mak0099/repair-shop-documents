import { z } from "zod";

/**
 * Standard schema for Invoice Configuration.
 * Defaults are set to ensure the Form initialized with correct boolean states.
 */
export const invoiceSetupSchema = z.object({
  id: z.string().optional(),
  invoicePrefix: z.string()
    .min(1, "Prefix is required")
    .max(5, "Prefix cannot exceed 5 characters")
    .toUpperCase(),
  nextInvoiceNumber: z.number().int().min(1, "Must be at least 1"),
  templateSize: z.enum(["A4", "THERMAL_80MM", "THERMAL_58MM"]),
  showLogo: z.boolean().catch(true), // Robust boolean handling
  showSignature: z.boolean().catch(true),
  termsAndConditions: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

/**
 * Inferring type directly from schema.
 * Note: If you encounter 'undefined' errors in useForm, 
 * use 'as unknown as Resolver<InvoiceSetup>' in your component.
 */
export type InvoiceSetup = z.infer<typeof invoiceSetupSchema>;