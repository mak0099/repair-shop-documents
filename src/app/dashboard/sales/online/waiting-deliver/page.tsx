"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function WaitingToDeliverPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Waiting to Deliver</h1>
        <p className="text-muted-foreground">Orders ready for delivery</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Ready for Delivery</CardTitle>
          <CardDescription>Orders prepared and waiting for delivery</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page is under development. Delivery waiting orders will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}