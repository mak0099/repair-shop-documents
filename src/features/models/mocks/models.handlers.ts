import { delay, http, HttpResponse } from "msw"

import { applySort } from "@/mocks/mock-utils"
import { Model, ModelFormValues } from "../model.schema"
import { mockModels } from "./models.mock"
import { mockBrands } from "@/features/brands/mocks/brands.mock"

let models = [...mockModels]

export const modelHandlers = [
  // GET all models with pagination and search
  http.get("*/models", async ({ request }) => {
    await delay(500)
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get("page") || "1", 10)
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10)
    const search = url.searchParams.get("search") || ""
    const sort = url.searchParams.get("_sort")
    const order = url.searchParams.get("_order")
    const status = url.searchParams.get("status")

    let filteredData = models

    if (search) {
      const lowercasedSearch = search.toLowerCase()
      filteredData = filteredData.filter((model) => model.name.toLowerCase().includes(lowercasedSearch))
    }

    if (status && status !== "all") {
      const isActive = status === "active"
      filteredData = filteredData.filter((model) => model.isActive === isActive)
    }

    const sortedData = applySort(filteredData, sort, order)
    
    // Attach brand object
    const dataWithBrand = sortedData.map(model => {
        const brand = mockBrands.find(b => b.id === model.brand_id);
        return { ...model, brand: brand ? {id: brand.id, name: brand.name} : undefined };
    });

    const total = dataWithBrand.length
    const totalPages = Math.ceil(total / pageSize)
    const paginatedData = dataWithBrand.slice((page - 1) * pageSize, page * pageSize)

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

  // GET model options for dropdowns
  http.get("*/models/options", async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const brandId = url.searchParams.get("brand_id")

    let filteredModels = models
    if (brandId) {
      filteredModels = models.filter((m) => m.brand_id === brandId)
    }
    const modelOptions = filteredModels.map((m) => ({ id: m.id, name: m.name }))
    return HttpResponse.json(modelOptions)
  }),

  // GET a single model by ID
  http.get("*/models/:id", ({ params }) => {
    const { id } = params
    const model = models.find((m) => m.id === id)
    if (!model) {
      return new HttpResponse(null, { status: 404 })
    }
    const brand = mockBrands.find(b => b.id === model.brand_id);
    return HttpResponse.json({ ...model, brand: brand ? {id: brand.id, name: brand.name} : undefined })
  }),

  // POST a new model
  http.post("*/models", async ({ request }) => {
    try {
      await delay(500)
      const data = (await request.json()) as ModelFormValues

      if (!data.name) {
        return HttpResponse.json({ message: "Model name is required" }, { status: 400 })
      }

      const newModel: Model = {
        id: `model-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...data,
      }
      models.unshift(newModel)
      return HttpResponse.json(newModel, { status: 201 })
    } catch (e) {
      const error = e as Error
      return HttpResponse.json({ message: "MSW Handler Error", error: error.message }, { status: 500 })
    }
  }),

  // PATCH a model
  http.patch("*/models/:id", async ({ params, request }) => {
    try {
      await delay(500)
      const { id } = params
      const data = (await request.json()) as Partial<ModelFormValues>
      const modelIndex = models.findIndex((m) => m.id === id)

      if (modelIndex === -1) {
        return HttpResponse.json({ message: "Model not found" }, { status: 404 })
      }

      const updatedModel = { ...models[modelIndex], ...data, updatedAt: new Date().toISOString() }
      models[modelIndex] = updatedModel

      return HttpResponse.json(updatedModel, { status: 200 })
    } catch (e) {
      const error = e as Error
      return HttpResponse.json({ message: "MSW Handler Error", error: error.message }, { status: 500 })
    }
  }),

  // DELETE a model
  http.delete("*/models/:id", ({ params }) => {
    try {
      const { id } = params
      models = models.filter((m) => m.id !== id)
      return new HttpResponse(null, { status: 204 })
    } catch (e) {
      const error = e as Error
      return HttpResponse.json({ message: "MSW Handler Error", error: error.message }, { status: 500 })
    }
  }),

  // PATCH (bulk update) models
  http.patch("*/models", async ({ request }) => {
    try {
      await delay(1000)
      const { ids, data } = (await request.json()) as { ids: string[]; data: Partial<Omit<Model, "id">> }

      models = models.map((model) => {
        if (ids.includes(model.id)) {
          return { ...model, ...data, updatedAt: new Date().toISOString() }
        }
        return model
      })

      return HttpResponse.json({ status: "ok" })
    } catch (e) {
      const error = e as Error
      return HttpResponse.json({ message: "MSW Handler Error", error: error.message }, { status: 500 })
    }
  }),

  // DELETE (bulk) models
  http.delete("*/models", async ({ request }) => {
    try {
      await delay(1000)
      const { ids } = (await request.json()) as { ids: string[] }
      models = models.filter((m) => !ids.includes(m.id))
      return HttpResponse.json({ status: "ok" })
    } catch (e) {
      const error = e as Error
      return HttpResponse.json({ message: "MSW Handler Error", error: error.message }, { status: 500 })
    }
  }),
]
