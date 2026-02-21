import { http, HttpResponse } from "msw";
import { mockAttributes } from "./attributes.mock";
import type { Attribute } from "../attribute.schema";

let attributes: Attribute[] = [...mockAttributes];

export const attributeHandlers = [
  // Get all attributes
  http.get("*/attributes", () => {
    return HttpResponse.json({
      data: attributes,
      meta: {
        total: attributes.length,
        page: 1,
        pageSize: attributes.length,
        totalPages: 1,
      },
    });
  }),

  // Update an attribute
  http.patch("*/attributes/:id", async ({ request, params }) => {
    const { id } = params;
    const updates = (await request.json()) as Partial<Attribute>;
    const index = attributes.findIndex((attr) => attr.id === id);
    if (index !== -1) {
      attributes[index] = { ...attributes[index], ...updates };
      return HttpResponse.json(attributes[index]);
    }
    return new HttpResponse(null, { status: 404 });
  }),
];