const db = require('../models');
require('dotenv').config();
const Ticket = db.tickets;

const getAllTickets = async (req, res) => {
    // #swagger.tags = ['Tickets']
    // #swagger.summary = 'Get all tickets'
    // #swagger.description = 'Get all tickets data from the database'.
    try {
        Ticket.find({}).then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (err) {
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
            username: req.body.username,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            jobPosition: req.body.jobPosition,
            ticketTitle: req.body.ticketTitle,
            ticketDescription: req.body.ticketDescription,
        });

        await newTicket.save().then((data) => {
            console.log(data);
            res.status(201).send(data);
        });
    } catch (err) {
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
            schema: { $ref: '#/definitions/TicketInput' }
    } */
    //  #swagger.security = [{ "BasicAuth": ['write'], "GoogleOAuth": ['write'] }]'
    try {
        const _id = req.params.id;
        const ticket = {
            ticketTitle: req.body.ticketTitle,
            ticketDescription: req.body.ticketDescription,
            priorityLevel: req.body.priorityLevel,
        };
        const result = await Ticket.findByIdAndUpdate(_id, ticket, {
            new: true,
        });
        if (!result) {
            return res
                .status(404)
                .send({ message: 'No ticket found with id ' + _id });
        }
        return res.status(200).json(result);
        /*  #swagger.responses[204] = {
                description: 'Updated'
        } */
    } catch (error) {
        return res.status(500).json(error);
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
        const _id = req.params.id;
        if (!_id) {
            res.status(400).send({ message: 'Invalid ticket ID Supplied' });
            return;
            /*  #swagger.responses[400] = {
                    description: 'Invalid Ticket ID',
                    schema: { message: 'Invalid ticket ID Supplied' }
            } */
        }
        const result = await Ticket.find({ _id: _id }).then((data) => {
            res.status(201).send(data);
        });
        /*  #swagger.responses[200] = {
                    description: 'Retrieved',
                    schema: { $ref: '#/definitions/TicketOutput' }
            } */
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteTicket = async (req, res) => {
    //  #swagger.tags = ['Tickets']
    //  #swagger.summary = 'Delete a ticket by ID.'
    //  #swagger.description = 'Deletes a specified ticket from the database.'
    try {
        const _id = req.params.id;
        if (!_id) {
            res.status(400).send({ message: 'Invalid ticket ID Supplied' });
            return;
        }
        const result = await Ticket.deleteOne({ _id: _id }).then((data) => {
            if (data.deletedCount > 0) {
                res.status(201).send();
            } else {
                res.status(500).json(
                    data.error ||
                        'Some error occurred while deleting the ticket.'
                );
            }
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    createNewTicket,
    updateTicket,
    getTicketByID,
    deleteTicket,
    getAllTickets,
};
