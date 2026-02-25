"use client"
import { createModalContext } from "@/lib/modal-context-factory"
import { Permission } from "./permission.schema";

const { ModalProvider, useModal } = createModalContext<Permission>({
  featureName: "Permission",
  formName: "permissionForm",
  modalClassName: "max-w-lg",
  addDescription: "Create a new system permission.",
  editDescription: "Update permission details.",
  viewDescription: "View permission details.",
})

export const PermissionModalProvider = ModalProvider
export const usePermissionModal = useModal
