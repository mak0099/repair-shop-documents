import { LayoutProvider } from "@/components/layout-context"
import { DashboardLayoutContent } from "@/components/dashboard-layout"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </LayoutProvider>
  )
}