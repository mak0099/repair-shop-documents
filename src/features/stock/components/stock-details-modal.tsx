"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Stock } from "../stock.schema"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StockDetailsModalProps {
  stockItem: Stock | null
  isOpen: boolean
  onClose: () => void
}

export function StockDetailsModal({ stockItem, isOpen, onClose }: StockDetailsModalProps) {
  if (!stockItem) return null

  const isLowStock = stockItem.stockQuantity <= stockItem.lowStockThreshold;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl border-none p-0 bg-transparent shadow-none">
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
          <DialogHeader className="p-6 bg-slate-50 border-b">
            <DialogTitle className="text-xl font-bold text-slate-800">
              Inventory Intelligence: {stockItem.itemName}
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <Card className="shadow-none border-slate-100 bg-slate-50/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    Quick Specs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-slate-600">
                  <p><strong>SKU:</strong> <span className="font-mono">{stockItem.sku}</span></p>
                  <p><strong>Brand:</strong> {stockItem.brandName}</p>
                  {/* FIX: boxLocationName is now recognized by TypeScript */}
                  <p><strong>Location:</strong> {stockItem.boxLocationName || "Not Assigned"}</p>
                </CardContent>
              </Card>

              <Card className={cn(
                "shadow-none transition-colors",
                isLowStock ? "border-amber-200 bg-amber-50/50" : "border-slate-100"
              )}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    Current Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className={cn("text-4xl font-black", isLowStock ? "text-amber-600" : "text-slate-900")}>
                        {stockItem.stockQuantity}
                      </p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                        Units Available
                      </p>
                    </div>
                    {/* FIX: Removed 'success' variant, using custom emerald colors */}
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-[10px] font-bold px-2 py-0.5 border-none",
                        stockItem.isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                      )}
                    >
                      {stockItem.isActive ? "IN CATALOG" : "HIDDEN"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Recent Movement History</h4>
              </div>
              <div className="text-center py-12 border-2 border-dashed rounded-xl bg-slate-50/50 text-slate-400 text-xs">
                Ledger integration is being finalized...
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}