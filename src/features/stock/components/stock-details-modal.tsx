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

interface StockDetailsModalProps {
  stockItem: Stock | null
  isOpen: boolean
  onClose: () => void
}

export function StockDetailsModal({ stockItem, isOpen, onClose }: StockDetailsModalProps) {
  if (!stockItem) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Inventory Intelligence: {stockItem.itemName}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase text-muted-foreground">Quick Specs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p><strong>SKU:</strong> {stockItem.sku}</p>
              <p><strong>Brand:</strong> {stockItem.brandName}</p>
              <p><strong>Location:</strong> {stockItem.boxLocationName}</p>
            </CardContent>
          </Card>

          <Card className={stockItem.stockQuantity <= stockItem.lowStockThreshold ? "border-orange-200 bg-orange-50" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase text-muted-foreground">Current Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-3xl font-bold">{stockItem.stockQuantity}</p>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase">Total Units Available</p>
                </div>
                <Badge variant={stockItem.isActive ? "success" : "secondary"}>
                  {stockItem.isActive ? "In Catalog" : "Hidden"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-3">Recent Movement History</h4>
          <div className="text-center py-10 border rounded-md bg-muted/20 text-muted-foreground text-sm">
            Integration with Stock Ledger/Adjustment History coming soon.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}