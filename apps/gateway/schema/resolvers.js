const resolvers = {
  Query: {
    me: (_, __, { dataSources }) => dataSources.authService.getMe(),
    vehicles: (_, __, { dataSources }) => dataSources.vehicleService.getVehicles(),
    vehicle: (_, { id }, { dataSources }) => dataSources.vehicleService.getVehicle(id),
    vehiclePositions: (_, { vehicleId }, { dataSources }) => dataSources.vehicleService.getVehiclePositions(vehicleId),
    trafficZones: (_, __, { dataSources }) => dataSources.trafficService.getTrafficZones(),
    trafficZone: (_, { id }, { dataSources }) => dataSources.trafficService.getTrafficZone(id),
    trafficMeasurements: (_, { zoneId }, { dataSources }) => dataSources.trafficService.getTrafficMeasurements(zoneId),
    incidents: (_, { zoneId, status }, { dataSources }) => dataSources.incidentService.getIncidents(zoneId, status),
    notifications: (_, { recipientId }, { dataSources }) => dataSources.notificationService.getNotifications(recipientId),
  },
  Mutation: {
    register: (_, { name, email, password, role }, { dataSources }) =>
      dataSources.authService.register(name, email, password, role),
    login: (_, { email, password }, { dataSources }) =>
      dataSources.authService.login(email, password),
    createVehicle: (_, { plateNumber, type, model, status }, { dataSources }) =>
      dataSources.vehicleService.createVehicle(plateNumber, type, model, status),
    addVehiclePosition: (_, { vehicleId, latitude, longitude, speed }, { dataSources }) =>
      dataSources.vehicleService.addVehiclePosition(vehicleId, latitude, longitude, speed),
    createTrafficZone: (_, { name, description, coordinates }, { dataSources }) =>
      dataSources.trafficService.createTrafficZone(name, description, coordinates),
    addTrafficMeasurement: (_, { zoneId, vehicleCount, speedAverage, density }, { dataSources }) =>
      dataSources.trafficService.addTrafficMeasurement(zoneId, vehicleCount, speedAverage, density),
    createIncident: (_, { type, description, location, zoneId }, { dataSources }) =>
      dataSources.incidentService.createIncident(type, description, location, zoneId),
    updateIncidentStatus: (_, { id, status }, { dataSources }) =>
      dataSources.incidentService.updateIncidentStatus(id, status),
    sendNotification: (_, { recipientId, title, message }, { dataSources }) =>
      dataSources.notificationService.sendNotification(recipientId, title, message),
    markNotificationRead: (_, { id }, { dataSources }) =>
      dataSources.notificationService.markNotificationRead(id),
  },
};

module.exports = resolvers;
