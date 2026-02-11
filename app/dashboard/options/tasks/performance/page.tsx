"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function EmployeePerformancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Employee Performance</h1>
        <p className="text-muted-foreground">Track and analyze employee performance</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Employee performance analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page is under development. Employee performance tracking will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}