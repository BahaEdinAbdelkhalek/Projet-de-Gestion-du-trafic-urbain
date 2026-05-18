# Step 12 - Baha: Unit Tests

**Commit message:** `Baha: add unit tests`

---

## What to do

Add basic unit tests using Jest and Supertest.

## Minimum coverage

- Auth service: register and login
- One service: vehicles list and create
- Gateway: health or simple query smoke test

## Files to create

```
tests/auth.test.js
tests/vehicles.test.js
tests/gateway.test.js
```

## Test setup

- Use a separate test database schema or database name.
- Add a .env.test with DB settings and JWT_SECRET.
- Update root or per-service package.json with Jest config.

## Verify

```
npm test
```

## Commit

```
git add .
git commit -m "Baha: add unit tests"
```
