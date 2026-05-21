const { check } = require('express-validator');

const vehicleValidator = [
  check('plateNumber')
    .notEmpty()
    .withMessage('Plate number is required')
    .isLength({ max: 20 })
    .withMessage('Plate number cannot exceed 20 characters'),
  check('type')
    .notEmpty()
    .withMessage('Vehicle type is required')
    .isLength({ max: 50 })
    .withMessage('Vehicle type cannot exceed 50 characters'),
  check('model')
    .notEmpty()
    .withMessage('Vehicle model is required')
    .isLength({ max: 100 })
    .withMessage('Vehicle model cannot exceed 100 characters'),
  check('status')
    .notEmpty()
    .withMessage('Vehicle status is required')
    .isLength({ max: 30 })
    .withMessage('Vehicle status cannot exceed 30 characters'),
];

const positionValidator = [
  check('latitude')
    .notEmpty()
    .withMessage('Latitude is required')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  check('longitude')
    .notEmpty()
    .withMessage('Longitude is required')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),
  check('speed')
    .notEmpty()
    .withMessage('Speed is required')
    .isFloat({ min: 0 })
    .withMessage('Speed must be a positive number'),
  check('recordedAt')
    .optional()
    .isISO8601()
    .withMessage('RecordedAt must be a valid ISO date'),
];

module.exports = { vehicleValidator, positionValidator };
