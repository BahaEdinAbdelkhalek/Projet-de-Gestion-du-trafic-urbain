const asyncHandler = require('express-async-handler');
const HttpError = require('../../../shared/utils/HttpError');
const Incident = require('../models/Incident');

const declareIncident = asyncHandler(async (req, res) => {
  const { type, description, location, zoneId } = req.body;
  const reporterId = req.user.userId;

  const incident = await Incident.create({
    type,
    description,
    location,
    zoneId,
    reporterId,
  });

  res.status(201).json(incident);
});

const getIncidents = asyncHandler(async (req, res) => {
  const { zoneId, status } = req.query;
  const where = {};
  if (zoneId) where.zoneId = zoneId;
  if (status) where.status = status;

  const incidents = await Incident.findAll({ where });
  res.json(incidents);
});

const getIncidentById = asyncHandler(async (req, res) => {
  const incident = await Incident.findByPk(req.params.id);
  if (!incident) {
    throw new HttpError('Incident not found', 404);
  }
  res.json(incident);
});

const updateIncidentStatus = asyncHandler(async (req, res) => {
  const incident = await Incident.findByPk(req.params.id);
  if (!incident) {
    throw new HttpError('Incident not found', 404);
  }

  const { status } = req.body;
  incident.status = status;
  await incident.save();

  res.json(incident);
});

module.exports = {
  declareIncident,
  getIncidents,
  getIncidentById,
  updateIncidentStatus,
};
