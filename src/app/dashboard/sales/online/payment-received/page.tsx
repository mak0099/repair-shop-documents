"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentReceivedPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payment Received</h1>
        <p className="text-muted-foreground">Orders with completed payments</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Paid Orders</CardTitle>
          <CardDescription>Orders with successful payment</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page is under development. Payment received orders will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}