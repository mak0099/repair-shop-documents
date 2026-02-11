import { API_CONFIG } from "../config";
import { mockCustomers } from "../mocks/customers.mock";
import { Customer } from "./types";

export const customerService = {
  // ১. নতুন কাস্টমার তৈরি করা
  createCustomer: async (data: Customer) => {
    if (API_CONFIG.useMock) {
      console.log("Mock API: Creating Customer...", data);
      return new Promise((resolve) => setTimeout(() => resolve({ success: true, data }), 800));
    }

    const response = await fetch(`${API_CONFIG.baseUrl}/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // ২. কাস্টমার লিস্ট নিয়ে আসা (P-027 এর জন্য)
  getCustomers: async () => {
    if (API_CONFIG.useMock) {
      return new Promise((resolve) => setTimeout(() => resolve(mockCustomers), 500));
    }
    const response = await fetch(`${API_CONFIG.baseUrl}/customers`);
    return response.json();
  }
};