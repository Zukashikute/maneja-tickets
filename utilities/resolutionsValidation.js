const { body, validationResult } = require('express-validator');
const validate = {}

validate.resolutionRules = () => {
   return [
      body("resolution")
         .trim()
         .isLength({ min: 10 })
         .isString()
         .withMessage('Please provide a valid resolution description'),

      body('resolutionStatus')
         .trim()
         .notEmpty()
         .isString()
         .isIn(['Open', 'In Progress', 'Hold', 'Resolved', 'Closed', 'Reopened', 'Canceled'])
         .withMessage('Please choose Open, In Progress, Hold, Resolved, Closed, Reopened or Canceled'),

      body('employeeAssigned')
         .trim()
         .isString()
         .notEmpty()
         .withMessage('Please provide an Employee Name'),
   ]
}

validate.createResolutionRules = () => {
   return [
      body("ticketId")
         .trim()
         .isString()
         .notEmpty()
         .withMessage('Please provide a valid resolution id'),

      body("resolvedByEmployee")
         .trim()
         .isString()
         .notEmpty()
         .withMessage('Please provide a valid employee id'),
   ]
}

validate.updateResolutionRules = () => {
   return [
      body("ticketId")
         .trim()
         .isString()
         .notEmpty()
         .withMessage('Please provide a valid resolution id'),

      body("resolvedByEmployee")
         .trim()
         .isString()
         .notEmpty()
         .withMessage('Please provide a valid employee id'),
   ]
}

validate.checkResolutionCreateData = async (req, res, next) => {
   const { ticketId, resolvedByEmployee } = req.body;
   let errors = [];
   errors = validationResult(req);
   if (!errors.isEmpty()) {
      res.json(errors);
      return;
   }
   next();
};

validate.checkResolutionUpdateData = async (req, res, next) => {
   const { ticketId, resolvedByEmployee } = req.body;
   let errors = [];
   errors = validationResult(req);
   if (!errors.isEmpty()) {
      res.json(errors);
      return;
   }
   next();
};


module.exports = validate;