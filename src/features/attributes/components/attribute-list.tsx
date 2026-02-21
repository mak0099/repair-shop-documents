"use client"

import { Layers, Loader2, Settings2, Edit3 } from "lucide-react"

import { useAttributes } from "../attribute.api"
import { useAttributeModal } from "../attribute-modal-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export function AttributeList() {
  // isFetching helps show subtle updates after modal close
  const { data: attributes, isLoading, isFetching } = useAttributes()
  const { openModal } = useAttributeModal()

  // This is a fixed list of attributes whose values are managed via this UI.
  const systemAttributes = ["RAM", "ROM", "Color"]

  return (
    <div className="p-4 lg:p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-1 border-l-4 border-slate-900 pl-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Layers className="h-6 w-6" /> Product Specifications
        </h2>
        <p className="text-muted-foreground text-sm">
          Define allowed values for RAM, ROM, and Colors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {systemAttributes.map((attrName) => {
          // Find logic: making it case-insensitive for safety
          const attrData = attributes?.find(
            (a) => a.name.toLowerCase() === attrName.toLowerCase()
          )

          return (
            <Card key={attrName} className="group border shadow-sm relative overflow-hidden transition-all duration-300">
              {/* Individual Card Loading Overlay when refetching */}
              {isFetching && !isLoading && (
                <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center backdrop-blur-[1px]">
                  <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
                </div>
              )}

              <CardHeader className="py-3 px-4 border-b bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-700">
                    <Settings2 className="h-3.5 w-3.5" /> {attrName}
                  </CardTitle>
                  {!isLoading ? (
                    <Badge variant="secondary" className="text-[10px]">
                      {attrData?.values.length || 0} Items
                    </Badge>
                  ) : (
                    <Skeleton className="h-4 w-8" />
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-4 space-y-5">
                <div className="flex flex-wrap gap-1.5 min-h-[80px] content-start overflow-y-auto max-h-[120px] pr-1 custom-scrollbar">
                  {isLoading ? (
                    // Individual Skeleton Loader inside the card
                    Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-5 w-12 rounded-full" />
                    ))
                  ) : attrData?.values && attrData.values.length > 0 ? (
                    attrData.values.map((v, i) => (
                      <Badge key={i} variant="outline" className="font-normal">
                        {v.value}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">No values defined.</span>
                  )}
                </div>
                
                <Button 
                  variant="outline"
                  disabled={isLoading || !attrData}
                  className="w-full h-9 group-hover:bg-slate-900 group-hover:text-white transition-colors border-slate-300 text-xs" 
                  onClick={() => {
                    if (attrData) {
                      openModal({ initialData: attrData })
                    }
                  }}
                >
                  <Edit3 className="mr-2 h-3.5 w-3.5" /> Manage {attrName}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}