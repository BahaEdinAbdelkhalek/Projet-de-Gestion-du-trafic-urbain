const asyncHandler = require('express-async-handler');
const HttpError = require('../../../shared/utils/HttpError');
const Notification = require('../models/Notification');

const sendNotification = asyncHandler(async (req, res) => {
  const { recipientId, title, message } = req.body;

  const notification = await Notification.create({
    recipientId,
    title,
    message,
    isRead: false,
  });

  res.status(201).json(notification);
});

const getNotifications = asyncHandler(async (req, res) => {
  const { recipientId } = req.query;
  const where = {};
  if (recipientId) {
    where.recipientId = recipientId;
  }

  const notifications = await Notification.findAll({
    where,
    order: [['createdAt', 'DESC']],
  });

  res.json(notifications);
});

const markNotificationRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findByPk(req.params.id);
  if (!notification) {
    throw new HttpError('Notification not found', 404);
  }

  notification.isRead = true;
  await notification.save();

  res.json(notification);
});

module.exports = {
  sendNotification,
  getNotifications,
  markNotificationRead,
};
