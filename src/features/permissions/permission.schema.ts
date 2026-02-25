import { z } from "zod";
import { BaseEntity } from "@/types/common";

/**
 * Validates system permissions.
 */
export const permissionSchema = z.object({
  name: z.string().trim().min(1, "Permission name is required"),
  description: z.string().trim().optional(),
});

export type PermissionFormValues = z.infer<typeof permissionSchema>;

export interface Permission extends BaseEntity, PermissionFormValues {}
