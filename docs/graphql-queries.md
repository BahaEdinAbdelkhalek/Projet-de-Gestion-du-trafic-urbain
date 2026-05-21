# GraphQL Sample Queries

Set `Authorization: Bearer <token>` header for all authenticated operations.

---

## Auth

### Register
```graphql
mutation {
  register(name: "Admin", email: "admin@test.com", password: "123456", role: "ADMIN") {
    token
    user { id name email role }
  }
}
```

### Login
```graphql
mutation {
  login(email: "admin@test.com", password: "123456") {
    token
    user { id name email role }
  }
}
```

### Get Current User
```graphql
query {
  me {
    id name email role
  }
}
```

---

## Vehicles

### Create Vehicle
```graphql
mutation {
  createVehicle(plateNumber: "TN-123-AB", type: "car", model: "Toyota", status: "active") {
    id plateNumber type model status
  }
}
```

### List Vehicles
```graphql
query {
  vehicles {
    id plateNumber type model status
  }
}
```

### Add GPS Position
```graphql
mutation {
  addVehiclePosition(vehicleId: "1", latitude: 36.8, longitude: 10.18, speed: 60.0) {
    id vehicleId latitude longitude speed
  }
}
```

### Get Vehicle Positions
```graphql
query {
  vehiclePositions(vehicleId: "1") {
    id latitude longitude speed
  }
}
```

---

## Traffic Zones

### Create Zone
```graphql
mutation {
  createTrafficZone(name: "Zone A", description: "City center", coordinates: "36.8,10.1") {
    id name description
  }
}
```

### List Zones
```graphql
query {
  trafficZones {
    id name description coordinates
  }
}
```

### Add Measurement
```graphql
mutation {
  addTrafficMeasurement(zoneId: "1", vehicleCount: 80, speedAverage: 30.0, density: 75.0) {
    id zoneId vehicleCount speedAverage density congestionLevel
  }
}
```

### Get Measurements
```graphql
query {
  trafficMeasurements(zoneId: "1") {
    id vehicleCount density congestionLevel createdAt
  }
}
```

---

## Incidents

### Create Incident
```graphql
mutation {
  createIncident(type: "accident", description: "Two cars collision", location: "Djerba main road", zoneId: "1") {
    id type status location
  }
}
```

### List Incidents
```graphql
query {
  incidents {
    id type status location zoneId reporterId
  }
}
```

### Update Incident Status
```graphql
mutation {
  updateIncidentStatus(id: "1", status: "in_progress") {
    id status
  }
}
```

---

## Notifications

### Send Notification
```graphql
mutation {
  sendNotification(recipientId: "1", title: "Alert", message: "High congestion in Zone A") {
    id title message isRead
  }
}
```

### List Notifications
```graphql
query {
  notifications(recipientId: "1") {
    id title message isRead createdAt
  }
}
```

### Mark as Read
```graphql
mutation {
  markNotificationRead(id: "1") {
    id isRead
  }
}
```
