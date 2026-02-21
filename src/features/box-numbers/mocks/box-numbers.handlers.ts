import { http, HttpResponse } from "msw"
import { applySort } from "@/mocks/mock-utils"
import { BoxNumber } from "../box-number.schema"
import { mockBoxNumbers } from "./box-numbers.mock"

// In-memory store for box numbers
let boxNumbers: BoxNumber[] = [...mockBoxNumbers]

export const boxNumberHandlers = [
  // Get all box numbers
  http.get("*/box-numbers", ({ request }) => {
    const url = new URL(request.url)
    const search = url.searchParams.get("search") || ""
    const status = url.searchParams.get("status") // 'active', 'inactive', 'all'
    const page = parseInt(url.searchParams.get("page") || "1", 10)
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10)
    const sort = url.searchParams.get("_sort")
    const order = url.searchParams.get("_order")
    
    let filteredBoxNumbers = boxNumbers

    // Filter by search query
    if (search) {
      const lowercasedSearch = search.toLowerCase()
      filteredBoxNumbers = filteredBoxNumbers.filter(
        (boxNumber) =>
          boxNumber.name.toLowerCase().includes(lowercasedSearch) ||
          boxNumber.location.toLowerCase().includes(lowercasedSearch) ||
          boxNumber.description?.toLowerCase().includes(lowercasedSearch)
      )
    }

    // Filter by status (isActive)
    if (status && status !== "all") {
      const targetStatus = status.toUpperCase() // "ACTIVE" or "INACTIVE"
      filteredBoxNumbers = filteredBoxNumbers.filter((boxNumber) => boxNumber.status === targetStatus)
    }

    const sortedData = applySort(filteredBoxNumbers, sort, order)

    // Paginate results
    const total = sortedData.length
    const totalPages = Math.ceil(total / pageSize)
    const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize)

    return HttpResponse.json({ data: paginatedData, meta: { total, page, pageSize, totalPages } })
  }),

  // Create BoxNumber
  http.post("*/box-numbers", async ({ request }) => {
    try {
      const contentType = request.headers.get("content-type") || ""
      let data: BoxNumber

      if (contentType.includes("multipart/form-data")) {
        const formData = await request.formData()
        data = {
          name: formData.get("name") as string,
          logo: formData.get("logo") as File | null,
          isActive: formData.get("isActive") === "true",
          location: formData.get("location") as string,
          description: formData.get("description") as string,
          status: formData.get("status") as "ACTIVE" | "INACTIVE",
        }
      } else {
        data = (await request.json()) as BoxNumber
      }

      if (!data.name) {
        return HttpResponse.json({ message: "Box name/number is required" }, { status: 400 })
      }

      const newBoxNumber: BoxNumber = {
        id: `box_${Date.now()}`,
        name: data.name,
        location: data.location,
        description: data.description,
        status: data.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      boxNumbers.push(newBoxNumber)
      return HttpResponse.json(newBoxNumber, { status: 201 })
    } catch (e) {
      const error = e as Error
      console.error("Error in MSW handler for POST /box-numbers:", error.message)
      return HttpResponse.json({ message: "MSW Handler Error", error: error.message }, { status: 500 })
    }
  }),

  // Update BoxNumber
  http.patch("*/box-numbers/:id", async ({ request, params }) => {
    try {
      const { id } = params
      const boxNumberIndex = boxNumbers.findIndex((b) => b.id === id)

      if (boxNumberIndex === -1) {
        return HttpResponse.json({ message: "Box Number not found" }, { status: 404 })
      }

      const existingBoxNumber = boxNumbers[boxNumberIndex]
      const updatedBoxNumber: BoxNumber = { ...existingBoxNumber, updatedAt: new Date().toISOString() }

      const contentType = request.headers.get("content-type") || ""

      if (contentType.includes("multipart/form-data")) {
        const formData = await request.formData()
        const name = formData.get("name")
        if (typeof name === "string") updatedBoxNumber.name = name
        const location = formData.get("location")
        if (typeof location === "string") updatedBoxNumber.location = location
        const description = formData.get("description")
        if (typeof description === "string") updatedBoxNumber.description = description
        const status = formData.get("status")
        if (typeof status === "string" && (status === "ACTIVE" || status === "INACTIVE")) updatedBoxNumber.status = status
      } else {
        const jsonData = (await request.json()) as Partial<BoxNumber>
        Object.assign(updatedBoxNumber, jsonData)
      }

      boxNumbers[boxNumberIndex] = updatedBoxNumber

      return HttpResponse.json(updatedBoxNumber, { status: 200 })
    } catch (e) {
      const error = e as Error
      console.error(`Error in MSW handler for PATCH /box-numbers/:id:`, error.message)
      return HttpResponse.json({ message: "MSW Handler Error", error: error.message }, { status: 500 })
    }
  }),

  // DELETE a box number
  http.delete("*/box-numbers/:id", ({ params }) => {
    const { id } = params
    boxNumbers = boxNumbers.filter((b) => b.id !== id)
    return new HttpResponse(null, { status: 204 })
  }),

  // GET box number options for dropdowns
  http.get("*/box-numbers/options", () => {
    const boxNumberOptions = boxNumbers.map((b) => ({ id: b.id, name: b.name }))
    return HttpResponse.json(boxNumberOptions)
  }),
]