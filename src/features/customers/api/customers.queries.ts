// src/features/customers/api/customers.queries.ts

import { useQuery } from "@tanstack/react-query";
import { customerApi } from "./customers.api";
import { customerMapper } from "./customers.mapper";

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const data = await customerApi.getAll();
      return data.map(customerMapper.toUI);
    },
  });
};

export const useCustomer = (id: string) => {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: async () => {
      const data = await customerApi.getById(id);
      return customerMapper.toUI(data);
    },
    enabled: !!id,
  });
};
