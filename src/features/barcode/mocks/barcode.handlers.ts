import { http, HttpResponse } from "msw";

export const barcodeHandlers = [
  http.post("/api/barcodes/generate", () => {
    // In a real mock, you might return a mock PDF blob.
    // For now, just a success message.
    return HttpResponse.json({ success: true, message: "Barcodes generated successfully." });
  }),
];