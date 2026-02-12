// src/mocks/handlers.ts
import { acceptanceHandlers } from "@/features/acceptances/mocks/acceptances.handlers";
import { customerHandlers } from "@/features/customers/mocks/customers.handlers";

export const handlers = [
  ...acceptanceHandlers,
  ...customerHandlers,
]
