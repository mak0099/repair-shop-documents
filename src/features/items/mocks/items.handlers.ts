import { delay, http, HttpResponse } from "msw"

import { applySort } from "@/mocks/mock-utils"
import { Item, ItemFormValues } from "../item.schema"
import { mockItems } from "./items.mock"

let items = [...mockItems]

export const itemHandlers = [
  // GET all items with pagination and search
  http.get("*/items", async ({ request }) => {
    await delay(500)
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get("page") || "1", 10)
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10)
    const search = url.searchParams.get("search") || ""
    const sort = url.searchParams.get("_sort")
    const order = url.searchParams.get("_order")
    const status = url.searchParams.get("status")
    const type = url.searchParams.get("type")

    let filteredData = items

    if (search) {
      const lowercasedSearch = search.toLowerCase()
      filteredData = filteredData.filter(
        (item) =>
          item.name.toLowerCase().includes(lowercasedSearch) ||
          item.sku.toLowerCase().includes(lowercasedSearch),
      )
    }

    if (status && status !== "all") {
      const isActive = status === "active"
      filteredData = filteredData.filter((item) => item.isActive === isActive)
    }

    if (type && type !== "all") {
      filteredData = filteredData.filter((item) => item.type === type)
    }

    const sortedData = applySort(filteredData, sort, order)

    const total = sortedData.length
    const totalPages = Math.ceil(total / pageSize)
    const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize)

    return HttpResponse.json({
      data: paginatedData,
      meta: {
        total,
        page,
        pageSize,
        totalPages,
      },
    })
  }),

  // GET item options for dropdowns
  http.get("*/items/options", async () => {
    await delay(300)
    const itemOptions = items.map((i) => ({ id: i.id, name: i.name }))
    return HttpResponse.json(itemOptions)
  }),

  // GET a single item by ID
  http.get("*/items/:id", ({ params }) => {
    const { id } = params
    const item = items.find((i) => i.id === id)
    if (!item) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(item)
  }),

  // POST a new item
  http.post("*/items", async ({ request }) => {
    try {
      await delay(500)
      const data = (await request.json()) as ItemFormValues

      if (!data.name) {
        return HttpResponse.json({ message: "Item name is required" }, { status: 400 })
      }

      const newItem: Item = {
        id: `item-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...data,
      }
      items.unshift(newItem)
      return HttpResponse.json(newItem, { status: 201 })
    } catch (e) {
      const error = e as Error
      return HttpResponse.json({ message: "MSW Handler Error", error: error.message }, { status: 500 })
    }
  }),

  // PATCH an item
  http.patch("*/items/:id", async ({ params, request }) => {
    try {
      await delay(500)
      const { id } = params
      const data = (await request.json()) as Partial<ItemFormValues>
      const itemIndex = items.findIndex((i) => i.id === id)

      if (itemIndex === -1) {
        return HttpResponse.json({ message: "Item not found" }, { status: 404 })
      }

      const updatedItem = { ...items[itemIndex], ...data, updatedAt: new Date().toISOString() }
      items[itemIndex] = updatedItem

      return HttpResponse.json(updatedItem, { status: 200 })
    } catch (e) {
      const error = e as Error
      return HttpResponse.json({ message: "MSW Handler Error", error: error.message }, { status: 500 })
    }
  }),

  // DELETE an item
  http.delete("*/items/:id", ({ params }) => {
    const { id } = params
    items = items.filter((i) => i.id !== id)
    return new HttpResponse(null, { status: 204 })
  }),

  // PATCH (bulk update) items
  http.patch("*/items", async ({ request }) => {
    try {
      await delay(1000)
      const { ids, data } = (await request.json()) as { ids: string[]; data: Partial<Omit<Item, "id">> }

      items = items.map((item) => {
        if (ids.includes(item.id)) {
          return { ...item, ...data, updatedAt: new Date().toISOString() }
        }
        return item
      })

      return HttpResponse.json({ status: "ok" })
    } catch (e) {
      const error = e as Error
      return HttpResponse.json({ message: "MSW Handler Error", error: error.message }, { status: 500 })
    }
  }),

  // DELETE (bulk) items
  http.delete("*/items", async ({ request }) => {
    try {
      await delay(1000)
      const { ids } = (await request.json()) as { ids: string[] }
      items = items.filter((i) => !ids.includes(i.id))
      return HttpResponse.json({ status: "ok" })
    } catch (e) {
      const error = e as Error
      return HttpResponse.json({ message: "MSW Handler Error", error: error.message }, { status: 500 })
    }
  }),
]
