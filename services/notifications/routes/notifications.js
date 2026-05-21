const express = require('express');
const router = express.Router();
const {
  sendNotification,
  getNotifications,
  markNotificationRead,
} = require('../controllers/notificationController');
const { protect, authorize } = require('../../../shared/middleware/authMiddleware');
const { sendNotificationValidator } = require('../validators/notificationValidator');
const validate = require('../../../shared/middleware/validateMiddleware');

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification delivery and status
 */

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Send a notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [recipientId, title, message]
 *             properties:
 *               recipientId:
 *                 type: integer
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Notification sent
 */

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: List notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: recipientId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of notifications
 */

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   patch:
 *     summary: Mark notification as read
 *     tags: [Notifications]
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
 *         description: Notification updated
 */

router.use(protect);
router.use(authorize('ADMIN', 'OPERATOR'));

router.post('/', sendNotificationValidator, validate, sendNotification);
router.get('/', getNotifications);
router.patch('/:id/read', markNotificationRead);

module.exports = router;
