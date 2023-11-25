const router = require('express').Router();
const validate = require('../utilities/usersValidation');
const resolutionValidate = require('../utilities/resolutionsValidation');
const resolutionsController = require('../controllers/resolutions');

// Get all resolution tickets
router.get('/', validate.authCheck, resolutionsController.getAllResolutions);

// Get an resolution ticket by ID
router.get('/:id', validate.authCheck, resolutionsController.getResolutionByID);

// Create Resolution
router.post('/resolutions', validate.authCheck, resolutionValidate.resolutionRules(), resolutionsController.createNewResolution);

// Update Resolution using existing ID
router.put('/resolutions/:id', validate.authCheck, resolutionValidate.resolutionRules(), resolutionsController.updateResolution);

// Delete a Resolution by ID
router.delete('/delete-resolution/:id', validate.authCheck, resolutionValidate.resolutionRules(), resolutionsController.deleteResolution);

module.exports = router;