# Step 7 - Baha: Incident Service

**Commit message:** `Baha: implement incident service`

---

## What to do

Implement incident reporting and status updates.

## Files to create

```
services/incidents/models/Incident.js
services/incidents/validators/incidentValidator.js
services/incidents/controllers/incidentController.js
services/incidents/routes/incidents.js
```

## Incident types

- accident
- works
- road_closed
- traffic_jam

## Status values

- reported
- in_progress
- resolved

## Endpoints

- POST /api/incidents (ADMIN, OPERATOR)
- GET /api/incidents (ADMIN, OPERATOR)
- GET /api/incidents/:id (ADMIN, OPERATOR)
- PATCH /api/incidents/:id/status (ADMIN, OPERATOR)

## Wire routes

Update services/incidents/app.js:

```js
const incidentRoutes = require('./routes/incidents');
app.use('/api/incidents', incidentRoutes);
```

## Verify

```
npm run dev --workspace services/incidents
```

## Commit

```
git add .
git commit -m "Baha: implement incident service"
```
