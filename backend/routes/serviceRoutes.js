const express = require('express');
const { getAllServices, getServiceById, createService, updateService, deleteService } = require('../controllers/serviceController');
const router = express.Router();

// Public routes
router.get('/services', getAllServices);
router.get('/services/:id', getServiceById);

// Admin routes
router.post('/services', createService);
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);

module.exports = router;
