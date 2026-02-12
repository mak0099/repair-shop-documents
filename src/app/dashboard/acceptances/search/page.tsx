"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Search, RotateCcw } from "lucide-react"

export default function AcceptanceSearchPage() {
  const [filters, setFilters] = useState({
    customerName: "",
    acceptanceNumber: "",
    acceptanceYear: "",
    mobile: "",
    brand: "",
    model: "",
    imei: "",
    createdDateFrom: "",
    createdDateTo: "",
    currentStatus: "",
    technician: "",
    createdBy: "",
    dealer: "",
    branch: "",
    deliveryDate: "",
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [resultsPerPage] = useState(10)

  const handleSearch = () => {
    console.log("Searching with filters:", filters)
    setCurrentPage(1) // Reset to first page on new search
  }

  const handleReset = () => {
    setFilters({
      customerName: "",
      acceptanceNumber: "",
      acceptanceYear: "",
      mobile: "",
      brand: "",
      model: "",
      imei: "",
      createdDateFrom: "",
      createdDateTo: "",
      currentStatus: "",
      technician: "",
      createdBy: "",
      dealer: "",
      branch: "",
      deliveryDate: "",
    })
    setCurrentPage(1)
  }

  // Mock data for demonstration - expanded to show pagination
  const mockResults = Array.from({ length: 25 }, (_, i) => ({
    number: `${String(41604 + i).padStart(5, '0')}-2025`,
    customer: ["John Doe", "Jane Smith", "Bob Johnson", "Alice Brown", "Charlie Wilson"][i % 5],
    createdDate: `2025-01-${String(15 + (i % 15)).padStart(2, '0')}`,
    deviceType: ["Smartphone", "Tablet", "Laptop", "Desktop", "Other"][i % 5],
    brand: ["Apple", "Samsung", "Google", "Huawei", "OnePlus"][i % 5],
    model: ["iPhone 12", "Galaxy S21", "Pixel 5", "P30 Pro", "8T"][i % 5],
    statusType: "Repair",
    currentStatus: ["IN REPAIR", "WAITING PARTS", "READY", "DELIVERED", "CANCELLED"][i % 5],
    technician: ["John Tech", "Jane Tech", "Bob Tech", "Alice Tech", "Charlie Tech"][i % 5],
    createdBy: ["Admin", "Manager", "Front Desk", "Supervisor"][i % 4],
    deliveryDate: i % 3 === 0 ? `2025-01-${String(20 + (i % 10)).padStart(2, '0')}` : "",
    estimatedPrice: 100 + (i * 10),
    dealer: ["Dealer A", "Dealer B", "Dealer C", ""][i % 4],
    branch: ["Main Branch", "Downtown", "Mall", "Airport"][i % 4],
    acceptanceYear: "2025",
  }))

  // Filter results based on current filters
  const filteredResults = mockResults.filter(result => {
    return (
      (!filters.customerName || result.customer.toLowerCase().includes(filters.customerName.toLowerCase())) &&
      (!filters.acceptanceNumber || result.number.includes(filters.acceptanceNumber)) &&
      (!filters.acceptanceYear || result.acceptanceYear === filters.acceptanceYear) &&
      (!filters.mobile || true) && // Would filter by mobile if we had mobile data
      (!filters.brand || result.brand.toLowerCase() === filters.brand.toLowerCase()) &&
      (!filters.model || result.model.toLowerCase().includes(filters.model.toLowerCase())) &&
      (!filters.imei || true) && // Would filter by IMEI if we had IMEI data
      (!filters.createdDateFrom || result.createdDate >= filters.createdDateFrom) &&
      (!filters.createdDateTo || result.createdDate <= filters.createdDateTo) &&
      (!filters.currentStatus || result.currentStatus === filters.currentStatus) &&
      (!filters.technician || result.technician.toLowerCase().includes(filters.technician.toLowerCase())) &&
      (!filters.createdBy || result.createdBy.toLowerCase().includes(filters.createdBy.toLowerCase())) &&
      (!filters.dealer || result.dealer.toLowerCase().includes(filters.dealer.toLowerCase())) &&
      (!filters.branch || result.branch.toLowerCase().includes(filters.branch.toLowerCase())) &&
      (!filters.deliveryDate || result.deliveryDate === filters.deliveryDate)
    )
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredResults.length / resultsPerPage)
  const startIndex = (currentPage - 1) * resultsPerPage
  const endIndex = startIndex + resultsPerPage
  const currentResults = filteredResults.slice(startIndex, endIndex)

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "default"
      case "READY":
        return "secondary"
      case "IN REPAIR":
        return "outline"
      case "WAITING PARTS":
        return "destructive"
      case "CANCELLED":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Acceptance Search</h1>
        <p className="text-muted-foreground">Advanced search with 13 filters for repair jobs</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Filters</CardTitle>
          <CardDescription>Enter criteria to search for acceptances</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                placeholder="Search customer"
                value={filters.customerName}
                onChange={(e) => setFilters({ ...filters, customerName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="acceptanceNumber">Acceptance Number</Label>
              <Input
                id="acceptanceNumber"
                placeholder="e.g., 41604-2025"
                value={filters.acceptanceNumber}
                onChange={(e) => setFilters({ ...filters, acceptanceNumber: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="acceptanceYear">Acceptance Year</Label>
              <Select value={filters.acceptanceYear} onValueChange={(value) => setFilters({ ...filters, acceptanceYear: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="mobile">Mobile</Label>
              <Input
                id="mobile"
                placeholder="Customer mobile"
                value={filters.mobile}
                onChange={(e) => setFilters({ ...filters, mobile: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Select value={filters.brand} onValueChange={(value) => setFilters({ ...filters, brand: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Apple">Apple</SelectItem>
                  <SelectItem value="Samsung">Samsung</SelectItem>
                  <SelectItem value="Google">Google</SelectItem>
                  <SelectItem value="Huawei">Huawei</SelectItem>
                  <SelectItem value="OnePlus">OnePlus</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                placeholder="Search model"
                value={filters.model}
                onChange={(e) => setFilters({ ...filters, model: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="imei">IMEI/Serial No</Label>
              <Input
                id="imei"
                placeholder="Enter IMEI"
                value={filters.imei}
                onChange={(e) => setFilters({ ...filters, imei: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="createdDateFrom">Created Date From</Label>
              <Input
                id="createdDateFrom"
                type="date"
                value={filters.createdDateFrom}
                onChange={(e) => setFilters({ ...filters, createdDateFrom: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="createdDateTo">Created Date To</Label>
              <Input
                id="createdDateTo"
                type="date"
                value={filters.createdDateTo}
                onChange={(e) => setFilters({ ...filters, createdDateTo: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="currentStatus">Current Status</Label>
              <Select value={filters.currentStatus} onValueChange={(value) => setFilters({ ...filters, currentStatus: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IN REPAIR">In Repair</SelectItem>
                  <SelectItem value="WAITING PARTS">Waiting Parts</SelectItem>
                  <SelectItem value="READY">Ready</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="technician">Technician</Label>
              <Input
                id="technician"
                placeholder="Search technician"
                value={filters.technician}
                onChange={(e) => setFilters({ ...filters, technician: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="createdBy">Created By</Label>
              <Input
                id="createdBy"
                placeholder="Search creator"
                value={filters.createdBy}
                onChange={(e) => setFilters({ ...filters, createdBy: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="dealer">Dealer</Label>
              <Input
                id="dealer"
                placeholder="Search dealer"
                value={filters.dealer}
                onChange={(e) => setFilters({ ...filters, dealer: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="branch">Branch</Label>
              <Select value={filters.branch} onValueChange={(value) => setFilters({ ...filters, branch: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Main Branch">Main Branch</SelectItem>
                  <SelectItem value="Downtown">Downtown</SelectItem>
                  <SelectItem value="Mall">Mall</SelectItem>
                  <SelectItem value="Airport">Airport</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="deliveryDate">Delivery Date</Label>
              <Input
                id="deliveryDate"
                type="date"
                value={filters.deliveryDate}
                onChange={(e) => setFilters({ ...filters, deliveryDate: e.target.value })}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Button onClick={handleSearch} className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search
            </Button>
            <Button variant="outline" onClick={handleReset} className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
          <CardDescription>
            Found {filteredResults.length} acceptances
            {filteredResults.length > 0 && (
              <span className="ml-2">
                (showing {startIndex + 1}-{Math.min(endIndex, filteredResults.length)} of {filteredResults.length})
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentResults.length > 0 ? (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Number</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead>Device Type</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead>Status Type</TableHead>
                      <TableHead>Current Status</TableHead>
                      <TableHead>Technician</TableHead>
                      <TableHead>Created By</TableHead>
                      <TableHead>Delivery Date</TableHead>
                      <TableHead>Estimated Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentResults.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{result.number}</TableCell>
                        <TableCell>{result.customer}</TableCell>
                        <TableCell>{result.createdDate}</TableCell>
                        <TableCell>{result.deviceType}</TableCell>
                        <TableCell>{result.brand}</TableCell>
                        <TableCell>{result.model}</TableCell>
                        <TableCell>{result.statusType}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(result.currentStatus)}>
                            {result.currentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{result.technician}</TableCell>
                        <TableCell>{result.createdBy}</TableCell>
                        <TableCell>{result.deliveryDate || "-"}</TableCell>
                        <TableCell>${result.estimatedPrice}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNumber = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                        if (pageNumber > totalPages) return null
                        return (
                          <Button
                            key={pageNumber}
                            variant={currentPage === pageNumber ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(pageNumber)}
                          >
                            {pageNumber}
                          </Button>
                        )
                      })}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No acceptances found matching your search criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}