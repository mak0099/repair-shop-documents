import { delay, http, HttpResponse } from "msw";
import { applySort } from "@/mocks/mock-utils";
import { StockAdjustment } from "../stock-adjustment.schema";
import { stockAdjustmentsMock } from "./stock-adjustment.mock";

const stockAdjustments = [...stockAdjustmentsMock];

export const stockAdjustmentHandlers = [
  // GET all adjustments with advanced filtering
  http.get("*/stock-adjustments", async ({ request }) => {
    await delay(500);
    const url = new URL(request.url);
    
    const search = url.searchParams.get("search") || "";
    const type = url.searchParams.get("type");
    const reason = url.searchParams.get("reason");
    const stockId = url.searchParams.get("stockId"); // Added for specific phone history
    const page = Number(url.searchParams.get("page") || "1");
    const pageSize = Number(url.searchParams.get("pageSize") || "10");
    const sort = url.searchParams.get("_sort");
    const order = url.searchParams.get("_order");

    let filteredData = stockAdjustments;

    // Search by note or imei
    if (search) {
      const lower = search.toLowerCase();
      filteredData = filteredData.filter((adj) =>
        adj.note?.toLowerCase().includes(lower) || 
        adj.imei?.includes(lower) ||
        adj.itemName?.toLowerCase().includes(lower)
      );
    }

    // Filter by specific stock unit (History view)
    if (stockId) {
      filteredData = filteredData.filter((adj) => adj.stockId === stockId);
    }

    if (type && type !== "all") {
      filteredData = filteredData.filter((adj) => adj.type === type);
    }

    if (reason && reason !== "all") {
      filteredData = filteredData.filter((adj) => adj.reason === reason);
    }

    const sortedData = applySort(filteredData, sort, order);

    const total = sortedData.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedData = sortedData.slice(start, end);

    return HttpResponse.json({
      data: paginatedData,
      meta: {
        total,
        page,
        pageSize,
        totalPages,
      },
    });
  }),

  // GET single adjustment
  http.get("*/stock-adjustments/:id", ({ params }) => {
    const { id } = params;
    const adjustment = stockAdjustments.find((adj) => adj.id === id);
    if (!adjustment) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(adjustment);
  }),

  // POST new adjustment
  http.post("*/stock-adjustments", async ({ request }) => {
    await delay(500);
    const data = (await request.json()) as StockAdjustment;
    const newAdjustment: StockAdjustment = {
      ...data,
      id: `sa_${Date.now()}`,
      date: new Date().toISOString(),
    };
    stockAdjustments.unshift(newAdjustment);
    return HttpResponse.json(newAdjustment, { status: 201 });
  }),
];