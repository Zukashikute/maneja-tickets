const router = require('express').Router();

const resolutionsController = require('../controllers/resolutions');

// Create Resolution
router.post('/resolutions', resolutionsController.createNewResolution);

// Update Resolution using existing ID
router.put('/resolutions/:id', resolutionsController.updateResolution);

// Delete a Resolution by ID
router.delete('/delete-resolution/:id', resolutionsController.deleteResolution);

module.exports = router;