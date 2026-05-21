const express = require('express');
const router = express.Router();
const {
  createVehicle,
  getVehicles,
  getVehicleById,
  addVehiclePosition,
  getVehiclePositions,
} = require('../controllers/vehicleController');
const { protect, authorize } = require('../../../shared/middleware/authMiddleware');
const { vehicleValidator, positionValidator } = require('../validators/vehicleValidator');
const validate = require('../../../shared/middleware/validateMiddleware');

router.use(protect);
router.use(authorize('ADMIN', 'OPERATOR'));

router.post('/', vehicleValidator, validate, createVehicle);
router.get('/', getVehicles);
router.get('/:id', getVehicleById);
router.post('/:id/positions', positionValidator, validate, addVehiclePosition);
router.get('/:id/positions', getVehiclePositions);

module.exports = router;
