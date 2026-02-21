"use client"

import { useState } from "react"
import { Plus, Trash2, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAttributes } from "@/features/attributes/attribute.api"
import { createVariantsFromAttributes } from "../item.utils"
import { ItemVariant } from "../item.schema"

interface VariantGeneratorProps {
  onGenerate: (variants: Partial<ItemVariant>[]) => void
  productName: string
}

export function VariantGenerator({ onGenerate, productName }: VariantGeneratorProps) {
  const { data: attributes } = useAttributes()
  const [selections, setSelections] = useState<Record<string, string[]>>({})

  const toggleValue = (attrName: string, value: string) => {
    setSelections((prev) => {
      const currentValues = prev[attrName] || []
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value]
      
      const newSelections = { ...prev, [attrName]: newValues }
      if (newValues.length === 0) delete newSelections[attrName]
      return newSelections
    })
  }

  const handleGenerate = () => {
    if (Object.keys(selections).length === 0) return
    const newVariants = createVariantsFromAttributes(productName, selections)
    onGenerate(newVariants)
  }

  return (
    <Card className="bg-muted/30 border-dashed">
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Select Attributes to Generate Variants</h4>
          <Button 
            type="button" 
            size="sm" 
            onClick={handleGenerate}
            disabled={Object.keys(selections).length === 0}
          >
            <Wand2 className="mr-2 h-4 w-4" /> Generate Combinations
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {attributes?.map((attr) => (
            <div key={attr.id} className="space-y-2">
              <span className="text-xs font-bold uppercase text-muted-foreground">{attr.name}</span>
              <div className="flex flex-wrap gap-2">
                {attr.values.map((v) => {
                  const isSelected = selections[attr.name]?.includes(v.value)
                  return (
                    <Button
                      key={v.value}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => toggleValue(attr.name, v.value)}
                    >
                      {v.value}
                    </Button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}