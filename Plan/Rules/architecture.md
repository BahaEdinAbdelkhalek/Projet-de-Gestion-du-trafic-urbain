# Architecture and Conventions

## System overview

- GraphQL API Gateway is the only public entrypoint.
- Five microservices run as independent REST APIs: auth, vehicles, traffic, incidents, notifications.
- The gateway calls services over HTTP. Services never call each other directly.
- JWT is issued by the auth service and verified by the gateway and services.
- Services use Express.js.
- Gateway uses Apollo Server with Express.

## Monorepo layout

/
  apps/
    gateway/
  services/
    auth/
    vehicles/
    traffic/
    incidents/
    notifications/
  shared/ (optional)
  docs/
  plan/

## Service structure (each service)

config/          -> database connection (Singleton)
controllers/     -> request handlers (one file per resource)
middleware/      -> auth, error handler, validation
models/          -> Sequelize models
routes/          -> Express routers
validators/      -> express-validator chains
utils/           -> helpers (HttpError, tokens, etc.)
app.js           -> Express app
server.js        -> server entry (separated for testability)

## Gateway structure

apps/gateway/
  app.js
  server.js
  schema/
    typeDefs.js
    resolvers.js
  datasources/
    authService.js
    vehicleService.js
    trafficService.js
    incidentService.js
    notificationService.js
  utils/
    auth.js

## Design patterns used

1. MVC - Models, Controllers, Routes
2. Singleton - one Sequelize connection per service
3. Chain of Responsibility - middleware order
4. Factory - HttpError for consistent HTTP errors
5. Strategy - traffic density to level (LOW/MEDIUM/HIGH)
6. Adapter - gateway data sources wrap service APIs

## Auth and roles

- Roles: ADMIN, OPERATOR
- Auth service issues JWT with userId, role, email
- Services and gateway verify JWT using the same JWT_SECRET

## Data rules

- Database: MySQL (can switch to PostgreSQL by changing Sequelize dialect)
- Each service owns its tables
- No cross-service foreign keys

## API and errors

- REST success: res.status(200).json(data) or res.status(201).json(data)
- REST validation errors: res.status(400).json({ errors: errors.array() })
- REST runtime errors: throw new HttpError(message, statusCode)
- GraphQL errors: throw GraphQLError with extensions.code
