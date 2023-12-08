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
}, 20000);

describe('Users controller test', () => {
    it('Should login the user', async () => {
      const res = await request(app).post('/auth/login').send({
        email: process.env.USER_EMAIL,
        password: process.env.USER_PASSWORD,
      });
      expect(res.statusCode).toBe(200);
    }, 20000);
  
    it('Should create an user', async () => {
      const res = await request(app).post('/auth/create').send({
        firstName: 'Marcos',
        lastName: 'test',
        username: 'marcos jr',
        email: 'test@test.com',
        phoneNumber: '123-123-3333',
        password: '123testing456',
        jobPosition: 'web backend developer',
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body.firstName).toEqual('Marcos');
      lastUserId = res.body._id;
    }, 20000);
  
    it('Should update the user account', async () => {
      const res = await request(app)
        .put('/auth/account/' + lastUserId)
        .set('Cookie', 'jwt=' + token)
        .send({
          firstName: 'Test',
          lastName: 'New Test',
          username: 'Test New Test',
          email: 'test@test.com',
          phoneNumber: '123-123-3333',
          password: '123testing456',
          jobPosition: 'Software Developer',
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.firstName).toEqual('Test');
    }, 20000);
  
    it('Should delete the user account', async () => {
      const res = await request(app)
        .delete('/auth/account/' + lastUserId)
        .set('Cookie', 'jwt=' + token);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
    }, 20000);
  
    it('Should logout the user', async () => {
      const res = await request(app).get('/auth/logout');
  
      expect(res.statusCode).toEqual(200);
    }, 20000);
  });