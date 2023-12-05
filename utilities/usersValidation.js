const { body, validationResult } = require("express-validator");
const validate = {};
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require('../models');
const Users = db.users;

validate.registrationRules = () => {
  return [
    body("firstName")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please, provide a firstName."),

    body("lastName")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please, provide a lastName."),

    body("username")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please, provide a username."),

    body("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("A valid email is required.")
      .custom(async (email) => {
        const emailExists = await Users.findOne({email})
        if(emailExists) {
          throw new Error("Email exists. Please, log in or use different email")
        }
    }),

    body("phoneNumber")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Please provide a phone number."),

    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("The password must be at least 8 characters long."),

    body("jobPosition")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please, provide a jobPosition."),
  ];
};

validate.checkRegisterData = async (req, res, next) => {
  const { firstName, lastName, username, email, password, jobPosition } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json(errors);
    return;
  }
  next();
};

validate.updatingAccountRules = () => {
  return [
    body("firstName")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please, provide a firstName."),

    body("lastName")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please, provide a lastName."),

    body("username")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please, provide a username."),

    body("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("A valid email is required."),

    body("phoneNumber")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Please provide a phone number."),

    body("jobPosition")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please, provide a jobPosition."),
  ];
};

validate.checkUpdateAccountData = async (req, res, next) => {
  const { firstName, lastName, username, email, jobPosition } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json(errors);
    return;
  }
  next();
};

validate.authCheck = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else if (req.cookies.jwt) {
    jwt.verify(
      req.cookies.jwt,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, accountData) {
        if (err) {
          console.log(err);
        }
        res.locals.accountData = accountData;
        next();
      }
    );
  } else {
    return res.send("Sorry, you must first log in before using the system!");
  }
};

module.exports = validate;
