# Step 8 - Baha: Notification Service

**Commit message:** `Baha: implement notification service`

---

## What to do

Implement notifications: send, list, and mark as read.

## Files to create

```
services/notifications/models/Notification.js
services/notifications/validators/notificationValidator.js
services/notifications/controllers/notificationController.js
services/notifications/routes/notifications.js
```

## Endpoints

- POST /api/notifications (ADMIN, OPERATOR)
- GET /api/notifications (ADMIN, OPERATOR)
- PATCH /api/notifications/:id/read (ADMIN, OPERATOR)

## Wire routes

Update services/notifications/app.js:

```js
const notificationRoutes = require('./routes/notifications');
app.use('/api/notifications', notificationRoutes);
```

## Verify

```
npm run dev --workspace services/notifications
```

## Commit

```
git add .
git commit -m "Baha: implement notification service"
```
