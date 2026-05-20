const { check } = require('express-validator');

const zoneValidator = [
  check('name')
    .notEmpty()
    .withMessage('Zone name is required')
    .isLength({ max: 100 })
    .withMessage('Zone name cannot exceed 100 characters'),
  check('description')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Description cannot exceed 255 characters'),
  check('coordinates')
    .optional()
    .notEmpty()
    .withMessage('Coordinates cannot be empty if provided'),
];

const measurementValidator = [
  check('vehicleCount')
    .notEmpty()
    .withMessage('Vehicle count is required')
    .isInt({ min: 0 })
    .withMessage('Vehicle count must be a positive integer'),
  check('speedAverage')
    .notEmpty()
    .withMessage('Average speed is required')
    .isFloat({ min: 0 })
    .withMessage('Average speed must be a positive number'),
  check('density')
    .notEmpty()
    .withMessage('Density is required')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Density must be a number between 0 and 100'),
];

module.exports = { zoneValidator, measurementValidator };
