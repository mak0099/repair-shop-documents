import { Customer } from "../customers/types";

export const mockCustomers: Customer[] = [
  {
    id: "cust-001",
    name: "Luigi Moretti",
    email: "luigi.m@example.it",
    mobile: "+39 333 444 5555",
    "fiscal-code": "MRTLGU80A01H501U",
    location: "Rome",
    province: "RM",
    address: "Via del Corso, 12",
    branch_tid: "branch-roma-01",
    isDealer: false,
    isDesktopCustomer: true,
    isCustomer: false,
    active_inactive: true
  },
  {
    id: "cust-002",
    name: "Sofia Esposito",
    email: "sofia.repair@business.it",
    mobile: "+39 320 987 6543",
    vat: "IT12345678901",
    location: "Milan",
    province: "MI",
    branch_tid: "branch-milan-02",
    isDealer: true,
    isDesktopCustomer: true,
    isCustomer: true,
    active_inactive: true
  }
];