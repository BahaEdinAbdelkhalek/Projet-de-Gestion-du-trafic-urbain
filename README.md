# Smart Traffic Platform

A distributed urban traffic management platform using Node.js microservices and a GraphQL API Gateway.

## Architecture

```
apps/gateway         -> GraphQL API Gateway (port 4000)
services/auth        -> Authentication Service (port 4100)
services/vehicles    -> Vehicle Management Service (port 4200)
services/traffic     -> Traffic Zone Service (port 4300)
services/incidents   -> Incident Management Service (port 4500)
services/notifications -> Notification Service (port 4400)
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and configure your MySQL database.

3. Start all services:
   ```bash
   npm run dev:all
   ```

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| DB_HOST | MySQL host | localhost |
| DB_PORT | MySQL port | 3306 |
| DB_NAME | Database name | traffic |
| DB_USER | Database user | root |
| DB_PASS | Database password | root |
| JWT_SECRET | JWT secret key | - |
| JWT_EXPIRE | JWT expiration | 7d |
| GATEWAY_PORT | Gateway port | 4000 |
| AUTH_PORT | Auth service port | 4100 |
| VEHICLES_PORT | Vehicles service port | 4200 |
| TRAFFIC_PORT | Traffic service port | 4300 |
| INCIDENTS_PORT | Incidents service port | 4500 |
| NOTIFICATIONS_PORT | Notifications service port | 4400 |

## GraphQL Endpoint

```
http://localhost:4000/graphql
```

## GraphQL Examples

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
    user { id name role }
  }
}
```

### Get Traffic Zones
```graphql
query {
  trafficZones {
    id name description coordinates
  }
}
```

### Create Traffic Zone
```graphql
mutation {
  createTrafficZone(name: "Zone A", description: "City center", coordinates: "36.8,10.1") {
    id name congestionLevel
  }
}
```

## Tests

1. Create a test database (e.g. `traffic_test`) and update `.env.test` if needed.
2. Run tests:
   ```bash
   npm test
   ```

## Team

| Member | Role |
|---|---|
| Adem | Auth, Vehicles, Gateway Auth Guards, Setup |
| Baha | Traffic, Incidents, Notifications, GraphQL Gateway, Docs, Tests |
