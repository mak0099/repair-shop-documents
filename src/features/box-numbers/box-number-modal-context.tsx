"use client"
import { createModalContext } from "@/lib/modal-context-factory"
import { BoxNumber } from "./box-number.schema";

const { ModalProvider, useModal } = createModalContext<BoxNumber>({
  featureName: "Box Number",
  formName: "boxNumberForm",
  modalClassName: "max-w-lg",
  addDescription: "Create a new box number location.",
  editDescription: "Update the details of this box number.",
  viewDescription: "View box number details.",
})

export const BoxNumberModalProvider = ModalProvider
export const useBoxNumberModal = useModal