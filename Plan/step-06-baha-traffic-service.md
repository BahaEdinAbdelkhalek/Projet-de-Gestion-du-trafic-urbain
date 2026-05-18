# Step 6 - Baha: Traffic Service

**Commit message:** `Baha: implement traffic service`

---

## What to do

Implement traffic zones, density tracking, and congestion level classification.

## Files to create

```
services/traffic/models/TrafficZone.js
services/traffic/models/TrafficMeasurement.js
services/traffic/utils/trafficLevel.js
services/traffic/validators/trafficValidator.js
services/traffic/controllers/trafficController.js
services/traffic/routes/traffic.js
```

## Strategy: traffic level

Create a helper that maps density to level:

- 0-30 -> LOW
- 31-70 -> MEDIUM
- 71-100 -> HIGH

## Endpoints

- POST /api/traffic/zones (ADMIN, OPERATOR)
- GET /api/traffic/zones (ADMIN, OPERATOR)
- GET /api/traffic/zones/:id (ADMIN, OPERATOR)
- POST /api/traffic/zones/:id/measurements (ADMIN, OPERATOR)
- GET /api/traffic/zones/:id/measurements (ADMIN, OPERATOR)

## Wire routes

Update services/traffic/app.js:

```js
const trafficRoutes = require('./routes/traffic');
app.use('/api/traffic', trafficRoutes);
```

## Verify

```
npm run dev --workspace services/traffic
```

## Commit

```
git add .
git commit -m "Baha: implement traffic service"
```
