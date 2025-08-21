import request from 'supertest';
import app from '../index.js';

describe('Token API', () => {
  it('should return 200 on GET /token', async () => {
    const res = await request(app).get('/token');
    expect(res.statusCode).toBe(200);
  });

  it('should create item on POST /token', async () => {
    const payload = { name: 'Sample token' };
    const res = await request(app).post('/token').send(payload);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});
