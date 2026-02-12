"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Transactions</h1>
        <p className="text-muted-foreground">View all financial transactions</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Complete list of all transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page is under development. Transactions view will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}