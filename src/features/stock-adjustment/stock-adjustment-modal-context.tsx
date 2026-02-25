"use client";
import { createModalContext } from "@/lib/modal-context-factory";
import { StockAdjustment } from "./stock-adjustment.schema";

const { ModalProvider, useModal } = createModalContext<StockAdjustment>({
  featureName: "Stock Adjustment",
  formName: "stockAdjustmentForm",
  modalClassName: "max-w-2xl max-h-[90vh] overflow-y-auto",
  addTitle: "Add Stock Adjustment",
  addDescription: "Record a new stock adjustment.",
  editTitle: "Edit Stock Adjustment",
  editDescription: "Update the details of this stock adjustment.",
  viewTitle: "View Stock Adjustment",
  viewDescription: "View stock adjustment details.",
});

export const StockAdjustmentModalProvider = ModalProvider;
export const useStockAdjustmentModal = useModal;