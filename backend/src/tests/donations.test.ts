import request from 'supertest';
import app from '../index.js';

describe('Donations API', () => {
  it('should return 200 on GET /donations', async () => {
    const res = await request(app).get('/donations');
    expect(res.statusCode).toBe(200);
  });

  it('should create item on POST /donations', async () => {
    const payload = { name: 'Sample donations' };
    const res = await request(app).post('/donations').send(payload);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});
