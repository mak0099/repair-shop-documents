"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DDTGeneratorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">DDT Generator</h1>
        <p className="text-muted-foreground">Generate new DDT documents</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>DDT Generation</CardTitle>
          <CardDescription>Create delivery documents</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page is under development. DDT generator will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}