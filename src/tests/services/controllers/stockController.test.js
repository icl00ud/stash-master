const request = require('supertest');
const app = require('../../../services/server/server');

describe('GET /stock', () => {
  test('should respond with 200 status code and HTML file', async () => {
    const response = await request(app).get('/stock');
    expect(response.status).toBe(200);
    expect(response.type).toBe('text/html');
  });
});
