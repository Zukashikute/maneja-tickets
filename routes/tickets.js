const router = require('express').Router();
const validate = require('../utilities/usersValidation');
const ticketsValidate = require('../utilities/ticketsValidation');
const ticketsController = require('../controllers/tickets');

// Create Ticket
router.post(
    '/',
    validate.authCheck,
    // ticketsValidate.createTicketRules(),
    // ticketsValidate.checkTicketsCreateData,
    ticketsController.createNewTicket
);

// Update Ticket
router.put(
    '/:id',
    validate.authCheck,
    // ticketsValidate.ticketsUpdateRules(),
    // ticketsValidate.checkTicketsUpdateData,
    ticketsController.updateTicket
);

// Get an specific ticket by ID
router.get('/:id', validate.authCheck, ticketsController.getTicketByID);

// Get all tickets
router.get('/', validate.authCheck, ticketsController.getAllTickets);

// Delete a ticket by ID
router.delete('/:id', validate.authCheck, ticketsController.deleteTicket);

module.exports = router;
