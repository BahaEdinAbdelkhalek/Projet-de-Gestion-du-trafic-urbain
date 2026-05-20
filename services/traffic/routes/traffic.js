const express = require('express');
const router = express.Router();
const {
  createZone,
  getZones,
  getZoneById,
  addMeasurement,
  getMeasurements,
} = require('../controllers/trafficController');
const { protect, authorize } = require('../../../shared/middleware/authMiddleware');
const { zoneValidator, measurementValidator } = require('../validators/trafficValidator');
const validate = require('../../../shared/middleware/validateMiddleware');

router.use(protect);
router.use(authorize('ADMIN', 'OPERATOR'));

router.post('/zones', zoneValidator, validate, createZone);
router.get('/zones', getZones);
router.get('/zones/:id', getZoneById);
router.post('/zones/:id/measurements', measurementValidator, validate, addMeasurement);
router.get('/zones/:id/measurements', getMeasurements);

module.exports = router;
