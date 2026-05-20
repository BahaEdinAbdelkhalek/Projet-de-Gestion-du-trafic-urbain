const express = require('express');
const router = express.Router();
const {
  declareIncident,
  getIncidents,
  getIncidentById,
  updateIncidentStatus,
} = require('../controllers/incidentController');
const { protect, authorize } = require('../../../shared/middleware/authMiddleware');
const { createIncidentValidator, updateStatusValidator } = require('../validators/incidentValidator');
const validate = require('../../../shared/middleware/validateMiddleware');

router.use(protect);
router.use(authorize('ADMIN', 'OPERATOR'));

router.post('/', createIncidentValidator, validate, declareIncident);
router.get('/', getIncidents);
router.get('/:id', getIncidentById);
router.patch('/:id/status', updateStatusValidator, validate, updateIncidentStatus);

module.exports = router;
