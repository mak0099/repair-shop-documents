import { z } from "zod";

export const boxNumberSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
});

export type BoxNumber = z.infer<typeof boxNumberSchema>;
