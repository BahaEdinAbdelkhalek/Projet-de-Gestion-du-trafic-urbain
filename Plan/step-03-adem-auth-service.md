# Step 3 - Adem: Auth Service

**Commit message:** `Adem: implement auth service`

---

## What to do

Implement auth service endpoints: register, login, get current user. Use JWT and roles (ADMIN, OPERATOR).

## Files to create

```
services/auth/models/User.js
services/auth/validators/authValidator.js
services/auth/controllers/authController.js
services/auth/routes/auth.js
services/auth/utils/generateToken.js
```

## Model: User

Fields: name, email, password, role. Hash password with bcrypt before save.

## Routes

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

## Validation

Use express-validator with a validate middleware.

## Wire routes

Update services/auth/app.js:

```js
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
```

## Verify

```
npm run dev --workspace services/auth
```

## Commit

```
git add .
git commit -m "Adem: implement auth service"
```
