const express = require("express");
const router = express.Router();
const passport = require("passport");
const usersController = require("../controllers/google");
const validate = require('../utilities/usersValidation');


//Oauth with Google
router.get(
    //  #swagger.tags = ['Google Users']
    //  #swagger.summary = 'Login with a Google Account.'
    //  #swagger.description = 'Login with an existing user account, granting access to restricted API routes and endpoints for 1 hour or until logged out.'
    "/",
    passport.authenticate("google", {
      scope: ["profile"],
    })
  );
  
  //callback route for Google to redirect to
  router.get(
    //  #swagger.tags = ['Google Users']
    //  #swagger.summary = 'Callback route for Google.'
    //  #swagger.description = 'After logging in with a Google account, this is the endpoint Google redirects to.'
    "/redirect",
    passport.authenticate("google"),
    (req, res) => {
      console.log("Success! User logged in.");
      res.redirect("/");
    }
  );
  
  //Update a username in the Google_users collection
  router.put("/update/:id", validate.authCheck, usersController.GoogleUserUpdate);
  
  //Delete a username in the Google_users collection
  router.delete("/delete/:id", validate.authCheck, usersController.GoogleUserDelete);
  
  
  module.exports = router;
  