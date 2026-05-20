const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
  }

  type AuthResponse {
    token: String!
    user: User!
  }

  type Vehicle {
    id: ID!
    plateNumber: String!
    type: String!
    model: String!
    status: String!
    createdAt: String
    updatedAt: String
  }

  type VehiclePosition {
    id: ID!
    vehicleId: ID!
    latitude: Float!
    longitude: Float!
    speed: Float!
    recordedAt: String
    createdAt: String
    updatedAt: String
  }

  type TrafficZone {
    id: ID!
    name: String!
    description: String
    coordinates: String
    createdAt: String
    updatedAt: String
  }

  type TrafficMeasurement {
    id: ID!
    zoneId: ID!
    vehicleCount: Int!
    speedAverage: Float!
    density: Float!
    congestionLevel: String!
    createdAt: String
    updatedAt: String
  }

  type Incident {
    id: ID!
    type: String!
    description: String
    status: String!
    location: String!
    zoneId: ID
    reporterId: ID!
    createdAt: String
    updatedAt: String
  }

  type Notification {
    id: ID!
    recipientId: ID!
    title: String!
    message: String!
    isRead: Boolean!
    createdAt: String
    updatedAt: String
  }

  type Query {
    me: User
    vehicles: [Vehicle]
    vehicle(id: ID!): Vehicle
    vehiclePositions(vehicleId: ID!): [VehiclePosition]
    trafficZones: [TrafficZone]
    trafficZone(id: ID!): TrafficZone
    trafficMeasurements(zoneId: ID!): [TrafficMeasurement]
    incidents(zoneId: ID, status: String): [Incident]
    notifications(recipientId: ID): [Notification]
  }

  type Mutation {
    register(name: String!, email: String!, password: String!, role: String): AuthResponse
    login(email: String!, password: String!): AuthResponse
    createVehicle(plateNumber: String!, type: String!, model: String!, status: String!): Vehicle
    addVehiclePosition(vehicleId: ID!, latitude: Float!, longitude: Float!, speed: Float!): VehiclePosition
    createTrafficZone(name: String!, description: String, coordinates: String): TrafficZone
    addTrafficMeasurement(zoneId: ID!, vehicleCount: Int!, speedAverage: Float!, density: Float!): TrafficMeasurement
    createIncident(type: String!, description: String, location: String!, zoneId: ID): Incident
    updateIncidentStatus(id: ID!, status: String!): Incident
    sendNotification(recipientId: ID!, title: String!, message: String!): Notification
    markNotificationRead(id: ID!): Notification
  }
`;

module.exports = typeDefs;
