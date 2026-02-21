import { delay, http, HttpResponse } from "msw";
import { applySort } from "@/mocks/mock-utils";
import { StockAdjustment } from "../stock-adjustment.schema";
import { stockAdjustmentsMock } from "./stock-adjustment.mock";

let stockAdjustments = [...stockAdjustmentsMock];

export const stockAdjustmentHandlers = [
  // GET all stock adjustments with filtering and sorting
  http.get("*/stock-adjustments", async ({ request }) => {
    await delay(500);
    const url = new URL(request.url);
    const search = url.searchParams.get("search") || ""; // Assuming search by note
    const type = url.searchParams.get("type");
    const reason = url.searchParams.get("reason");
    const sort = url.searchParams.get("_sort");
    const order = url.searchParams.get("_order");

    let filteredData = stockAdjustments;

    if (search) {
      const lowercasedSearch = search.toLowerCase();
      filteredData = filteredData.filter((adj) =>
        adj.note?.toLowerCase().includes(lowercasedSearch),
      );
    }

    if (type && type !== "all") {
      filteredData = filteredData.filter((adj) => adj.type === type);
    }

    if (reason && reason !== "all") {
      filteredData = filteredData.filter((adj) => adj.reason === reason);
    }

    const sortedData = applySort(filteredData, sort, order);

    return HttpResponse.json({
      data: sortedData,
      count: sortedData.length,
    });
  }),

  // GET a single stock adjustment by ID
  http.get("*/stock-adjustments/:id", ({ params }) => {
    const { id } = params;
    const adjustment = stockAdjustments.find((adj) => adj.id === id);
    if (!adjustment) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(adjustment);
  }),

  // POST (create) a stock adjustment
  http.post("*/stock-adjustments", async ({ request }) => {
    await delay(500);
    const data = (await request.json()) as StockAdjustment;
    const newAdjustment: StockAdjustment = {
      id: `sa_${Date.now()}`,
      ...data,
    };
    stockAdjustments.unshift(newAdjustment);
    return HttpResponse.json(newAdjustment, { status: 201 });
  }),
];