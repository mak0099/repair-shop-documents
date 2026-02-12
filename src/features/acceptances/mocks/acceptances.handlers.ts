// src/features/acceptances/mocks/acceptances.handlers.ts

import { http, HttpResponse } from 'msw';
import { mockAcceptances } from './acceptances.mock';

export const acceptanceHandlers = [
  // GET Request Mock
  http.get('*/acceptances', () => {
    return HttpResponse.json(mockAcceptances);
  }),

  // POST Request Mock
  http.post('*/acceptances', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      id: Math.random().toString(36).substring(7),
      ...(body as object),
      acceptance_number: `${Date.now()}-2025`,
      created_date: new Date().toISOString(),
    }, { status: 201 });
  }),

  // PUT Request Mock (Update)
  http.put('*/acceptances/:id', async ({ params, request }) => {
    const { id } = params;
    const body = await request.json();
    return HttpResponse.json({
      id,
      ...(body as object),
    });
  }),

  // DELETE Request Mock
  http.delete('*/acceptances/:id', ({ params }) => {
    const { id } = params;
    return HttpResponse.json({ id, deleted: true });
  }),
];
