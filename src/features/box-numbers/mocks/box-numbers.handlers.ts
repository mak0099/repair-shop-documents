import { http, HttpResponse } from "msw"
import { applySort } from "@/mocks/mock-utils"
import { BoxNumber } from "../box-number.schema"
import { mockBoxNumbers } from "./box-numbers.mock"

// In-memory store for box numbers
let boxNumbers: BoxNumber[] = [...mockBoxNumbers]

export const boxNumberHandlers = [
  // GET all box numbers with standardized isActive filtering
  http.get("*/box-numbers", ({ request }) => {
    const url = new URL(request.url)
    const search = url.searchParams.get("search") || ""
    // FIX: Changed from 'status' to 'isActive' query param
    const isActiveParam = url.searchParams.get("isActive") 
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

    // FIX: Filtering logic for boolean isActive
    if (isActiveParam && isActiveParam !== "all") {
      const targetIsActive = isActiveParam === "true"
      filteredBoxNumbers = filteredBoxNumbers.filter(
        (boxNumber) => boxNumber.isActive === targetIsActive
      )
    }

    const sortedData = applySort(filteredBoxNumbers, sort, order)

    // Paginate results
    const total = sortedData.length
    const totalPages = Math.ceil(total / pageSize)
    const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize)

    return HttpResponse.json({ 
      data: paginatedData, 
      meta: { total, page, pageSize, totalPages } 
    })
  }),

  // GET box number options (remain same, ensuring id/name)
  http.get("*/box-numbers/options", () => {
    const boxNumberOptions = boxNumbers.map((b) => ({ id: b.id, name: b.name }))
    return HttpResponse.json(boxNumberOptions)
  }),

  // POST: Create BoxNumber with boolean logic
  http.post("*/box-numbers", async ({ request }) => {
    try {
      const contentType = request.headers.get("content-type") || ""
      let payload: Partial<BoxNumber>

      if (contentType.includes("multipart/form-data")) {
        const formData = await request.formData()
        payload = {
          name: formData.get("name") as string,
          location: formData.get("location") as string,
          description: formData.get("description") as string,
          isActive: formData.get("isActive") === "true", // Handle string boolean from form
        }
      } else {
        payload = (await request.json()) as BoxNumber
      }

      if (!payload.name) {
        return HttpResponse.json({ message: "Box name/number is required" }, { status: 400 })
      }

      const newBoxNumber: BoxNumber = {
        id: `box_${Date.now()}`,
        name: payload.name,
        location: payload.location || "N/A",
        description: payload.description || "",
        // FIX: Removed 'status', strictly using 'isActive'
        isActive: payload.isActive ?? true, 
      }

      boxNumbers.push(newBoxNumber)
      return HttpResponse.json(newBoxNumber, { status: 201 })
    } catch (e) {
      const error = e as Error
      return HttpResponse.json({ message: "Server Error", error: error.message }, { status: 500 })
    }
  }),

  // PATCH: Standardized partial updates for isActive
  http.patch("*/box-numbers/:id", async ({ request, params }) => {
    try {
      const { id } = params
      const index = boxNumbers.findIndex((b) => b.id === id)

      if (index === -1) {
        return HttpResponse.json({ message: "Box Number not found" }, { status: 404 })
      }

      const existing = boxNumbers[index]
      let updates: Partial<BoxNumber> = {}

      const contentType = request.headers.get("content-type") || ""

      if (contentType.includes("multipart/form-data")) {
        const formData = await request.formData()
        const name = formData.get("name")
        const isActive = formData.get("isActive")
        
        if (typeof name === "string") updates.name = name
        if (isActive !== null) updates.isActive = isActive === "true"
        // ... location/description updates
      } else {
        updates = (await request.json()) as Partial<BoxNumber>
      }

      // Merge and update
      const updatedBoxNumber = { ...existing, ...updates }
      boxNumbers[index] = updatedBoxNumber

      return HttpResponse.json(updatedBoxNumber, { status: 200 })
    } catch (e) {
      const error = e as Error
      return HttpResponse.json({ message: "Server Error", error: error.message }, { status: 500 })
    }
  }),

  // DELETE a box number (remain same)
  http.delete("*/box-numbers/:id", ({ params }) => {
    const { id } = params
    boxNumbers = boxNumbers.filter((b) => b.id !== id)
    return new HttpResponse(null, { status: 204 })
  }),
]