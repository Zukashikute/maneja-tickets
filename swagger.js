const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Maneja Tickets System API',
        description: 'An API for creating and managing support tickets.',
    },
    host: 'maneja-tickets.onrender.com',
    schemes: ['https'],
    tags: ['Tickets', 'Users', 'Google Users', 'Resolution'],
    definitions: {
        // Sessions
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

        // Google Users
        GoogleUsersId: '6553fd4495e95588a3921cfd',
        GoogleUserInput: {
            username: 'MarcosAntunes',
            googleId: '106903543166470337016',
        },
        GoogleUserOutput: {
            _id: '6553fd4495e95588a3921cfd',
            username: 'MarcosAntunes',
            googleId: '106903543166470337016',
        },
        GoogleUserOutputArray: [{ $ref: '#/definitions/GoogleUserOutput' }],

        // Users
        UserId: '6568d4ca16eaa1dfd891beca',
        UserInput: {
            $firstName: 'Marcos',
            $lastName: 'Antunes',
            $username: 'MarcosAntunes',
            $email: 'marcos@antunes.com',
            $phoneNumber: '123-123-3333',
            $password: 'supersecretpassword',
            $jobPosition: 'Web Backend Developer',
        },
        UserOutput: {
            _id: '6568d4ca16eaa1dfd891beca',
            firstName: 'Marcos',
            lastName: 'Antunes',
            username: 'MarcosAntunes',
            email: 'marcos@antunes.com',
            phoneNumber: '123-123-3333',
            password:
                '$2a$10$VP1sVEWqrbU5p.ICZZO7I.qAXkkPpOXrWKxbNeqQiF5IHI58TdanD',
            jobPosition: 'Web Backend Developer',
        },
        UserOutputArray: [{ $ref: '#/definitions/UserOuput' }],
        UserLogin: {
            email: 'marcos@antunes.com',
            password: 'supersecretpassword',
        },

        // Tickets
        TicketId: '6565e2555f22d1e51377e14b',
        TicketInput: {
            $userId: '6568d4ca16eaa1dfd891beca',
            $title: 'Lost Database Access',
            $description:
                "The IP address of the new servers don't have access the database, which is essential for testing the new API.",
            priorityLevel: 'High',
            assignedEmployee: '6568d4ca16eaa1dfd891beca',
        },
        TicketOutput: {
            _id: '6565e2555f22d1e51377e14b',
            userId: '6568d4ca16eaa1dfd891beca',
            title: 'Lost Database Access',
            description:
                "The IP address of the new servers don't have access the database, which is essential for testing the new API.",
            priorityLevel: 'High',
            status: 'New',
            assignedEmployee: '6568d4ca16eaa1dfd891beca',
            dateCreated: '2023-11-18T00:00:00.000+00:00',
        },
        TicketOutputArray: [{ $ref: '#/definitions/TicketOutput' }],
        TicketIdNotFound: {
            message: 'No ticket found with ID 6565e2555f22d1e51377e14b',
        },

        // Resolutions
        ResolutionId: '656a290cc420deb53c7d03e6',
        ResolutionInput: {
            $ticketId: '6565e2555f22d1e51377e14b',
            $description: 'Updated the Batmobile OS to v19.39',
            $resolvedByEmployee: '6554f4f588e34040ea6a2085',
        },
        ResolutionOutput: {
            _id: '656a290cc420deb53c7d03e6',
            ticketId: '6565e2555f22d1e51377e14b',
            ticketStatus: 'Open',
            resolution: 'Updated the Batmobile OS to v19.39',
            resolvedByEmployee: '6554f4f588e34040ea6a2085',
        },
        ResolutionOutputArray: [{ $ref: '#/definitions/ResolutionOutput' }],
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
