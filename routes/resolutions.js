const router = require('express').Router();
const resolutionController = require('../controllers/resolutions');

// Get all resolution tickets
router.get('/', validate.authCheck, resolutionController.getAllResolutions);

// Get an resolution ticket by ID
router.get('/:id', validate.authCheck, resolutionController.getResolutionByID);

module.exports = router;