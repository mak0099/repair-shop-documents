"use client"

import React, { createContext, useContext, useState, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ShopProfile } from "./shop-profile.schema"
import { ShopProfileForm } from "./components/shop-profile-form"

/**
 * Defining the shape of the arguments for clarity and reuse.
 */
interface OpenModalArgs {
  initialData?: ShopProfile | null
}

interface ShopProfileModalContextType {
  openModal: (args?: OpenModalArgs) => void
  closeModal: () => void
}

const ShopProfileModalContext = createContext<ShopProfileModalContextType | undefined>(undefined)

export function ShopProfileProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialData, setInitialData] = useState<ShopProfile | null>(null)

  /**
   * FIX: Explicitly typing the parameter to match the Context Interface.
   * This tells TypeScript that initialData can be a ShopProfile object, not just null.
   */
  const openModal = useCallback((args?: OpenModalArgs) => {
    setInitialData(args?.initialData || null)
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setInitialData(null) // Resetting data on close is good practice
  }, [])

  return (
    <ShopProfileModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh] p-0 border-none bg-transparent shadow-none">
          <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
            <DialogHeader className="p-6 bg-slate-50 border-b">
              <DialogTitle className="text-xl font-bold text-slate-800">
                {initialData ? "Update Business Profile" : "Create Shop Profile"}
              </DialogTitle>
            </DialogHeader>
            
            <div className="p-6">
              <ShopProfileForm 
                initialData={initialData} 
                onSuccess={closeModal} 
                onCancel={closeModal}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </ShopProfileModalContext.Provider>
  )
}

export function useShopProfileModal() {
  const context = useContext(ShopProfileModalContext)
  if (!context) {
    throw new Error("useShopProfileModal must be used within a ShopProfileProvider")
  }
  return context
}