
const router = require('express').Router();
const validate = require('../utilities/usersValidation');
const ticketsController = require('../controllers/tickets');

// Create Ticket
router.post('/create-ticket', validate.authCheck, ticketsController.createNewTicket);

// Update Ticket
router.put('/update-ticket/:id', validate.authCheck, ticketsController.updateTicket);

// Get an specific ticket by ID
router.get('/:id', validate.authCheck, ticketsController.getTicketByID);

// Delete a ticket by ID
router.delete('/delete-ticket/:id', validate.authCheck, ticketsController.deleteTicket);

module.exports = router;