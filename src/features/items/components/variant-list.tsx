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
import { Item } from "../item.schema"

interface VariantListProps {
  /**
   * We now use Partial<Item> because generated items might not 
   * have all properties (like IDs) before being saved to the database.
   */
  variants: Partial<Item>[]
}

export function VariantList({ variants }: VariantListProps) {
  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            <TableHead className="w-[120px] font-bold text-slate-600">SKU</TableHead>
            <TableHead className="font-bold text-slate-600">Specifications</TableHead>
            <TableHead className="text-right font-bold text-slate-600">Sale Price</TableHead>
            <TableHead className="text-right font-bold text-slate-600">Initial Stock</TableHead>
            <TableHead className="text-center font-bold text-slate-600">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variants.map((item, index) => (
            <TableRow key={item.id || index} className="hover:bg-slate-50/50 transition-colors">
              <TableCell className="font-mono text-[11px] text-slate-500 uppercase">
                {item.sku || "AUTO-GEN"}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1.5">
                  {item.ram && (
                    <Badge variant="outline" className="text-[10px] font-medium bg-blue-50/50 text-blue-700 border-blue-100">
                      RAM: {item.ram}
                    </Badge>
                  )}
                  {item.rom && (
                    <Badge variant="outline" className="text-[10px] font-medium bg-indigo-50/50 text-indigo-700 border-indigo-100">
                      ROM: {item.rom}
                    </Badge>
                  )}
                  {item.color && (
                    <Badge variant="outline" className="text-[10px] font-medium bg-slate-50 text-slate-600 border-slate-200">
                      Color: {item.color}
                    </Badge>
                  )}
                  {!item.ram && !item.rom && !item.color && (
                    <span className="text-xs text-slate-400 italic">No specific attributes</span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right font-semibold text-slate-900">
                ৳{(item.salePrice || 0).toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                <span className="px-2 py-1 rounded-md bg-slate-100 font-bold text-slate-700 text-xs">
                  {item.initialStock || 0}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <Badge 
                  variant={item.isActive ? "default" : "secondary"}
                  className={`text-[10px] uppercase font-bold ${item.isActive ? "bg-emerald-500 hover:bg-emerald-600" : ""}`}
                >
                  {item.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}

          {variants.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-slate-400 text-sm italic">
                No variants generated yet. Use the generator above to start.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}