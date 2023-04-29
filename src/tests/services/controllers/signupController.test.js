const request = require('supertest');
const app = require('../../../services/server/server');

describe('POST /signup', () => {
  it('responds with a 200 status code and redirect to login page if user is created', async () => {
    const response = await request(app)
      .post('/signup')
      .send({ username: 'usertest', password: 'testpassword', email: 'test@test.com' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)

    expect(response.statusCode).toEqual(200);
    expect(response.body.redirect).toEqual('/login?account_created=true');
  });
  
  it('responds with a 500 status code and error message if user creation fails', async () => {
    const response = await request(app)
      .post('/signup')
      .send({ username: 'usertest', password: 'testpassword', email: '' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    
    expect(response.statusCode).toEqual(500);
    expect(response.body.redirect).toEqual('/signup');
    expect(response.body.message).toEqual('Erro ao criar a conta');
  });
});

describe('GET /signup', () => {
  it('responds with a 200 status code and renders signup page', async () => {
    const response = await request(app)
      .get('/signup')
      .expect('Content-Type', /html/)
      .expect(200);

    expect(response.text).toContain('signup');
  });
});