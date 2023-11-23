const db = require('../models');
require('dotenv').config();
const Resolution = db.resolution;


const createNewResolution = async (req, res) => {
    //  #swagger.tags = ['Resolution']
    //  #swagger.summary = 'Create a new resolution.'
    //  #swagger.description = 'Creates and inserts a new ticket resoluition into the database using a list of fields and values.'
    try {
        const newResolution = new Resolution({
            // ticketStatus: req.body.ticketStatus,
            resolution: req.body.resolution,
            employeeAssigned: req.body.employeeAssigned,
        });

        await newResolution.save().then((data) => {
            console.log(data);
            res.status(201).send(data);
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateResolution = async (req, res) => {
    //  #swagger.tags = ['Resolution']
    //  #swagger.summary = 'Update a resolution by ID.'
    //  #swagger.description = 'Updates an existing resolution in the database, given a list of any number of fields and a new values for each.'
    try {
        const _id = req.params.id;
        const resolution = {
            resolution: req.body.resolution,
            employeeAssigned: req.body.employeeAssigned,
            ticketStatus: req.body.ticketStatus,
        };
        const result = await Resolution.findByIdAndUpdate(_id, resolution, { new: true});
        if(!result){
        return res.status(404).send({message: 'No Resolution found with id ' + _id})  
        }    
       return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
};

const deleteResolution = async (req, res) => {
    //  #swagger.tags = ['Resolution']
    //  #swagger.summary = 'Delete a resolution by ID.'
    //  #swagger.description = 'Deletes a specified resolution from the database.'
    try {
        const _id = req.params.id;
        if (!_id) {
            res.status(400).send({ message: 'Invalid ticket ID Supplied' });
            return;
        }
        const result = await Resolution.deleteOne({ _id: _id }).then(
            (data) => {
              if (data.deletedCount > 0) {
                res.status(201).send();
            } else {
                res.status(500).json(
                    data.error ||
                        'Some error occurred while deleting the resolution.'
                );
            }
            }
        );    
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { createNewResolution,updateResolution,deleteResolution};
