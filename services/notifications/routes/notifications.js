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

router.use(protect);
router.use(authorize('ADMIN', 'OPERATOR'));

router.post('/', sendNotificationValidator, validate, sendNotification);
router.get('/', getNotifications);
router.patch('/:id/read', markNotificationRead);

module.exports = router;
