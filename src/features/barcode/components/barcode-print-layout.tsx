"use client"

import { Loader2 } from "lucide-react"

import { useItem } from "@/features/items/item.api"

import { BarcodeRequest } from "../barcode.schema"

interface BarcodePrintLayoutProps {
  data: BarcodeRequest
}

export function BarcodePrintLayout({ data }: BarcodePrintLayoutProps) {
  const {
    data: item,
    isLoading,
    isError,
  } = useItem(data.itemId, {
    enabled: !!data.itemId,
  })

  // Create an array based on requested quantity
  const labels = Array.from({ length: data.quantity })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading item details...
      </div>
    )
  }

  if (isError || !item) {
    return (
      <div className="text-center text-destructive py-20">
        Could not load item details. Please select another item.
      </div>
    )
  }

  const formattedPrice = new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(item.price)

  return (
    <div id="printable-barcode-area" className="bg-white p-4 shadow-sm border rounded">
      {/* Container for the labels */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-2">
        {labels.map((_, index) => (
          <div 
            key={index} 
            className="border border-gray-300 p-2 flex flex-col items-center justify-center text-center space-y-1 bg-white"
            style={{ 
              width: data.labelSize === "38x25mm" ? "150px" : "200px",
              height: "auto",
              pageBreakInside: "avoid"
            }}
          >
            {data.includeName && (
              <span className="text-[10px] font-bold truncate w-full">
                {item.name}
              </span>
            )}
            
            {/* Visual Barcode Placeholder */}
            <div className="w-full h-10 bg-black flex items-center justify-center">
                <div className="flex gap-[1px] h-8 bg-white w-[90%] items-center px-1">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="bg-black flex-1 h-full" style={{ width: `${Math.random() * 3 + 1}px` }} />
                    ))}
                </div>
            </div>
            
            <span className="text-[9px] font-mono">{item.sku}</span>
            
            {data.includePrice && (
              <span className="text-[11px] font-black">{formattedPrice}</span>
            )}
          </div>
        ))}
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-barcode-area, #printable-barcode-area * {
            visibility: visible;
          }
          #printable-barcode-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none;
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  )
}