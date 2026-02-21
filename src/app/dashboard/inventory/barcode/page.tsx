import { BarcodeGenerator } from "@/features/barcode"

export default function BarcodePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <BarcodeGenerator />
    </div>
  )
}