jest.mock('../src/config/stripe', () => ({
  paymentIntents: {
    create: jest.fn(),
  },
  checkout: {
    sessions: {
      create: jest.fn(),
    },
  },
  webhooks: {
    constructEvent: jest.fn(),
  },
}));

const request = require('supertest');
const app = require('../src/app');


describe('GET /api/v1/health', () => {
  it('should return 404 for unknown route', async () => {
    const res = await request(app).get('/api/v1/unknown');
    expect(res.statusCode).toEqual(404);
  });
});
