const router = require('express').Router();

const ticketsController = require('../controllers/tickets');

// Create Ticket
router.post('/create-ticket', ticketsController. createNewTicket);

// Update Ticket
router.put('/update-ticket', ticketsController.updateTicket);

// Get an specific ticket by ID
router.get('/:id', ticketsController. getTicketByID);

// Delete a ticket by ID
router.delete('/delete-ticket', ticketsController. deleteTicket);



module.exports = router;