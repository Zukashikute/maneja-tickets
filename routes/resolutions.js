const router = require('express').Router();
const validate = require('../utilities/usersValidation');
const resolutionValidate = require('../utilities/resolutionsValidation');
const resolutionsController = require('../controllers/resolutions');

// Get all resolution tickets
router.get('/', validate.authCheck, resolutionsController.getAllResolutions);

// Get an resolution ticket by ID
router.get('/:id', validate.authCheck, resolutionsController.getResolutionByID);

// Create Resolution
router.post(
    '/',
    validate.authCheck,
    // resolutionValidate.resolutionRules(),
    // resolutionValidate.checkResolutionsData,
    resolutionsController.createNewResolution
);

// Update Resolution using existing ID
router.put(
    '/:id',
    validate.authCheck,
    // resolutionValidate.resolutionRules(),
    // resolutionValidate.checkResolutionsData,
    resolutionsController.updateResolution
);

// Delete a Resolution by ID
router.delete(
    '/:id',
    validate.authCheck,
    resolutionsController.deleteResolution
);

module.exports = router;
