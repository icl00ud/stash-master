const request = require('supertest');
const app = require('../../../services/server/server');

describe('authenticateUser', () => {
  it('should return true if user exists in database', async () => {
    const response = await request(app)
      .post('/login')
      .send({ user: 'admin', password: 'adminadmin' });

    expect(response.statusCode).toBe(200);
  });

  it('should return false if user is not in database', async () => {
    const response = await request(app)
      .post('/login')
      .send({ user: 'invalid', password: 'password' });

    expect(response.status).toBe(401);
  });
});