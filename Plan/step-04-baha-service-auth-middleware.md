# Step 4 - Adem: Service Auth Middleware

**Commit message:** `Adem: add service auth middleware`

---

## What to do

Add JWT auth middleware to all non-auth services (vehicles, traffic, incidents, notifications).

## Files to create in EACH service

```
middleware/authMiddleware.js
```

## middleware/authMiddleware.js

```js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null;

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401);
    throw new Error('Not authorized, token invalid');
  }
});

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      throw new Error('Not authorized for this role');
    }
    next();
  };
};

module.exports = { protect, authorize };
```

## Usage

Use protect on all routes. Use authorize where role restrictions are needed.

## Verify

```
npm run dev --workspace services/vehicles
```

## Commit

```
git add .
git commit -m "Adem: add service auth middleware"
```
