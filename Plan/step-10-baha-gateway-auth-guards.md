# Step 10 - Adem: Gateway Auth and Role Guards

**Commit message:** `Adem: add gateway auth and role guards`

---

## What to do

Add JWT verification in the GraphQL gateway and enforce role checks on resolvers.

## Files to create or update

```
apps/gateway/utils/auth.js
apps/gateway/schema/resolvers.js
apps/gateway/app.js
```

## Auth helper

- Parse JWT from Authorization header or cookie.
- Verify using JWT_SECRET.
- Expose user in context.

## Guard helpers

- requireAuth(context)
- requireRole(context, roles)

Use these in resolvers for protected operations.

## Verify

```
npm run dev --workspace apps/gateway
```

## Commit

```
git add .
git commit -m "Adem: add gateway auth and role guards"
```
