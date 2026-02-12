// src/features/customers/api/customers.mapper.ts

import { Customer } from "../types/customer";

export const customerMapper = {
  toUI(server: any): Customer {
    return {
      ...server,
    };
  },

  toServer(ui: Customer): any {
    return {
      ...ui,
    };
  },
};
