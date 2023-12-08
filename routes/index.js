const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/google', require('./google'));
router.use('/auth', require('./users'));
router.use('/tickets', require('./tickets'));
router.use('/resolutions', require('./resolutions'));
router.get('/', (req, res) => {
    res.send(
        'Hello! This is the Maneja Tickets System API. Access the API documentation: https://maneja-tickets.onrender.com/api-docs'
    );
    // #swagger.ignore = true
});

module.exports = router;
