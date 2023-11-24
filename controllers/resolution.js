const { response } = require('express');
const db = require('../models');
require('dotenv').config();
const Resolution = db.resolution;

const getAllResolutions = () => {
    // #swagger.tags = ['Resolution']
    // #swagger.summary = 'Get all resolution tickets'
    // #swagger.description = 'Get all resolution tickets data from the database'.
    try {
        Resolution.find({})
            .then((lists) => {
                res.setHeader('Content-Type', 'application/json')
                res.status(200).json(lists);
            })
    } catch (err) {
        res.status(500).json(err)
    }
}

const getResolutionByID = async (req, res) => {
    //  #swagger.tags = ['Resolution']
    //  #swagger.summary = 'Get a resolution ticket by ID.'
    //  #swagger.description = 'Retrieve a specified resolution ticket from the database.'
    /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'The resolution ticket object to be inserted.',
            required: true,
            schema: { $ref: '#/definitions/ResolutionId' }
    } */
    //  #swagger.security = [{ "BasicAuth": ['read'], "GoogleOAuth": ['read'] }]
    try {
        const ticketId = new ObjectId(req.params.id);
        if (!ticketId) {
            res.status(400).send({ message: 'Invalid resolution ticket ID Supplied' });
            return;
            /*  #swagger.responses[400] = {
                    description: 'Invalid Resolution Ticket ID',
                    schema: { message: 'Invalid resolution ticket ID Supplied' }
            } */
        }
        const result = await Resolution.find({ _id: ticketId }).then((data) => {
            res.status(201).send(data);
        });

        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
            /*  #swagger.responses[200] = {
                    description: 'Retrieved',
                    schema: { $ref: '#/definitions/TicketOutput' }
            } */
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { getAllResolutions, getResolutionByID };