const swaggerAutogen = require('swagger-autogen')();


const doc = {
    info: {
        title: 'My API',
        description: 'Maneja Tickets System API',
    },
    host: 'maneja-tickets.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)