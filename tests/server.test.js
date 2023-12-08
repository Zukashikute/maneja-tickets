const request = require('supertest');
const app = require('../server');

describe('Server Setup and Configuration', () => {
  it('responds with 404 for unknown routes', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.status).toBe(404);
  });

  it('responds with CORS headers', async () => {
    const response = await request(app).get('/');
    expect(response.headers['access-control-allow-origin']).toBe('*');
  });

});