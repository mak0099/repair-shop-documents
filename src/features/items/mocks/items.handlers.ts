import { delay, http, HttpResponse } from "msw"
import { applySort } from "@/mocks/mock-utils"
import { Item } from "../item.schema"
import { mockItems } from "./items.mock"

const items = [...mockItems]

export const itemHandlers = [
  http.get("*/items", async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const search = url.searchParams.get("search")?.toLowerCase() || ""
    const isActiveParam = url.searchParams.get("isActive")
    
    let filtered = items.filter(item => 
      item.name.toLowerCase().includes(search) || (item.sku?.toLowerCase().includes(search))
    )

    if (isActiveParam && isActiveParam !== "all") {
      filtered = filtered.filter(item => item.isActive === (isActiveParam === "true"))
    }

    const total = filtered.length
    return HttpResponse.json({ data: filtered, meta: { total, page: 1, pageSize: 10, totalPages: 1 } })
  }),

  http.post("*/items", async ({ request }) => {
    const data = (await request.json()) as Item
    const newItem = { ...data, id: `item_${Date.now()}`, createdAt: new Date().toISOString() }
    items.unshift(newItem)
    return HttpResponse.json(newItem, { status: 201 })
  }),
]