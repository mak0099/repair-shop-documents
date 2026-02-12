"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ManageProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <p className="text-muted-foreground">Manage e-commerce products</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Product Catalog</CardTitle>
          <CardDescription>Manage online store products</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page is under development. Product management will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}