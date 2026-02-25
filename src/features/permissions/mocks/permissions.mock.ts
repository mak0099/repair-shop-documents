import { Permission } from "../permission.schema"

export const mockPermissions: Permission[] = [
  {
    id: "perm-1",
    name: "users:create",
    description: "Allows creating new users.",
    createdAt: "2023-01-01T12:00:00Z",
    updatedAt: "2023-01-01T12:00:00Z",
  },
  {
    id: "perm-2",
    name: "users:read",
    description: "Allows reading user information.",
    createdAt: "2023-01-02T12:00:00Z",
    updatedAt: "2023-01-02T12:00:00Z",
  },
  {
    id: "perm-3",
    name: "users:update",
    description: "Allows updating user information.",
    createdAt: "2023-01-03T12:00:00Z",
    updatedAt: "2023-01-03T12:00:00Z",
  },
  {
    id: "perm-4",
    name: "users:delete",
    description: "Allows deleting users.",
    createdAt: "2023-01-04T12:00:00Z",
    updatedAt: "2023-01-04T12:00:00Z",
  },
]
