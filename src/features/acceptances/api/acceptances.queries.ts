// features/acceptances/api/acceptances.queries.ts

import { useQuery } from "@tanstack/react-query";
import { acceptanceApi } from "./acceptances.api";
import { acceptanceMapper } from "./acceptances.mapper";

export const useAcceptances = () => {
  return useQuery({
    queryKey: ["acceptances"],
    queryFn: async () => {
      const data = await acceptanceApi.getAll();
      return data.map(acceptanceMapper.toUI);
    },
  });
};

export const useAcceptance = (id: string) => {
  return useQuery({
    queryKey: ["acceptance", id],
    queryFn: async () => {
      const data = await acceptanceApi.getById(id);
      return acceptanceMapper.toUI(data);
    },
    enabled: !!id,
  });
};
