const {body, validationResult} = require('express-validator');
const validate = {}

validate.resolutionRules = () => {
return [
body("resolution")
.trim()
.isLength({min: 10})
.isString()
.withMessage('Please provide a valid resolution description'),

body('ticketStatus')
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


module.exports = validate;