"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AttendancesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Attendances</h1>
        <p className="text-muted-foreground">Employee attendance records</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Attendance Management</CardTitle>
          <CardDescription>Track employee attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page is under development. Attendance tracking will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}