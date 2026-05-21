const { requireAuth, requireRole } = require('../utils/auth');

const resolvers = {
  Query: {
    me: (_, __, context) => {
      requireAuth(context);
      return context.dataSources.authService.getMe();
    },
    vehicles: (_, __, context) => {
      requireRole(context, ['ADMIN', 'OPERATOR']);
      return context.dataSources.vehicleService.getVehicles();
    },
    vehicle: (_, { id }, context) => {
      requireRole(context, ['ADMIN', 'OPERATOR']);
      return context.dataSources.vehicleService.getVehicle(id);
    },
    vehiclePositions: (_, { vehicleId }, context) => {
      requireRole(context, ['ADMIN', 'OPERATOR']);
      return context.dataSources.vehicleService.getVehiclePositions(vehicleId);
    },
    trafficZones: (_, __, context) => {
      requireRole(context, ['ADMIN', 'OPERATOR']);
      return context.dataSources.trafficService.getTrafficZones();
    },
    trafficZone: (_, { id }, context) => {
      requireRole(context, ['ADMIN', 'OPERATOR']);
      return context.dataSources.trafficService.getTrafficZone(id);
    },
    trafficMeasurements: (_, { zoneId }, context) => {
      requireRole(context, ['ADMIN', 'OPERATOR']);
      return context.dataSources.trafficService.getTrafficMeasurements(zoneId);
    },
    incidents: (_, { zoneId, status }, context) => {
      requireRole(context, ['ADMIN', 'OPERATOR']);
      return context.dataSources.incidentService.getIncidents(zoneId, status);
    },
    notifications: (_, { recipientId }, context) => {
      requireRole(context, ['ADMIN', 'OPERATOR']);
      return context.dataSources.notificationService.getNotifications(recipientId);
    },
  },
  Mutation: {
    register: (_, { name, email, password, role }, { dataSources }) =>
      dataSources.authService.register(name, email, password, role),
    login: (_, { email, password }, { dataSources }) =>
      dataSources.authService.login(email, password),
    createVehicle: (_, { plateNumber, type, model, status }, context) => {
      requireRole(context, ['ADMIN', 'OPERATOR']);
      return context.dataSources.vehicleService.createVehicle(plateNumber, type, model, status);
    },
    addVehiclePosition: (_, { vehicleId, latitude, longitude, speed }, context) => {
      requireRole(context, ['ADMIN', 'OPERATOR']);
      return context.dataSources.vehicleService.addVehiclePosition(vehicleId, latitude, longitude, speed);
    },
    createTrafficZone: (_, { name, description, coordinates }, context) => {
      requireRole(context, ['ADMIN', 'OPERATOR']);
      return context.dataSources.trafficService.createTrafficZone(name, description, coordinates);
    },
    addTrafficMeasurement: (_, { zoneId, vehicleCount, speedAverage, density }, context) => {
      requireRole(context, ['ADMIN', 'OPERATOR']);
      return context.dataSources.trafficService.addTrafficMeasurement(zoneId, vehicleCount, speedAverage, density);
    },
    createIncident: (_, { type, description, location, zoneId }, context) => {
      requireRole(context, ['ADMIN', 'OPERATOR']);
      return context.dataSources.incidentService.createIncident(type, description, location, zoneId);
    },
    updateIncidentStatus: (_, { id, status }, context) => {
      requireRole(context, ['ADMIN', 'OPERATOR']);
      return context.dataSources.incidentService.updateIncidentStatus(id, status);
    },
    sendNotification: (_, { recipientId, title, message }, context) => {
      requireRole(context, ['ADMIN', 'OPERATOR']);
      return context.dataSources.notificationService.sendNotification(recipientId, title, message);
    },
    markNotificationRead: (_, { id }, context) => {
      requireRole(context, ['ADMIN', 'OPERATOR']);
      return context.dataSources.notificationService.markNotificationRead(id);
    },
  },
};

module.exports = resolvers;
