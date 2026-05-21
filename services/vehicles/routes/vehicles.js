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

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: Vehicle management
 */

/**
 * @swagger
 * /api/vehicles:
 *   post:
 *     summary: Create a vehicle
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [plateNumber, type, model, status]
 *             properties:
 *               plateNumber:
 *                 type: string
 *               type:
 *                 type: string
 *               model:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vehicle created
 */

/**
 * @swagger
 * /api/vehicles:
 *   get:
 *     summary: List vehicles
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of vehicles
 */

/**
 * @swagger
 * /api/vehicles/{id}:
 *   get:
 *     summary: Get vehicle by id
 *     tags: [Vehicles]
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
 *         description: Vehicle details
 *       404:
 *         description: Vehicle not found
 */

/**
 * @swagger
 * /api/vehicles/{id}/positions:
 *   post:
 *     summary: Add vehicle position
 *     tags: [Vehicles]
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
 *             required: [latitude, longitude, speed]
 *             properties:
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               speed:
 *                 type: number
 *               recordedAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Position created
 */

/**
 * @swagger
 * /api/vehicles/{id}/positions:
 *   get:
 *     summary: List vehicle positions
 *     tags: [Vehicles]
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
 *         description: List of positions
 */

router.use(protect);
router.use(authorize('ADMIN', 'OPERATOR'));

router.post('/', vehicleValidator, validate, createVehicle);
router.get('/', getVehicles);
router.get('/:id', getVehicleById);
router.post('/:id/positions', positionValidator, validate, addVehiclePosition);
router.get('/:id/positions', getVehiclePositions);

module.exports = router;
