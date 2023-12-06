const { body, validationResult } = require('express-validator');
const validate = {};

validate.createTicketRules = () => {
    return [
        body('userId')
            .trim()
            .isLength({ min: 1 })
            .isAlphanumeric()
            .withMessage('Please provide a valid user ID'),

        body('title')
            .trim()
            .isLength({ min: 1 })
            .withMessage('Please provide a valid title'),

        body('description')
            .trim()
            .isLength({ min: 1 })
            .withMessage('Please provide a valid description'),

        body('priorityLevel')
            .trim()
            .isString()
            .isLength({ min: 3 })
            .isIn(['Low', 'Medium', 'High'])
            .withMessage('Please choose Low, Medium or High priority level.'),

        body('assignedEmployee')
            .trim()
            .isLength({ min: 1 })
            .isAlphanumeric()
            .withMessage('Please provide a valid assigned Employee ID'),
    ];
};

validate.ticketsUpdateRules = () => {
    return [
        body('title')
            .trim()
            .isLength({ min: 1 })
            .withMessage('Please provide a valid title')
            .optional(),

        body('description')
            .trim()
            .isLength({ min: 1 })
            .withMessage('Please provide a valid description')
            .optional(),

        body('priorityLevel')
            .trim()
            .isString()
            .isLength({ min: 3 })
            .isIn(['Low', 'Medium', 'High'])
            .withMessage('Please choose Low, Medium or High priority level.')
            .optional(),

        body('status')
            .trim()
            .isString()
            .isLength({ min: 3 })
            .isIn(['New', 'In Progress', 'Pending', 'Resolved', 'Closed'])
            .withMessage(
                'Please choose New, In Progress, Pending, Resolved or Closed status.'
            )
            .optional(),

        body('assignedEmployee')
            .trim()
            .isLength({ min: 1 })
            .isAlphanumeric()
            .withMessage('Please provide a valid assigned Employee ID')
            .optional(),
    ];
};

validate.checkTicketsCreateData = async (req, res, next) => {
    const { userId, title, description, priorityLevel, assignedEmployee } =
        req.body;
    let errors = [];
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json(errors);
        return;
    }
    next();
};

validate.checkTicketsUpdateData = async (req, res, next) => {
    const { title, description, priorityLevel, status, assignedEmployee } =
        req.body;
    let errors = [];
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json(errors);
        return;
    }
    next();
};

module.exports = validate;
