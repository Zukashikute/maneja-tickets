const db = require('../models');
require('dotenv').config();
const google_users = db.googleUsers;

const GoogleUserUpdate = async (req, res) => {
    //  #swagger.tags = ['Google Users']
    //  #swagger.summary = 'Update a username.'
    //  #swagger.description = 'Updates an existing username in the database.'
    /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'The ID of the user to be updated.',
            required: true,
            schema: { $ref: '#/definitions/GoogleUserId' }
    } */
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'An object with the username field and the new value.',
            required: true,
            schema: { $ref: '#/definitions/GoogleUserUpdateInput' }
    } */
    //  #swagger.security = [{ "BasicAuth": ['write'], "GoogleOAuth": ['write'] }]'
    try {
        const _id = req.params.id;
        const updates = {
            username: req.body.username,
        };
        const result = await google_users.findByIdAndUpdate(_id, updates, {
            new: true,
        });
        if (!result) {
            return res
                .status(404)
                .send({ message: 'No user found with ID ' + _id });
            /*  #swagger.responses[404] = {
                    description: 'User ID Not Found',
                    schema: { $ref: '#/definitions/UserIdNotFound' }
            } */
        }
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

const GoogleUserDelete = async (req, res) => {
    //  #swagger.tags = ['Google Users']
    //  #swagger.summary = 'Delete a user by username.'
    //  #swagger.description = 'Deletes a specified user from the database in the Google Collection.'
    /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'The username of the user to be deleted.',
            required: true,
            schema: { $ref: '#/definitions/GoogleUserId' }
    } */
    //  #swagger.security = [{ "BasicAuth": ['write'], "GoogleOAuth": ['write'] }]
    try {
        const _id = req.params.id;
        if (!_id) {
            return res
                .status(404)
                .send({ message: 'No user found with ID ' + _id });
            /*  #swagger.responses[404] = {
                    description: 'User ID Not Found',
                    schema: { $ref: '#/definitions/UserIdNotFound' }
                } */
        }
        const result = await google_users
            .deleteOne({ _id: _id })
            .then((data) => {
                if (data.deletedCount > 0) {
                    res.status(200).send({ message: 'User account deleted.' });
                } else {
                    res.status(500).json(
                        data.error ||
                            'Sorry, some error ocurred while deleting the user account.'
                    );
                }
            });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

module.exports = {
    GoogleUserDelete,
    GoogleUserUpdate,
};
