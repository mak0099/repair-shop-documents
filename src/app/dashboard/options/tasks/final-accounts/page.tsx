"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FinalAccountsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Final Accounts</h1>
        <p className="text-muted-foreground">Financial statements and final accounts</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Financial Statements</CardTitle>
          <CardDescription>Complete financial reporting</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page is under development. Final accounts will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}