"use client"

import { delay, http, HttpResponse } from "msw"
import { applySort } from "@/mocks/mock-utils"
import { Category, CategoryFormValues } from "../category.schema"
import { mockCategories } from "./categories.mock"

// In-memory store
let categories = [...mockCategories]

export const categoryHandlers = [
  // GET all categories
  http.get("*/categories", async ({ request }) => {
    await delay(500)
    const url = new URL(request.url)
    const page = Number(url.searchParams.get("page") || "1")
    const pageSize = Number(url.searchParams.get("pageSize") || "10")
    const search = url.searchParams.get("search")?.toLowerCase() || ""
    const sort = url.searchParams.get("_sort")
    const order = url.searchParams.get("_order")
    
    // FIX: Using isActive instead of status for consistency
    const isActiveParam = url.searchParams.get("isActive")

    const filteredData = categories.filter((category) => {
      const searchMatch = category.name.toLowerCase().includes(search)
      
      // FIX: Boolean logic for isActive filter
      const isActiveMatch = 
        !isActiveParam || 
        isActiveParam === "all" || 
        category.isActive === (isActiveParam === "true")
        
      return searchMatch && isActiveMatch
    })

    const sortedData = applySort(filteredData, sort, order)
    
    // FIX: Changed 'parent_id' to 'parentId' to match the schema
    const dataWithParent = sortedData.map(category => {
        const parent = categories.find(c => c.id === category.parentId);
        return { 
          ...category, 
          parent: parent ? { id: parent.id, name: parent.name } : undefined 
        };
    });

    const total = dataWithParent.length
    const totalPages = Math.ceil(total / pageSize)
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const paginatedData = dataWithParent.slice(start, end)

    return HttpResponse.json({
      data: paginatedData,
      meta: { total, page, pageSize, totalPages },
    })
  }),

  // GET category options
  http.get("*/categories/options", async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const parentId = url.searchParams.get("parentId")

    let options = categories
    
    // FIX: Changed 'parent_id' to 'parentId'
    if (parentId) {
        options = categories.filter(c => c.parentId === parentId)
    } else {
        options = categories.filter(c => !c.parentId)
    }

    const categoryOptions = options.map((c) => ({ id: c.id, name: c.name }))
    return HttpResponse.json(categoryOptions)
  }),

  // GET single category
  http.get("*/categories/:id", ({ params }) => {
    const { id } = params
    const category = categories.find((c) => c.id === id)
    if (!category) return new HttpResponse(null, { status: 404 })

    // FIX: Changed 'parent_id' to 'parentId'
    const parent = categories.find(c => c.id === category.parentId);
    return HttpResponse.json({ 
      ...category, 
      parent: parent ? { id: parent.id, name: parent.name } : undefined 
    })
  }),

  // POST new category
  http.post("*/categories", async ({ request }) => {
    await delay(800)
    const data = (await request.json()) as CategoryFormValues

    const newCategory: Category = {
      ...data,
      id: `cat-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    categories.unshift(newCategory)
    return HttpResponse.json(newCategory, { status: 201 })
  }),

  // PATCH a category
  http.patch("*/categories/:id", async ({ params, request }) => {
    const { id } = params
    const updates = (await request.json()) as Partial<CategoryFormValues>

    let updatedCategory: Category | undefined
    categories = categories.map((category) => {
      if (category.id === id) {
        updatedCategory = { 
          ...category, 
          ...updates, 
          updatedAt: new Date().toISOString() 
        }
        return updatedCategory
      }
      return category
    })

    if (!updatedCategory) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(updatedCategory)
  }),

  // DELETE a category
  http.delete("*/categories/:id", ({ params }) => {
    const { id } = params
    categories = categories.filter((c) => c.id !== id)
    return new HttpResponse(null, { status: 204 })
  }),

  // Bulk status update (Ensuring consistency with 'isActive')
  http.patch("*/categories", async ({ request }) => {
    const { ids, data } = (await request.json()) as { ids: string[]; data: Partial<Category> }
    categories = categories.map((cat) => 
      ids.includes(cat.id) ? { ...cat, ...data, updatedAt: new Date().toISOString() } : cat
    )
    return HttpResponse.json({ status: "ok" })
  }),
]