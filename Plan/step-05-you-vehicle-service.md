# Step 5 - Baha: Vehicle Service

**Commit message:** `Baha: implement vehicle service`

---

## What to do

Implement vehicle management and GPS position history.

## Files to create

```
services/vehicles/models/Vehicle.js
services/vehicles/models/VehiclePosition.js
services/vehicles/validators/vehicleValidator.js
services/vehicles/controllers/vehicleController.js
services/vehicles/routes/vehicles.js
```

## Endpoints

- POST /api/vehicles (ADMIN, OPERATOR)
- GET /api/vehicles (ADMIN, OPERATOR)
- GET /api/vehicles/:id (ADMIN, OPERATOR)
- POST /api/vehicles/:id/positions (ADMIN, OPERATOR)
- GET /api/vehicles/:id/positions (ADMIN, OPERATOR)

## Notes

- VehiclePosition should store lat, lng, speed, recordedAt.
- Use protect middleware on all routes.

## Wire routes

Update services/vehicles/app.js:

```js
const vehicleRoutes = require('./routes/vehicles');
app.use('/api/vehicles', vehicleRoutes);
```

## Verify

```
npm run dev --workspace services/vehicles
```

## Commit

```
git add .
git commit -m "Baha: implement vehicle service"
```
