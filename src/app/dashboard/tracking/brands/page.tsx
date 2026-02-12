"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TrackingBrandsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tracking Device Brands</h1>
        <p className="text-muted-foreground">Manage tracking device brands</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Device Brands</CardTitle>
          <CardDescription>Supported tracking device brands</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page is under development. Brand management will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}