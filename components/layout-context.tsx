"use client"

import * as React from "react"

type LayoutContextType = {
  isTopNav: boolean
  toggleLayout: () => void
}

const LayoutContext = React.createContext<LayoutContextType | undefined>(undefined)

export function useLayout() {
  const context = React.useContext(LayoutContext)
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider")
  }
  return context
}

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isTopNav, setIsTopNav] = React.useState(false)

  React.useEffect(() => {
    const stored = localStorage.getItem("layout-mode")
    if (stored === "top") setIsTopNav(true)
  }, [])

  const toggleLayout = () => {
    setIsTopNav((prev) => {
      const next = !prev
      localStorage.setItem("layout-mode", next ? "top" : "side")
      return next
    })
  }

  return (
    <LayoutContext.Provider value={{ isTopNav, toggleLayout }}>
      {children}
    </LayoutContext.Provider>
  )
}