const mongoose = require('mongoose');
const db = require('../models');
const request = require('supertest');
const app = require('../server');
const env = require('dotenv').config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await db.mongoose.connect(process.env.DATABASE_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await db.mongoose.connection.close();
});

describe('GET /tickets', () => {
  it('should return all tickets', async () => {
    const res = await request(app).get('/tickets');
    expect(res.statusCode).toBe(200);
  });
});

describe('GET /tickets/:id', () => {
  it('should return a ticket', async () => {
    const res = await request(app).get('/tickets/655e7e68e0a2c13f6042bd65');
    expect(res.body.username).toBe('Marcos Antunes')
    expect(res.statusCode).toBe(200);
  });
});
