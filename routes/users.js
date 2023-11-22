const express = require('express');
const router = express.Router();
const passport = require('passport');
const validate = require('../utilities/usersValidation');
const usersController = require('../controllers/users');

// Login
router.post('/login', usersController.userLogin);

//Create Account
router.post(
    '/create',
    validate.registrationRules(),
    validate.checkRegisterData,
    usersController.createAccount
);

//logout
router.get(
    '/logout',
    validate.authCheck,
    usersController.userLogout,
    function (req, res, next) {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    }
);

//Oauth with Google
router.get(
    //  #swagger.tags = ['Google Users']
    //  #swagger.summary = 'Login with a Google Account.'
    //  #swagger.description = 'Login with an existing user account, granting access to restricted API routes and endpoints for 1 hour or until logged out.'
    '/google',
    passport.authenticate('google', {
        scope: ['profile'],
    })
);

//callback route for Google to redirect to
router.get(
    //  #swagger.tags = ['Google Users']
    //  #swagger.summary = 'Callback route for Google.'
    //  #swagger.description = 'After logging in with a Google account, this is the endpoint Google redirects to.'
    '/google/redirect',
    passport.authenticate('google'),
    (req, res) => {
        console.log('Success! User logged in.');
        res.redirect('/');
    }
);

module.exports = router;
