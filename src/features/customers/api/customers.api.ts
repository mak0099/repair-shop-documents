// src/features/customers/api/customers.api.ts

import { apiClient } from "@/services/api-client";
import { Customer } from "../types/customer";

export const customerApi = {
  async getAll(): Promise<Customer[]> {
    const res = await apiClient.get("/customers");
    return res.data;
  },

  async getById(id: string): Promise<Customer> {
    const res = await apiClient.get(`/customers/${id}`);
    return res.data;
  },

  async create(data: Customer): Promise<Customer> {
    const res = await apiClient.post("/customers", data);
    return res.data;
  },

  async update(id: string, data: Customer): Promise<Customer> {
    const res = await apiClient.put(`/customers/${id}`, data);
    return res.data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/customers/${id}`);
  },
};
