"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AddEcommerceSalePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add E-Commerce Sale</h1>
        <p className="text-muted-foreground">Create a new e-commerce sale order</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>E-Commerce Sale Form</CardTitle>
          <CardDescription>Add new online sale transaction</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page is under development. E-commerce sale form will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}