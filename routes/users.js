const express = require('express');
const router = express.Router();
const passport = require('passport');
const validate = require('../utilities/usersValidation');
const usersController = require('../controllers/users');


// Login
router.post('/login', usersController.userLogin);

//Create Account
router.post('/create', validate.registrationRules(), validate.checkRegisterData, usersController.createAccount);

//logout 
router.get('/logout', validate.authCheck, usersController.userLogout, function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  },)


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