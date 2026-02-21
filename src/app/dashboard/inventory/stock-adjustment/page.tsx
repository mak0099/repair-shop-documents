import { StockAdjustmentList } from "@/features/stock-adjustment"

export default function AdjustmentsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <StockAdjustmentList />
    </div>
  )
}