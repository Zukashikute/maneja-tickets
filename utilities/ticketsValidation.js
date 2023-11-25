const { body, validationResult } = require('express-validator');
const validate = {};

validate.createTicketRules = () => {
  return [
    body('username')
      .trim()
      .isLength({ min: 3 })
      .withMessage('Please provide a valid username'),

    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('A valid email is required'),

    body('phoneNumber')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Please provide a phone number.'),

    body('jobPosition')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Please provide a valid job position.'),

    body('ticketTitle')
      .trim()
      .isLength({ min: 1 })
      .isString()
      .withMessage('Please provide a valid ticket title'),

    body('ticketDescription')
      .trim()
      .isLength({ min: 5 })
      .isString()
      .withMessage('Please provide a valid ticket description'),
  ];
};

validate.ticketsUpdateRules = () => {
  return [
    body('ticketTitle')
      .trim()
      .isLength({ min: 1 })
      .isString()
      .withMessage('Please provide a valid ticket title'),

    body('ticketDescription')
      .trim()
      .isLength({ min: 5 })
      .isString()
      .withMessage('Please provide a valid ticket description'),

    body('priorityLevel')
      .trim()
      .isString()
      .isLength({ min: 3 })
      .isIn(['Low', 'Medium', 'High'])
      .withMessage('Please choose Low, Medium or High priority level.'),
  ];
};

validate.checkTicketsCreateData = async (req, res, next) => {
    const { username, email, phoneNumber, jobPosition, ticketTitle, ticketDescription, priorityLevel } = req.body;
    let errors = [];
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors);
      return;
    }
    next();
  };

validate.checkTicketsUpdateData = async (req, res, next) => {
  const { ticketTitle, ticketDescription, priorityLevel } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json(errors);
    return;
  }
  next();
};

module.exports = validate;
