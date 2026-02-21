"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Item } from "../item.schema"
import { VariantList } from "./variant-list"

interface ItemDetailsProps {
  item: Item
}

export function ItemDetails({ item }: ItemDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{item.name}</h2>
          <p className="text-muted-foreground">{item.description || "No description provided."}</p>
        </div>
        <Badge variant={item.isActive ? "success" : "destructive"}>
          {item.isActive ? "Active" : "Inactive"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Category</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{item.categoryId}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Variants</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{item.variants.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unit</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{item.unit}</p>
          </CardContent>
        </Card>
      </div>

      {item.specification && (
        <Card>
          <CardHeader>
            <CardTitle className="text-md">Technical Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{item.specification}</p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Inventory Breakdown</h3>
        <VariantList variants={item.variants} />
      </div>
    </div>
  )
}