"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CompletedOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Completed Orders</h1>
        <p className="text-muted-foreground">Successfully delivered orders</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Completed Orders</CardTitle>
          <CardDescription>Orders that have been delivered successfully</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page is under development. Completed orders list will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}