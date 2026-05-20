const { check } = require('express-validator');

const createIncidentValidator = [
  check('type')
    .notEmpty()
    .withMessage('Incident type is required')
    .isIn(['accident', 'works', 'road_closed', 'traffic_jam'])
    .withMessage('Invalid incident type'),
  check('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  check('location')
    .notEmpty()
    .withMessage('Location is required')
    .isLength({ max: 255 })
    .withMessage('Location cannot exceed 255 characters'),
  check('zoneId')
    .optional()
    .isInt()
    .withMessage('Zone ID must be an integer'),
];

const updateStatusValidator = [
  check('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['reported', 'in_progress', 'resolved'])
    .withMessage('Invalid status value'),
];

module.exports = { createIncidentValidator, updateStatusValidator };
