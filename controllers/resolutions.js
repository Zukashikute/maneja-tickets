const db = require('../models');
require('dotenv').config();
const Resolution = db.resolution;

const getAllResolutions = async (req, res) => {
    // #swagger.tags = ['Resolution']
    // #swagger.summary = 'Get all ticket resolutions.'
    // #swagger.description = 'Get all resolution tickets data from the database'.
    // #swagger.security = [{ "BasicAuth": ['read'], "GoogleOAuth": ['read'] }]
    try {
        const result = await Resolution.find();
        res.status(200).json(result);
        /* #swagger.responses[200] = {
                description: 'Retrieved',
                schema: { $ref: '#/definitions/ResolutionOutputArray' }
        } */
    } catch (err) {
        res.status(500).json(err);
    }
};

const getResolutionByID = async (req, res) => {
    //  #swagger.tags = ['Resolution']
    //  #swagger.summary = 'Get a ticket resolution by ID.'
    //  #swagger.description = 'Retrieve a specified ticket resolution from the database.'
    /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'The resolution object to be inserted.',
            required: true,
            schema: { $ref: '#/definitions/ResolutionId' }
    } */
    //  #swagger.security = [{ "BasicAuth": ['read'], "GoogleOAuth": ['read'] }]
    try {
        const _id = req.params.id;
        const result = await Resolution.findById(_id);

        if (!result) {
            res.status(404).json({
                message: 'No resolution found with ID ' + _id,
            });
            return;
            /*  #swagger.responses[404] = {
                    description: 'Resolution ID Not Found',
                    schema: { $ref: '#/definitions/ResolutionIdNotFound' }
            } */
        }

        // Send the returned data
        res.status(200).json(result);
        /*  #swagger.responses[200] = {
                description: 'Retrieved',
                schema: { $ref: '#/definitions/ResolutionOutput' }
        } */
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const createNewResolution = async (req, res) => {
    //  #swagger.tags = ['Resolution']
    //  #swagger.summary = 'Create a new resolution.'
    //  #swagger.description = 'Creates and inserts a new resolution into the database using a list of fields and values.'
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'The resolution object to be inserted.',
            required: true,
            schema: { $ref: '#/definitions/ResolutionInput' }
    } */
    //  #swagger.security = [{ "BasicAuth": ['write'], "GoogleOAuth": ['write'] }]
    try {
        const newResolution = new Resolution({
            ticketId: req.body.ticketId,
            description: req.body.description,
            resolvedByEmployee: req.body.resolvedByEmployee,
        });
        const result = await newResolution.save();
        res.status(201).json(result);
        /*  #swagger.responses[201] = {
                description: 'Created',
                schema: { $ref: '#/definitions/ResolutionOutput' }
        } */
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateResolution = async (req, res) => {
    //  #swagger.tags = ['Resolution']
    //  #swagger.summary = 'Update a resolution by ID.'
    //  #swagger.description = 'Updates an existing resolution in the database, given a list of any number of fields and a new values for each.'
    /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'The ID of the resolution to be updated.',
            required: true,
            schema: { $ref: '#/definitions/ResolutionId' }
    } */
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Any number of fields of the resolution object to be updated, along with their new values.',
            required: true,
            schema: { $ref: '#/definitions/ResolutionInput' }
    } */
    //  #swagger.security = [{ "BasicAuth": ['write'], "GoogleOAuth": ['write'] }]'
    try {
        // Update the database
        const _id = req.params.id;
        const resolution = {
            description: req.body.description,
            resolvedByEmployee: req.body.resolvedByEmployee,
        };
        const result = await Resolution.findByIdAndUpdate(_id, resolution, {
            new: true,
        });

        // Respond with 404 if the given ID isn't in the database
        if (!result) {
            res.status(404).json({
                message: 'No resolution found with ID ' + _id,
            });
            return;
            /*  #swagger.responses[404] = {
                    description: 'Resolution ID Not Found',
                    schema: { $ref: '#/definitions/ResolutionIdNotFound' }
            } */
        }

        // Send the updated object
        return res.status(200).json(result);
        /*  #swagger.responses[204] = {
                description: 'Updated'
        } */
    } catch (error) {
        return res.status(500).json(error);
    }
};

const deleteResolution = async (req, res) => {
    //  #swagger.tags = ['Resolution']
    //  #swagger.summary = 'Delete a resolution by ID.'
    //  #swagger.description = 'Deletes a specified resolution from the database.'
    /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'The resolution object to be deleted.',
            required: true,
            schema: { $ref: '#/definitions/ResolutionId' }
    } */
    //  #swagger.security = [{ "BasicAuth": ['write'], "GoogleOAuth": ['write'] }]
    try {
        // Delete the object from the database
        const _id = req.params.id;
        const result = await Resolution.findByIdAndDelete(_id);

        // Respond with 404 if the given ID isn't in the database
        if (!result) {
            res.status(404).json({
                message: 'No resolution found with ID ' + _id,
            });
            return;
            /*  #swagger.responses[404] = {
                description: 'Resolution ID Not Found',
                schema: { message: 'Invalid ticket ID Supplied' }
            } */
        }

        // Give a success message
        res.status(200).json({ message: 'Resolution deleted!' });
        /*  #swagger.responses[200] = {
            description: 'Deleted'
            schema: { message: 'Resolution deleted!' }
        } */
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    getAllResolutions,
    getResolutionByID,
    createNewResolution,
    updateResolution,
    deleteResolution,
};
