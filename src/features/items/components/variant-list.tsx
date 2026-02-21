"use client"

import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ItemVariant } from "../item.schema"

interface VariantListProps {
  variants: ItemVariant[]
}

export function VariantList({ variants }: VariantListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SKU</TableHead>
            <TableHead>Attributes</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Stock</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variants.map((variant, index) => (
            <TableRow key={variant.id || index}>
              <TableCell className="font-mono text-xs">{variant.sku}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(variant.attributes).map(([key, val]) => (
                    <Badge key={key} variant="outline" className="text-[10px]">
                      {key}: {val}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right">¥{variant.sellingPrice.toLocaleString()}</TableCell>
              <TableCell className="text-right font-bold">{variant.stockQuantity}</TableCell>
              <TableCell>
                <Badge variant={variant.isActive ? "success" : "secondary"}>
                  {variant.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}