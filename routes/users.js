const express = require("express");
const router = express.Router();
const passport = require("passport");
const validate = require("../utilities/usersValidation");
const usersController = require("../controllers/users");

// Login
router.post("/login", usersController.userLogin);

//Create Account
router.post(
  "/create",
  validate.registrationRules(),
  validate.checkRegisterData,
  usersController.createAccount
);

//Update account
router.put(
  "/account/:id",
  validate.authCheck,
  validate.updatingAccountRules(),
  validate.checkUpdateAccountData,
  usersController.userUpdate
);

//Delete account
router.delete("/account/:id", validate.authCheck, usersController.userDelete);

//logout
router.get(
  "/logout",
  validate.authCheck,
  function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  },
  usersController.userLogout
);

module.exports = router;
