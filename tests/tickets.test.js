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

    const res = await request(app)
    .get('/tickets')
    .set('Cookie', 'jwt=' + token);
  let lastIndexElement = res.body.length - 1;
  lastIndexId = res.body[lastIndexElement]._id;
  
}, 20000);

describe('Tickets Controller test', () => {
    it('should return all tickets', async () => {
      const res = await request(app)
        .get('/tickets')
        .set('Cookie', 'jwt=' + token);
      const lastElementIndex = res.body.length - 1;
      expect(res.statusCode).toBe(200);
      expect(res.body[lastElementIndex]).toHaveProperty('title');
    });
  
    it('should create a new ticket', async () => {
      const res = await request(app)
        .post('/tickets')
        .set('Cookie', 'jwt=' + token)
        .send({
          userId: '656a1ba79b85f94a3b261761',
          title: "Batmobile Won't Start",
          description:
            "The Batmobile won't start. Gotham needs me, but it says it needs the latest software update.",
          priorityLevel: 'Medium',
          assignedEmployee: '6569bcfd23faef37e870c298',
        });
  
      expect(res.statusCode).toEqual(201);
      expect(res.body.title).toEqual("Batmobile Won't Start");
    });
  
    it('should return a ticket', async () => {
      const res = await request(app)
        .get('/tickets/' + lastIndexId)
        .set('Cookie', 'jwt=' + token);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('description');
    });
  
    it('should update a ticket', async () => {
      const res = await request(app)
        .put('/tickets/' + lastIndexId)
        .set('Cookie', 'jwt=' + token)
        .send({
          userId: '656a1ba79b85f94a3b261761',
          title: 'Test',
          description: 'Testing the update ticket function.',
          priorityLevel: 'High',
          status: 'Pending',
          assignedEmployee: '6569bcfd23faef37e870c298',
        });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('priorityLevel');
    });
  
    it('should delete a ticket', async () => {
      const res = await request(app)
        .delete('/tickets/' + lastIndexId)
        .set('Cookie', 'jwt=' + token);
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message');
    });
  });