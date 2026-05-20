const { check } = require('express-validator');

const sendNotificationValidator = [
  check('recipientId')
    .notEmpty()
    .withMessage('Recipient ID is required')
    .isInt()
    .withMessage('Recipient ID must be an integer'),
  check('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 150 })
    .withMessage('Title cannot exceed 150 characters'),
  check('message')
    .notEmpty()
    .withMessage('Message is required'),
];

module.exports = { sendNotificationValidator };
