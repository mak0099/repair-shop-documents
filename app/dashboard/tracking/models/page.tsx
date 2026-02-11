"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TrackingModelsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tracking Device Models</h1>
        <p className="text-muted-foreground">Manage tracking device models</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Device Models</CardTitle>
          <CardDescription>Supported tracking device models</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page is under development. Model management will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}