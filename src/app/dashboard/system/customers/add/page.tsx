"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AddCustomerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add Customer</h1>
        <p className="text-muted-foreground">Register a new customer</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
          <CardDescription>Enter customer details</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page is under development. Customer registration form will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}