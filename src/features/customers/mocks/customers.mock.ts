// src/features/customers/mocks/customers.mock.ts

import { Customer } from "../types/customer";

export const mockCustomers: Customer[] = [
  {
    id: "cust-001",
    name: "Mario Rossi",
    email: "mario.rossi@example.com",
    mobile: "+39 333 1234567",
    branch_tid: "roma-main",
    isDealer: false,
    isDesktopCustomer: true,
    isCustomer: true,
    active_inactive: true,
    location: "Roma",
    province: "RM",
    address: "Via Roma 1",
    "postal-code": "00100",
    "fiscal-code": "RSSMRA80A01H501Z"
  },
  {
    id: "cust-002",
    name: "Giulia Bianchi",
    email: "giulia.bianchi@example.com",
    mobile: "+39 333 7654321",
    branch_tid: "milano-main",
    isDealer: true,
    isDesktopCustomer: true,
    isCustomer: true,
    active_inactive: true,
    location: "Milano",
    province: "MI",
    address: "Via Milano 2",
    vat: "IT12345678901"
  }
];
