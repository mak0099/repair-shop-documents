import { delay, http, HttpResponse } from "msw";

import { applySort } from "@/mocks/mock-utils";
import { Customer, CustomerFormValues } from "../customer.schema";
import { mockCustomers } from "./customers.mock";

// Mutable copy for mock operations
let customers = [...mockCustomers];

export const customerHandlers = [
  // GET all customers with pagination and search
  http.get("*/customers", async ({ request }) => {
    await delay(500);
    const url = new URL(request.url);
    const search = url.searchParams.get("search") || "";
    const status = url.searchParams.get("status"); // 'active', 'inactive', 'all'
    const isDealer = url.searchParams.get("isDealer"); // 'true', 'false', 'all'
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
    const sort = url.searchParams.get("_sort");
    const order = url.searchParams.get("_order");

    let filteredCustomers = customers;

    // Filter by search query
    if (search) {
      const lowercasedSearch = search.toLowerCase();
      filteredCustomers = filteredCustomers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(lowercasedSearch) ||
          (customer.email || "").toLowerCase().includes(lowercasedSearch) ||
          (customer.mobile || "").toLowerCase().includes(lowercasedSearch),
      );
    }

    // Filter by status (isActive)
    if (status && status !== "all") {
      const isActive = status === "active";
      filteredCustomers = filteredCustomers.filter(
        (customer) => customer.isActive === isActive,
      );
    }

    // Filter by role (isDealer)
    if (isDealer && isDealer !== "all") {
      const isDealerBool = isDealer === "true";
      filteredCustomers = filteredCustomers.filter(
        (customer) => customer.isDealer === isDealerBool,
      );
    }

    const sortedData = applySort(filteredCustomers, sort, order);

    const total = sortedData.length;
    const totalPages = Math.ceil(total / pageSize);
    const paginatedData = sortedData.slice(
      (page - 1) * pageSize,
      page * pageSize,
    );

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

  // GET customer options for dropdowns
  http.get("*/customers/options", () => {
    const customerOptions = customers.map((c) => ({ id: c.id, name: c.name, mobile: c.mobile }));
    return HttpResponse.json(customerOptions);
  }),

  // GET a single customer by ID
  http.get("*/customers/:id", ({ params }) => {
    const { id } = params;
    const customer = customers.find((c) => c.id === id);
    if (!customer) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(customer);
  }),

  // POST (create) a customer
  http.post("*/customers", async ({ request }) => {
    try {
      await delay(500);
      const data = (await request.json()) as CustomerFormValues;

      if (!data.name) {
        return HttpResponse.json(
          { message: "Customer name is required" },
          { status: 400 },
        );
      }

      const newCustomer: Customer = {
        id: `cust_${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      customers.unshift(newCustomer);
      return HttpResponse.json(newCustomer, { status: 201 });
    } catch (e) {
      const error = e as Error;
      return HttpResponse.json(
        { message: "MSW Handler Error", error: error.message },
        { status: 500 },
      );
    }
  }),

  // DELETE a customer
  http.delete("*/customers/:id", ({ params }) => {
    const { id } = params;
    customers = customers.filter((c) => c.id !== id);
    return new HttpResponse(null, { status: 204 });
  }),

  // PATCH a single customer (for status updates, etc.)
  http.patch("*/customers/:id", async ({ params, request }) => {
    try {
      await delay(500);
      const { id } = params;
      const data = (await request.json()) as Partial<CustomerFormValues>;
      const customerIndex = customers.findIndex((c) => c.id === id);

      if (customerIndex === -1) {
        return HttpResponse.json(
          { message: "Customer not found" },
          { status: 404 },
        );
      }

      const updatedCustomer = {
        ...customers[customerIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      customers[customerIndex] = updatedCustomer;

      return HttpResponse.json(updatedCustomer, { status: 200 });
    } catch (e) {
      const error = e as Error;
      return HttpResponse.json(
        { message: "MSW Handler Error", error: error.message },
        { status: 500 },
      );
    }
  }),

  // PATCH (bulk update) customers
  http.patch("*/customers", async ({ request }) => {
    try {
      await delay(1000);
      const { ids, data } = (await request.json()) as {
        ids: string[];
        data: Partial<Omit<Customer, "id">>;
      };

      customers = customers.map((customer) => {
        if (ids.includes(customer.id)) {
          return { ...customer, ...data, updatedAt: new Date().toISOString() };
        }
        return customer;
      });

      return HttpResponse.json({ status: "ok" });
    } catch (e) {
      const error = e as Error;
      return HttpResponse.json(
        { message: "MSW Handler Error", error: error.message },
        { status: 500 },
      );
    }
  }),

  // DELETE (bulk) customers
  http.delete("*/customers", async ({ request }) => {
    await delay(1000);
    const { ids } = (await request.json()) as { ids: string[] };
    customers = customers.filter((c) => !ids.includes(c.id));
    return HttpResponse.json({ status: "ok" });
  }),
];
