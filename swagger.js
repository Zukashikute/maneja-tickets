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
    definitions: {
        GoogleUsersId: '6553fd4495e95588a3921cfd',
        GoogleUserInput: {
            username: 'MarcosAntunes',
            googleId: '106903543166470337016',
        },
        GoogleUserOutput: {
            _id: new ObjectId('6553fd4495e95588a3921cfd'),
            username: 'MarcosAntunes',
            googleId: '106903543166470337016',
        },
        GoogleUserOutputArray: [{ $ref: '#/definitions/GoogleUserOutput' }],
        ResolutionId: '6553fd4495e95588a3921cfd',
        ResolutionInput: {
            ticketId: new ObjectId('65592886744f7d0ebe92c28d'),
            ticketStatus: 'Open',
            resolution: '',
            assignedEmployeeId: new ObjectId('6554f4f588e34040ea6a2085'),
        },
        ResolutionOutput: {
            _id: new ObjectId('6553fd4495e95588a3921cfd'),
            ticketId: new ObjectId('65592886744f7d0ebe92c28d'),
            ticketStatus: 'Open',
            resolution: '',
            assignedEmployeeId: new ObjectId('6554f4f588e34040ea6a2085'),
        },
        ResolutionOutputArray: [{ $ref: '#/definitions/ResolutionOutput' }],
        SessionId: 'j86VFszYE5_NOCBsOBLCkkmjPqDK2bT8',
        SessionInput: {
            expires: '2023-11-29T16:50:32.232+00:00',
            session:
                '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}',
        },
        SessionOutput: {
            _id: 'j86VFszYE5_NOCBsOBLCkkmjPqDK2bT8',
            expires: '2023-11-29T16:50:32.232+00:00',
            session:
                '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}',
        },
        SessionOutputArray: [{ $ref: '#/definitions/SessionOutput' }],
        TicketId: '65592886744f7d0ebe92c28d',
        TicketInput: {
            username: 'MarcosAntunes',
            email: 'marcos@antunes.com',
            phoneNumber: '123-123-3333',
            jobPosition: 'Web Backend Developer',
            ticketTitle: 'Lost Database Access',
            ticketDescription:
                "The IP address of the new servers don't have access the database, which is essential for testing the new API.",
            dateAndTime: '2023-11-18T00:00:00.000+00:00',
            priorityLevel: 'High',
        },
        TicketOuput: {
            _id: new ObjectId('65592886744f7d0ebe92c28d'),
            username: 'MarcosAntunes',
            email: 'marcos@antunes.com',
            phoneNumber: '123-123-3333',
            jobPosition: 'Web Backend Developer',
            ticketTitle: 'Lost Database Access',
            ticketDescription:
                "The IP address of the new servers don't have access the database, which is essential for testing the new API.",
            dateAndTime: '2023-11-18T00:00:00.000+00:00',
            priorityLevel: 'High',
        },
        TicketOutputArray: [{ $ref: '#/definitions/TicketOuput' }],
        UserId: '6554f4f588e34040ea6a2085',
        UserInput: {
            firstName: 'Marcos',
            lastName: 'Antunes',
            username: 'MarcosAntunes',
            email: 'marcos@antunes.com',
            password:
                '$2a$10$VP1sVEWqrbU5p.ICZZO7I.qAXkkPpOXrWKxbNeqQiF5IHI58TdanD',
            jobPosition: 'Web Backend Developer',
        },
        UserOutput: {
            _id: new ObjectId('6554f4f588e34040ea6a2085'),
            firstName: 'Marcos',
            lastName: 'Antunes',
            username: 'MarcosAntunes',
            email: 'marcos@antunes.com',
            password:
                '$2a$10$VP1sVEWqrbU5p.ICZZO7I.qAXkkPpOXrWKxbNeqQiF5IHI58TdanD',
            jobPosition: 'Web Backend Developer',
        },
        UserOutputArray: [{ $ref: '#/definitions/UserOuput' }],
    },
    securityDefinitions: {
        BasicAuth: {
            type: 'basic',
            authorizationUrl: 'https://maneja-tickets.onrender.com/auth/login',
            flow: 'implicit',
            scopes: {
                read: 'Grants general read access',
                write: 'Grants general write access',
                admin: 'Grants access to admin operations',
            },
        },
        GoogleOAuth: {
            type: 'oauth2',
            authorizationUrl: 'https://maneja-tickets.onrender.com/auth/google',
            flow: 'implicit',
            scopes: {
                read: 'Grants general read access',
                write: 'Grants general write access',
                admin: 'Grants access to admin operations',
            },
        },
    },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
