import { z } from "zod";

export const boxNumberSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Box name/number is required"), // e.g., "Box-101" or "Drawer-A"
  location: z.string().min(2, "Location description is required"), // e.g., "Front Shelf" or "Repair Room"
  description: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

export type BoxNumber = z.infer<typeof boxNumberSchema>;