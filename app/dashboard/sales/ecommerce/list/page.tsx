"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function EcommerceSaleListPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">E-Commerce Sales List</h1>
        <p className="text-muted-foreground">View and manage e-commerce sales</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Sales Records</CardTitle>
          <CardDescription>List of all e-commerce transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page is under development. E-commerce sales list will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}