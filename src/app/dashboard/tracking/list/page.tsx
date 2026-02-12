"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TrackingListPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tracking Devices List</h1>
        <p className="text-muted-foreground">View all tracking devices</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Tracking Devices</CardTitle>
          <CardDescription>List of all tracking devices</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page is under development. Tracking device list will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}