const router = require('express').Router();
const validate = require('../utilities/usersValidation');
const resolutionValidate = require('../utilities/ticketsValidation');
const resolutionsController = require('../controllers/resolutions');

// Create Resolution
router.post('/resolutions', validate.authCheck, resolutionValidate.resolutionRules , resolutionsController.createNewResolution);

// Update Resolution using existing ID
router.put('/resolutions/:id', validate.authCheck, resolutionValidate.resolutionRules, resolutionsController.updateResolution);

// Delete a Resolution by ID
router.delete('/delete-resolution/:id', validate.authCheck, resolutionsController.deleteResolution);

module.exports = router;