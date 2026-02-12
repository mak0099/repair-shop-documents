import { AcceptanceList } from "@/features/acceptances/components/AcceptanceList"

export default function AcceptanceListPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Acceptance List</h1>
        <p className="text-muted-foreground">TanStack Table with sorting, filtering, status badges, and actions</p>
      </div>
      <AcceptanceList />
    </div>
  )
}