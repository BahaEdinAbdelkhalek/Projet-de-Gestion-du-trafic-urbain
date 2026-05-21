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

/**
 * @swagger
 * tags:
 *   name: Traffic
 *   description: Traffic zones and measurements
 */

/**
 * @swagger
 * /api/traffic/zones:
 *   post:
 *     summary: Create a traffic zone
 *     tags: [Traffic]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               coordinates:
 *                 type: string
 *     responses:
 *       201:
 *         description: Zone created
 */

/**
 * @swagger
 * /api/traffic/zones:
 *   get:
 *     summary: List traffic zones
 *     tags: [Traffic]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of zones
 */

/**
 * @swagger
 * /api/traffic/zones/{id}:
 *   get:
 *     summary: Get traffic zone by id
 *     tags: [Traffic]
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
 *         description: Zone details
 *       404:
 *         description: Zone not found
 */

/**
 * @swagger
 * /api/traffic/zones/{id}/measurements:
 *   post:
 *     summary: Add traffic measurement
 *     tags: [Traffic]
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
 *             required: [vehicleCount, speedAverage, density]
 *             properties:
 *               vehicleCount:
 *                 type: integer
 *               speedAverage:
 *                 type: number
 *               density:
 *                 type: number
 *     responses:
 *       201:
 *         description: Measurement created
 */

/**
 * @swagger
 * /api/traffic/zones/{id}/measurements:
 *   get:
 *     summary: List traffic measurements
 *     tags: [Traffic]
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
 *         description: List of measurements
 */

router.use(protect);
router.use(authorize('ADMIN', 'OPERATOR'));

router.post('/zones', zoneValidator, validate, createZone);
router.get('/zones', getZones);
router.get('/zones/:id', getZoneById);
router.post('/zones/:id/measurements', measurementValidator, validate, addMeasurement);
router.get('/zones/:id/measurements', getMeasurements);

module.exports = router;
