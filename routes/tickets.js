const express = require('express');
const router = express.Router();

router.get('/tickets');
router.post('/tickets');
router.put('/tickets/:id');
router.delete('/tickets/:id');

module.exports = router;