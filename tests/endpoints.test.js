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

    const newRes = await request(app)
        .get('/resolutions')
        .set('Cookie', 'jwt=' + token);
    let lastResolutionIndex = newRes.body.length - 1;
    lastResolutionId = newRes.body[lastResolutionIndex]._id;
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

describe('Resolution controller test', () => {
    it('should return all resolutions', async () => {
        const res = await request(app)
            .get('/resolutions')
            .set('Cookie', 'jwt=' + token);
        expect(res.statusCode).toBe(200);
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
