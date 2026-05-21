const request = require('supertest');
const app = require('../services/vehicles/app');
const sequelize = require('../shared/DBconfig');
const generateToken = require('../shared/utils/generateToken');
const { ensureTestDatabase } = require('./helpers/db');
require('../services/vehicles/models/Vehicle');
require('../services/vehicles/models/VehiclePosition');

describe('Vehicles service', () => {
  const token = generateToken({ id: 1, role: 'ADMIN', email: 'amine@exemple.tn' });

  beforeAll(async () => {
    await ensureTestDatabase();
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('creates a vehicle', async () => {
    const res = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${token}`)
      .send({
        plateNumber: 'TN-123-AB',
        type: 'taxi',
        model: 'municipal car',
        status: 'active',
      });

    expect(res.status).toBe(201);
    expect(res.body.plateNumber).toBe('TN-123-AB');
  });

  test('lists vehicles', async () => {
    const res = await request(app)
      .get('/api/vehicles')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
