const { response } = require('express');
const db = require('../models');
require('dotenv').config();
const Ticket = db.tickets;

const createNewTicket = async (req, res) => {
    //  #swagger.tags = ['Tickets']
    //  #swagger.summary = 'Create a new ticket.'
    //  #swagger.description = 'Creates and inserts a new ticket into the database using a list of fields and values.'
    try {
        const newTicket = new Ticket({
            username: req.body.username,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            jobPosition: req.body.jobPosition,
            ticketTitle: req.body.ticketTitle,
            ticketDescription: req.body.ticketDescription,
            dateAndTime: req.body.dateAndTime,
            priorityLevel: req.body.priorityLevel,
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
    //  #swagger.description = 'Updates an existing ticket in the database, given a list of any number of fields and a new values for each.'
    try {
        const ticketId = new ObjectId(req.params.id);
        const ticket = {
            username: req.body.username,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            jobPosition: req.body.jobPosition,
            ticketTitle: req.body.ticketTitle,
            ticketDescription: req.body.ticketDescription,
            dateAndTime: req.body.dateAndTime,
            priorityLevel: req.body.priorityLevel,
        };
        if (!ticketId) {
            res.status(400).send({ message: 'Invalid ticket ID Supplied' });
            return;
        }
        const result = await ticket.save().then((data) => {
            console.log(data);
            res.status(201).send(data);
        });

        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(
                result.error || 'Some error occurred while updating the recipe.'
            );
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const getTicketByID = async (req, res) => {
    //  #swagger.tags = ['Tickets']
    //  #swagger.summary = 'Get a ticket by ID.'
    //  #swagger.description = 'Retrieve a specified ticket from the database.'
    try {
        const ticketId = new ObjectId(req.params.id);
        if (!ticketId) {
            res.status(400).send({ message: 'Invalid ticket ID Supplied' });
            return;
        }
        const result = await Ticket.find({ _id: ticketId }).then((data) => {
            res.status(201).send(data);
        });

        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteTicket = async (req, res) => {
    //  #swagger.tags = ['Tickets']
    //  #swagger.summary = 'Delete a ticket by ID.'
    //  #swagger.description = 'Deletes a specified ticket from the database.'
    try {
        const ticketId = new ObjectId(req.params.id);
        if (!ticketId) {
            res.status(400).send({ message: 'Invalid ticket ID Supplied' });
            return;
        }
        const result = await Ticket.deleteOne({ _id: ticketId }).then(
            (data) => {
                res.status(201).send(data);
            }
        );
        if (result.deletedCount > 0) {
            res.status(200).send();
        } else {
            res.status(500).json(
                result.error ||
                    'Some error occurred while deleting the contact.'
            );
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { createNewTicket, updateTicket, getTicketByID, deleteTicket };
