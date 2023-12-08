const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URI);
    const response = await request(app).post('/auth/login').send({
      email: process.env.USER_EMAIL,
      password: process.env.USER_PASSWORD,
    });
    token = response.body.token;

    const newRes = await request(app)
    .get('/resolutions')
    .set('Cookie', 'jwt=' + token);
  let lastResolutionIndex = newRes.body.length - 1;
  lastResolutionId = newRes.body[lastResolutionIndex]._id;
}, 20000);

describe('Resolution controller test', () => {
    it('should return all resolutions', async () => {
      const res = await request(app)
        .get('/resolutions')
        .set('Cookie', 'jwt=' + token);
      const lastResolutionIndex = res.body.length - 1;
      expect(res.body[lastResolutionIndex]).toHaveProperty('description');
    });
  
    it('should create a new resolution', async () => {
      const res = await request(app)
        .post('/resolutions')
        .set('Cookie', 'jwt=' + token)
        .send({
          ticketId: '6565e2555f22d1e51377e14b',
          description: 'Updated the Batmobile software',
          resolvedByEmployee: '6569bcfd23faef37e870c298',
        });
  
      expect(res.statusCode).toEqual(201);
      expect(res.body.description).toEqual('Updated the Batmobile software');
    });
  
    it('should return a resolution', async () => {
      const res = await request(app)
        .get('/resolutions/' + lastResolutionId)
        .set('Cookie', 'jwt=' + token);
      console.log(res.body)
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('resolvedByEmployee');
    });
  
    it('should update a resolution', async () => {
      const res = await request(app)
        .put('/resolutions/' + lastResolutionId)
        .set('Cookie', 'jwt=' + token)
        .send({
          ticketId: '6565e2555f22d1e51377e14b',
          description: 'Testing the update resolution function',
          resolvedByEmployee: '6569bcfd23faef37e870c298',
        });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('ticketId');
    });
  
    it('should delete a resolution', async () => {
      const res = await request(app)
        .delete('/resolutions/' + lastResolutionId)
        .set('Cookie', 'jwt=' + token);
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message');
    });
  });