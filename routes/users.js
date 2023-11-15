const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users');


// Login
router.post('/login', usersController.userLogin);

//Create Account
router.post('/create', usersController.createAccount);

//logout 
router.get('/logout', usersController.userLogout)


//Oauth with Google
router.get('/google', passport.authenticate('google', {
    scope:['profile']
}));

//callback route for Google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
console.log('Success! User logged in.')
res.redirect('/')    
})

module.exports = router;