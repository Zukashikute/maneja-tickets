const swaggerAutogen = require('swagger-autogen')();
const ObjectId = require('mongoose').Types.ObjectId;

const doc = {
    info: {
        title: 'Maneja Tickets System API',
        description: 'An API for creating and managing support tickets.',
    },
    host: 'maneja-tickets.onrender.com',
    schemes: ['https'],
    tags: ['Tickets', 'Users', 'Google Users', 'Resolution'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);