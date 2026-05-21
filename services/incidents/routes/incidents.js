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

/**
 * @swagger
 * tags:
 *   name: Incidents
 *   description: Incident reporting and tracking
 */

/**
 * @swagger
 * /api/incidents:
 *   post:
 *     summary: Declare an incident
 *     tags: [Incidents]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [type, location]
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [accident, works, road_closed, traffic_jam]
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               zoneId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Incident created
 */

/**
 * @swagger
 * /api/incidents:
 *   get:
 *     summary: List incidents
 *     tags: [Incidents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: zoneId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [reported, in_progress, resolved]
 *     responses:
 *       200:
 *         description: List of incidents
 */

/**
 * @swagger
 * /api/incidents/{id}:
 *   get:
 *     summary: Get incident by id
 *     tags: [Incidents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Incident details
 *       404:
 *         description: Incident not found
 */

/**
 * @swagger
 * /api/incidents/{id}/status:
 *   patch:
 *     summary: Update incident status
 *     tags: [Incidents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [reported, in_progress, resolved]
 *     responses:
 *       200:
 *         description: Incident updated
 */

router.use(protect);
router.use(authorize('ADMIN', 'OPERATOR'));

router.post('/', createIncidentValidator, validate, declareIncident);
router.get('/', getIncidents);
router.get('/:id', getIncidentById);
router.patch('/:id/status', updateStatusValidator, validate, updateIncidentStatus);

module.exports = router;
