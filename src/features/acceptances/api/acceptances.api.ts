// features/acceptances/api/acceptances.api.ts

import { apiClient } from "@/services/api-client";
import { Acceptance } from "../types/acceptance";


export const acceptanceApi = {
  async getAll(): Promise<Acceptance[]> {
    const res = await apiClient.get("/acceptances");
    return res.data;
  },

  async getById(id: string): Promise<Acceptance> {
    const res = await apiClient.get(`/acceptances/${id}`);
    return res.data;
  },

  async create(data: Acceptance): Promise<Acceptance> {
    const res = await apiClient.post("/acceptances", data);
    return res.data;
  },

  async update(id: string, data: Acceptance): Promise<Acceptance> {
    const res = await apiClient.put(`/acceptances/${id}`, data);
    return res.data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/acceptances/${id}`);
  },
};
