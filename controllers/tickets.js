const db = require('../models');
require('dotenv').config();
const Ticket = db.tickets;

const getAllTickets = async (req, res) => {
    // #swagger.tags = ['Tickets']
    // #swagger.summary = 'Get all tickets'
    // #swagger.description = 'Get all tickets data from the database'.
    // #swagger.security = [{ "BasicAuth": ['read'], "GoogleOAuth": ['read'] }]
    try {
        const result = await Ticket.find();
        res.status(200).json(result);
        /* #swagger.responses[200] = {
            description: 'Retrieved',
            schema: { $ref: '#/definitions/TicketOutputArray' }
        } */
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

const getTicketByID = async (req, res) => {
    //  #swagger.tags = ['Tickets']
    //  #swagger.summary = 'Get a ticket by ID.'
    //  #swagger.description = 'Retrieve a specified ticket from the database.'
    /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'The ticket object to be inserted.',
            required: true,
            schema: { $ref: '#/definitions/TicketId' }
    } */
    //  #swagger.security = [{ "BasicAuth": ['read'], "GoogleOAuth": ['read'] }]
    try {
        // Query the database
        const _id = req.params.id;
        const result = await Ticket.findById(_id);

        // Respond with 404 if the given ID isn't in the database
        if (!result) {
            res.status(404).json({ message: 'No ticket found with ID ' + _id });
            return;
            /*  #swagger.responses[404] = {
                description: 'Ticket ID Not Found',
                schema: { $ref: '#/definitions/TicketIdNotFound' }
            } */
        }

        // Send the returned data
        res.status(200).json(result);
        /*  #swagger.responses[200] = {
                description: 'Retrieved',
                schema: { $ref: '#/definitions/TicketOutput' }
        } */
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

const createNewTicket = async (req, res) => {
    //  #swagger.tags = ['Tickets']
    //  #swagger.summary = 'Create a new ticket.'
    //  #swagger.description = 'Creates and inserts a new ticket into the database using a list of fields and values.'
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'The ticket object to be inserted.',
            required: true,
            schema: { $ref: '#/definitions/TicketInput' }
    } */
    //  #swagger.security = [{ "BasicAuth": ['write'], "GoogleOAuth": ['write'] }]
    try {
        const newTicket = new Ticket({
            userId: req.body.userId,
            title: req.body.title,
            description: req.body.description,
            priorityLevel: req.body.priorityLevel,
            assignedEmployee: req.body.assignedEmployee,
        });
        const result = await newTicket.save();
        res.status(201).json(result);
        /*  #swagger.responses[201] = {
                description: 'Created',
                schema: { $ref: '#/definitions/TicketOutput' }
        } */
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

const updateTicket = async (req, res) => {
    //  #swagger.tags = ['Tickets']
    //  #swagger.summary = 'Update a ticket.'
    //  #swagger.description = 'Updates an existing ticket in the database, given a list of any number of fields and a new values for each.
    /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'The ID of the ticket to be updated.',
            required: true,
            schema: { $ref: '#/definitions/TicketId' }
    } */
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Any number of fields of the ticket object to be updated, along with their new values.',
            required: true,
            schema: { $ref: '#/definitions/TicketUpdateInput' }
    } */
    //  #swagger.security = [{ "BasicAuth": ['write'], "GoogleOAuth": ['write'] }]'
    try {
        // Update the database
        const _id = req.params.id;
        const updates = {
            title: req.body.title,
            description: req.body.description,
            priorityLevel: req.body.priorityLevel,
            status: req.body.status,
            assignedEmployee: req.body.assignedEmployee,
        };
        const result = await Ticket.findByIdAndUpdate(_id, updates, {
            new: true,
        });

        // Respond with 404 if the given ID isn't in the database
        if (!result) {
            res.status(404).json({ message: 'No ticket found with ID ' + _id });
            return;
            /*  #swagger.responses[404] = {
                    description: 'Ticket ID Not Found',
                    schema: { $ref: '#/definitions/TicketIdNotFound' }
            } */
        }

        // Send the updated object
        return res.status(200).json(result);
        /*  #swagger.responses[204] = {
                description: 'Updated'
        } */
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

const deleteTicket = async (req, res) => {
    //  #swagger.tags = ['Tickets']
    //  #swagger.summary = 'Delete a ticket by ID.'
    //  #swagger.description = 'Deletes a specified ticket from the database.'
    /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'The ID of the ticket to be deleted.',
            required: true,
            schema: { $ref: '#/definitions/TicketId' }
    } */
    //  #swagger.security = [{ "BasicAuth": ['write'], "GoogleOAuth": ['write'] }]
    try {
        // Delete the object from the database
        const _id = req.params.id;
        const result = await Ticket.findByIdAndDelete(_id);

        // Respond with 404 if the given ID isn't in the database
        if (!result) {
            res.status(404).json({ message: 'No ticket found with ID ' + _id });
            return;
            /*  #swagger.responses[404] = {
                description: 'Ticket ID Not Found',
                schema: { $ref: '#/definitions/TicketIdNotFound' }
            } */
        }

        // Give a success message
        res.status(200).json({ message: 'Ticket deleted!' });
        /*  #swagger.responses[200] = {
            description: 'Deleted'
            schema: { message: 'Ticket deleted!' }
        } */
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

module.exports = {
    createNewTicket,
    updateTicket,
    getTicketByID,
    deleteTicket,
    getAllTickets,
};
