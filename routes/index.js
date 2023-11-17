const express = require('express');
const router = express.Router();

router.use('/auth', require('./users'));
router.use('/tickets', require('./tickets'));
router.get('/', (req, res) => {
   res.send("testing")
})

module.exports = router;