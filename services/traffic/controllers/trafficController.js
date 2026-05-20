const asyncHandler = require('express-async-handler');
const HttpError = require('../../../shared/utils/HttpError');
const TrafficZone = require('../models/TrafficZone');
const TrafficMeasurement = require('../models/TrafficMeasurement');
const getTrafficLevel = require('../utils/trafficLevel');

const createZone = asyncHandler(async (req, res) => {
  const { name, description, coordinates } = req.body;

  const existingZone = await TrafficZone.findOne({ where: { name } });
  if (existingZone) {
    throw new HttpError('Traffic zone with this name already exists', 400);
  }

  const zone = await TrafficZone.create({ name, description, coordinates });

  res.status(201).json(zone);
});

const getZones = asyncHandler(async (req, res) => {
  const zones = await TrafficZone.findAll();
  res.json(zones);
});

const getZoneById = asyncHandler(async (req, res) => {
  const zone = await TrafficZone.findByPk(req.params.id);
  if (!zone) {
    throw new HttpError('Traffic zone not found', 404);
  }
  res.json(zone);
});

const addMeasurement = asyncHandler(async (req, res) => {
  const zone = await TrafficZone.findByPk(req.params.id);
  if (!zone) {
    throw new HttpError('Traffic zone not found', 404);
  }

  const { vehicleCount, speedAverage, density } = req.body;
  const congestionLevel = getTrafficLevel(density);

  const measurement = await TrafficMeasurement.create({
    zoneId: zone.id,
    vehicleCount,
    speedAverage,
    density,
    congestionLevel,
  });

  res.status(201).json(measurement);
});

const getMeasurements = asyncHandler(async (req, res) => {
  const zone = await TrafficZone.findByPk(req.params.id);
  if (!zone) {
    throw new HttpError('Traffic zone not found', 404);
  }

  const measurements = await TrafficMeasurement.findAll({
    where: { zoneId: zone.id },
    order: [['createdAt', 'DESC']],
  });

  res.json(measurements);
});

module.exports = {
  createZone,
  getZones,
  getZoneById,
  addMeasurement,
  getMeasurements,
};
