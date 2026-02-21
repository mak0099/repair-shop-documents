// src/features/models/model-modal-context.tsx
import { createModalContext } from "@/lib/modal-context-factory"
import type { Model } from "./model.schema"

export interface ModelModalOptions {
  initialData?: Model | null
  onSuccess?: (data: Model) => void
  isViewMode?: boolean
  brandId?: string
}

const { ModalProvider, useModal } = createModalContext<Model, ModelModalOptions>({
  featureName: "Model",
  formName: "modelForm",
  modalClassName: "max-w-lg",
  addDescription: "Create a new device model.",
  editDescription: "Update model details.",
  viewDescription: "View model details.",
})

export const ModelModalProvider = ModalProvider
export const useModelModal = useModal
