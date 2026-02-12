import { LayoutProvider } from "@/components/layout/layout-context"
import { DashboardLayoutContent } from "@/components/layout/dashboard-layout"
import QueryProvider from "@/components/providers/query-provider"
import { MSWProvider } from "@/components/providers/msw-provider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MSWProvider>
      <QueryProvider>
        <LayoutProvider>
          <DashboardLayoutContent>{children}</DashboardLayoutContent>
        </LayoutProvider>
      </QueryProvider>
    </MSWProvider>
  )
}