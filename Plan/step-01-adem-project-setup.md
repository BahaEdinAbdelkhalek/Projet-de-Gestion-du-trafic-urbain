# Step 1 - Adem: Project Structure and Setup

**Commit message:** `Adem: project structure and setup`

---

## What to do

- Initialize the repo root and enable npm workspaces.
- Create the monorepo folders for gateway and services.
- Add base package.json files and scripts for each package.
- Add .gitignore and .env.example.

## Folders to create

```
apps/gateway/
services/auth/
services/vehicles/
services/traffic/
services/incidents/
services/notifications/
docs/
```

## Root package.json (workspaces)

Add npm workspaces:

```json
{
  "name": "traffic-platform",
  "private": true,
  "workspaces": [
    "apps/*",
    "services/*"
  ],
  "scripts": {
    "start": "npm run dev:all",
    "dev:all": "concurrently -n gateway,auth,vehicles,traffic,incidents,notifications \"npm run dev --workspace apps/gateway\" \"npm run dev --workspace services/auth\" \"npm run dev --workspace services/vehicles\" \"npm run dev --workspace services/traffic\" \"npm run dev --workspace services/incidents\" \"npm run dev --workspace services/notifications\"",
    "dev:gateway": "npm run dev --workspace apps/gateway",
    "dev:auth": "npm run dev --workspace services/auth",
    "dev:vehicles": "npm run dev --workspace services/vehicles",
    "dev:traffic": "npm run dev --workspace services/traffic",
    "dev:incidents": "npm run dev --workspace services/incidents",
    "dev:notifications": "npm run dev --workspace services/notifications"
  }
}
```

Install a root dev dependency for running all services at once:

```
npm install --save-dev concurrently
```

## Service package.json (base dependencies)

Each service package.json should include:

- dependencies: express, sequelize, mysql2, dotenv, cors, cookie-parser, helmet, morgan, express-validator, express-async-handler, jsonwebtoken
- devDependencies: nodemon, jest, supertest

Auth service also needs: bcryptjs

## Gateway package.json (base dependencies)

- dependencies: express, apollo-server-express, graphql, axios, dotenv, cors, cookie-parser, helmet, morgan, jsonwebtoken
- devDependencies: nodemon, jest, supertest

## .gitignore

```
node_modules/
.env
```

## .env.example (root)

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=traffic
DB_USER=root
DB_PASS=root
JWT_SECRET=traffic.eyJ1c2VySWQiOiIxMjM0NTYiLCJyb2xlIjoiYWRtaW4ifQ.s3cr3tS1gn4tur3
JWT_EXPIRE=7d

GATEWAY_PORT=4000
AUTH_PORT=4100
VEHICLES_PORT=4200
TRAFFIC_PORT=4300
INCIDENTS_PORT=4500
NOTIFICATIONS_PORT=4400
```

## Verify

```
npm -v
```

## Commit

```
git add .
git commit -m "Adem: project structure and setup"
```
