// src/features/customers/mocks/customers.handlers.ts

import { http, HttpResponse } from 'msw';
import { mockCustomers } from './customers.mock';

export const customerHandlers = [
  // GET Request Mock
  http.get('*/customers', () => {
    return HttpResponse.json(mockCustomers);
  }),

  // GET Single Request Mock
  http.get('*/customers/:id', ({ params }) => {
    const { id } = params;
    const customer = mockCustomers.find(c => c.id === id);
    if (!customer) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(customer);
  }),

  // POST Request Mock
  http.post('*/customers', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      id: Math.random().toString(36).substring(7),
      ...(body as object),
    }, { status: 201 });
  }),

  // PUT Request Mock (Update)
  http.put('*/customers/:id', async ({ params, request }) => {
    const { id } = params;
    const body = await request.json();
    return HttpResponse.json({
      id,
      ...(body as object),
    });
  }),

  // DELETE Request Mock
  http.delete('*/customers/:id', ({ params }) => {
    const { id } = params;
    return HttpResponse.json({ id, deleted: true });
  }),
];
