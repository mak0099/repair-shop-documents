// src/features/customers/api/customers.mutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customerApi } from "./customers.api";
import { customerMapper } from "./customers.mapper";
import { Customer } from "../types/customer";

export const useCreateCustomer = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: Customer) => {
      return customerApi.create(customerMapper.toServer(data));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

export const useUpdateCustomer = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Customer }) => {
      return customerApi.update(id, customerMapper.toServer(data));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

export const useDeleteCustomer = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => customerApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};
