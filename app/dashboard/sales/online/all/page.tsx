"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AllOnlineOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">All Online Orders</h1>
        <p className="text-muted-foreground">View all online sales orders</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Online Orders</CardTitle>
          <CardDescription>Complete list of all online orders</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page is under development. All online orders list will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}