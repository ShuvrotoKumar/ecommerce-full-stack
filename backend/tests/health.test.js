const request = require('supertest');
const app = require('../src/app');

describe('GET /api/v1/health', () => {
  it('should return 404 for unknown route', async () => {
    const res = await request(app).get('/api/v1/unknown');
    expect(res.statusCode).toEqual(404);
  });
});
