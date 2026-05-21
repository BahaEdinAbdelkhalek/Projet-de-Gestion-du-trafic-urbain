const request = require('supertest');
const app = require('../services/auth/app');
const sequelize = require('../shared/DBconfig');
const { ensureTestDatabase } = require('./helpers/db');

describe('Auth service', () => {
  beforeAll(async () => {
    await ensureTestDatabase();
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('registers a user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: ' admin',
        email: 'admin@exemple.tn',
        password: '123456',
        role: 'ADMIN',
      });

    expect(res.status).toBe(201);
    expect(res.body.token).toBeTruthy();
    expect(res.body.user.email).toBe('admin@exemple.tn');
  });

  test('logs in a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@exemple.tn',
        password: '123456',
      });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeTruthy();
  });
});
