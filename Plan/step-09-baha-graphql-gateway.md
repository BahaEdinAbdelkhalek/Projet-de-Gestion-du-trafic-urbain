# Step 9 - Baha: GraphQL Gateway

**Commit message:** `Baha: implement graphql gateway`

---

## What to do

Create the GraphQL API Gateway using Apollo Server with Express. Add schema, resolvers, and service data sources.

## Files to create

```
apps/gateway/app.js
apps/gateway/server.js
apps/gateway/schema/typeDefs.js
apps/gateway/schema/resolvers.js
apps/gateway/datasources/authService.js
apps/gateway/datasources/vehicleService.js
apps/gateway/datasources/trafficService.js
apps/gateway/datasources/incidentService.js
apps/gateway/datasources/notificationService.js
```

## Environment variables

```
GATEWAY_PORT=4000
AUTH_URL=http://localhost:4001
VEHICLES_URL=http://localhost:4002
TRAFFIC_URL=http://localhost:4003
INCIDENTS_URL=http://localhost:4004
NOTIFICATIONS_URL=http://localhost:4005
```

## GraphQL operations (minimum)

Queries:
- me
- vehicles, vehicle(id)
- vehiclePositions(vehicleId)
- trafficZones, trafficZone(id)
- trafficMeasurements(zoneId)
- incidents, incident(id)
- notifications

Mutations:
- register, login
- createVehicle, addVehiclePosition
- createTrafficZone, addTrafficMeasurement
- createIncident, updateIncidentStatus
- sendNotification, markNotificationRead

## Verify

```
npm run dev --workspace apps/gateway
```

## Commit

```
git add .
git commit -m "Baha: implement graphql gateway"
```
