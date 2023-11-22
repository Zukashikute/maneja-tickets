const {body, validationResult} = require('express-validator');
const validate = {}

validate.ticketsUpdateRules = () => {
return [
body("ticketTitle")
.trim()
.isLength({min: 1})
.isString()
.withMessage('Please provide a valid ticket title'),

body('ticketDescription')
.trim()
.isLength({min: 5})
.isString()
.withMessage('Please provide a valid ticket description'),

body('priorityLevel')
.trim()
.isString()
.isLength({min: 3})
.isIn(['Low', 'Medium', 'High'])
.withMessage('Please choose Low, Medium or High priority level.')


]
}

validate.checkTicketsUpdateData = async (req, res, next) => {
const { ticketTitle, ticketDescription, priorityLevel } = req.body
let errors = []
errors = validationResult(req)
if(!errors.isEmpty()) {
res.json(errors)
return    
} 
next()   
}

module.exports = validate;