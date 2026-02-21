"use client"
import { createModalContext } from "@/lib/modal-context-factory"
import { Attribute } from "./attribute.schema";

const { ModalProvider, useModal } = createModalContext<Attribute>({
  featureName: "Attribute",
  formName: "attributeForm",
  modalClassName: "max-w-lg",
  editDescription: "Update the values for this attribute.",
})

export const AttributeModalProvider = ModalProvider
export const useAttributeModal = useModal