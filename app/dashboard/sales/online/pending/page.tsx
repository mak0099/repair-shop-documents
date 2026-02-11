"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PendingOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Pending Orders</h1>
        <p className="text-muted-foreground">Orders waiting for processing</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Pending Orders</CardTitle>
          <CardDescription>Orders that require attention</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page is under development. Pending orders management will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}