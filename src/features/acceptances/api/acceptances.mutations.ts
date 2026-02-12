// features/acceptances/api/acceptances.mutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptanceApi } from "./acceptances.api";
import { acceptanceMapper } from "./acceptances.mapper";
import { Acceptance } from "../types/acceptance";

export const useCreateAcceptance = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: Acceptance) => {
      return acceptanceApi.create(acceptanceMapper.toServer(data));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["acceptances"] });
    },
  });
};

export const useUpdateAcceptance = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Acceptance }) => {
      return acceptanceApi.update(id, acceptanceMapper.toServer(data));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["acceptances"] });
    },
  });
};

export const useDeleteAcceptance = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => acceptanceApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["acceptances"] });
    },
  });
};
