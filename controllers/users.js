const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Users = db.users;

const createAccount = async (req, res) => {
    //  #swagger.tags = ['Users']
    //  #swagger.summary = 'Create a new user account.'
    //  #swagger.description = 'Creates and inserts a new user account into the database.'
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'The user object to be inserted.',
            required: true,
            schema: { $ref: '#/definitions/UserInput' }
    } */
    let hashedPassword;
    try {
        // Regular password and cost (salt is generated automatically)
        hashedPassword = await bcrypt.hashSync(req.body.password, 10);
    } catch (error) {
        console.log(error);
    }
    const users = new Users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: hashedPassword,
        jobPosition: req.body.jobPosition,
    });
    await users
        .save()
        .then((data) => {
            console.log(data);
            res.status(201).send(data);
            /*  #swagger.responses[201] = {
                    description: 'Created'
            } */
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating user.',
            });
        });
};

const userLogin = async (req, res) => {
    //  #swagger.tags = ['Users']
    //  #swagger.summary = 'Login with an existing account.'
    /*  #swagger.parameters['body'] = { 
            in: 'body', 
            description: 'The email and password of the user to log in with.',
            required: true, 
            schema: { $ref: '#/definitions/UserLogin' }
    } */
    //  #swagger.description = 'Login with an existing user account, granting access to restricted API routes and endpoints for 1 hour or until logged out.'
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('All fields are mandatory!');
        /*  #swagger.responses[400] = {
                description: 'Missing Field',
        } */
    }
    const user = await Users.findOne({ email });
    try {
        if (user && (await bcrypt.compare(password, user.password))) {
            delete user.password;
            const accessToken = jwt.sign(
                { user },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: 3600 * 1000 }
            );
            res.cookie('jwt', accessToken, {
                httpOnly: true,
                maxAge: 3600 * 1000,
            });
            console.log(`User ${email} logged in!`);
            return res.redirect('/');
        } else {
            res.send('Email or password is not valid');
        }
    } catch (error) {
        res.status(401);
        throw new Error(error);
        /*  #swagger.responses[401] = {
                description: 'Server Error',
        } */
    }
};

const userLogout = async (req, res) => {
    //  #swagger.tags = ['Users']
    //  #swagger.summary = 'Log out of account.'
    //  #swagger.description = 'Log out of a currently logged-in account. Redirects to base URL.'
    res.clearCookie('jwt');
    console.log('Success! User logged out.');
    return res.redirect('/');
};

const userUpdate = async (req, res) => {
    //  #swagger.tags = ['Users']
    //  #swagger.summary = 'Update a user.'
    //  #swagger.description = 'Updates an existing user in the database, given a list of any number of fields and a new values for each.
    /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'The ID of the user to be updated.',
            required: true,
            schema: { $ref: '#/definitions/UserId' }
    } */
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Any number of fields of the user object to be updated, along with their new values.',
            required: true,
            schema: { $ref: '#/definitions/UserUpdateInput' }
    } */
    //  #swagger.security = [{ "BasicAuth": ['write'], "GoogleOAuth": ['write'] }]'
    try {
        const _id = req.params.id;
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            jobPosition: req.body.jobPosition,
        };
        const result = await Users.findByIdAndUpdate(_id, user, { new: true });
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
        /*  #swagger.responses[200] = {
                description: 'Updated'
        } */
    } catch (error) {
        return res.status(500).json(error);
    }
};

const userDelete = async (req, res) => {
    //  #swagger.tags = ['Users']
    //  #swagger.summary = 'Delete a user by ID.'
    //  #swagger.description = 'Deletes a specified user from the database.'
    /*  #swagger.parameters['id'] = {
            in: 'path',
            description: 'The ID of the user to be deleted.',
            required: true,
            schema: { $ref: '#/definitions/UserId' }
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
        const result = await Users.deleteOne({ _id: _id }).then((data) => {
            if (data.deletedCount > 0) {
                res.status(200).send();
                /*  #swagger.responses[200] = {
                    description: 'Deleted'
                } */
            } else {
                res.status(500).json(
                    data.error ||
                        'Sorry, some error ocurred while deleting the user account.'
                );
            }
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    createAccount,
    userLogin,
    userLogout,
    userUpdate,
    userDelete,
};
