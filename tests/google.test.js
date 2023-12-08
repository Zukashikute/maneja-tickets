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

describe('Google controllers test', () => {
    it('Should update the Google username', async () => {
      const res = await request(app).put('/google/update/657332f044b75a7993745fbe').send({
        username: 'Clark Kent',
      }).set('Cookie', 'jwt=' + token);
      console.log(res.body)
      expect(res.statusCode).toBe(200);
      expect(res.body.username).toEqual('Clark Kent');
    }, 20000);

    it('should delete the Google username', async () => {
        const res = await request(app)
          .delete('/google/delete/65733c0d44b75a7993745ff0')
          .set('Cookie', 'jwt=' + token);
    
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message');
      });
  
   
  });