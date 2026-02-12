"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AddBranchPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add Branch</h1>
        <p className="text-muted-foreground">Create a new branch location</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Branch Information</CardTitle>
          <CardDescription>Enter details for the new branch</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page is under development. Branch creation form will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}