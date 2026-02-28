import { z } from "zod";
import { BaseEntity } from "@/types/common";

export const masterSettingValueSchema = z.object({
  id: z.string().optional(),
  value: z.string().min(1, "Value is required"),
  isActive: z.boolean(),
});

export const masterSettingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  key: z.string().min(1, "Key is required"),
  description: z.string().optional().nullable(),
  values: z.array(masterSettingValueSchema),
});

export type MasterSettingFormValues = z.infer<typeof masterSettingSchema>;

export interface MasterSetting extends BaseEntity, MasterSettingFormValues {}