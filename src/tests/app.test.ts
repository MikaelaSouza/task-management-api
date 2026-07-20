import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { app } from '../app.js';

describe('Application', () => {
  it('should return API health status', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      status: 'ok',
      message: 'Task Management API is running',
    });
  });

  it('should expose Swagger documentation', async () => {
    const response = await request(app).get('/docs/');

    expect(response.status).toBe(200);
    expect(response.text).toContain('Swagger UI');
  });
});
