const asyncHandler = require('express-async-handler');
const HttpError = require('../../../shared/utils/HttpError');
const Vehicle = require('../models/Vehicle');
const VehiclePosition = require('../models/VehiclePosition');

const createVehicle = asyncHandler(async (req, res) => {
  const { plateNumber, type, model, status } = req.body;

  const existingVehicle = await Vehicle.findOne({ where: { plateNumber } });
  if (existingVehicle) {
    throw new HttpError('Vehicle with this plate number already exists', 400);
  }

  const vehicle = await Vehicle.create({ plateNumber, type, model, status });

  res.status(201).json(vehicle);
});

const getVehicles = asyncHandler(async (req, res) => {
  const vehicles = await Vehicle.findAll();
  res.json(vehicles);
});

const getVehicleById = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findByPk(req.params.id);
  if (!vehicle) {
    throw new HttpError('Vehicle not found', 404);
  }
  res.json(vehicle);
});

const addVehiclePosition = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findByPk(req.params.id);
  if (!vehicle) {
    throw new HttpError('Vehicle not found', 404);
  }

  const { latitude, longitude, speed, recordedAt } = req.body;
  const position = await VehiclePosition.create({
    vehicleId: vehicle.id,
    latitude,
    longitude,
    speed,
    recordedAt: recordedAt || undefined,
  });

  res.status(201).json(position);
});

const getVehiclePositions = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findByPk(req.params.id);
  if (!vehicle) {
    throw new HttpError('Vehicle not found', 404);
  }

  const positions = await VehiclePosition.findAll({
    where: { vehicleId: vehicle.id },
    order: [['recordedAt', 'DESC']],
  });

  res.json(positions);
});

module.exports = {
  createVehicle,
  getVehicles,
  getVehicleById,
  addVehiclePosition,
  getVehiclePositions,
};
