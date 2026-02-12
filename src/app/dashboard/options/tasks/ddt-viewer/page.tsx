"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DDTViewerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">DDT Viewer</h1>
        <p className="text-muted-foreground">View DDT (Delivery Document) records</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>DDT Records</CardTitle>
          <CardDescription>View delivery documents</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page is under development. DDT viewer will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}