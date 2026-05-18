# Baha's Prompt - Continue Smart Traffic GraphQL Platform

Copy this entire prompt and give it to your AI agent. Attach/expand the files and folders mentioned below.

---

## Prompt to paste:

```
I'm working on a Node.js microservices project called "Smart Traffic Platform". The system is a distributed web services architecture with a GraphQL API Gateway. The goal is to manage vehicles, traffic zones, incidents, and notifications for urban traffic monitoring.

## Overall architecture
- GraphQL API Gateway (apps/gateway) is the only public entrypoint.
- Five REST services (services/auth, services/vehicles, services/traffic, services/incidents, services/notifications).
- Database: MySQL with Sequelize.
- JWT auth with roles: ADMIN, OPERATOR.

## Services and features
1) Auth service
- Register, login, logout, get current user
- JWT generation and role handling

2) Vehicle service
- Add a vehicle, list vehicles, get vehicle detail
- Record simulated GPS positions
- View vehicle position history

3) Traffic service
- Create traffic zones
- Record traffic density
- Detect congestion level: LOW, MEDIUM, HIGH

4) Incident service
- Declare incident
- List incidents
- Update incident status
- Types: accident, works, road_closed, traffic_jam
- Status: reported, in_progress, resolved

5) Notification service
- Send notifications
- List notifications
- Mark notification as read

## What is already done (DO NOT redo these)
- Steps 1-5 are done by Adem (setup, base middleware, auth service, service auth middleware, vehicles)

## My steps to implement (in order)
1. Step 6: Traffic service -> Baha: implement traffic service
2. Step 7: Incident service -> Baha: implement incident service
3. Step 8: Notification service -> Baha: implement notification service
4. Step 9: GraphQL gateway -> Baha: implement graphql gateway
5. Step 11: Docs and sample queries -> Baha: add docs and sample queries
6. Step 12: Unit tests -> Baha: add unit tests

## IMPORTANT - Between my steps, Adem will do his commits
- Adem completes Steps 1-5 before I start
- After my Step 9, Adem does Step 10 (gateway auth and role guards)

## Rules - READ THESE BEFORE WRITING ANY CODE
Read all 3 files in Plan/Rules:
- Plan/Rules/coding-style.md
- Plan/Rules/git-workflow.md
- Plan/Rules/architecture.md

### Design patterns used
1. MVC - Models, Controllers, Routes
2. Singleton - one Sequelize connection per service
3. Chain of Responsibility - middleware order
4. Factory - HttpError for consistent errors
5. Strategy - traffic density to level
6. Adapter - gateway data sources wrap service APIs

### Key rules summary
- NO over-commenting
- Controllers get only the 3 line @desc/@route/@access header
- Models, validators, routes = NO comments
- Use HttpError for errors with status codes
- Wrap all async controllers with express-async-handler
- Use express-validator for REST input validation
- REST validation errors: return res.status(400).json({ errors: errors.array() })
- Follow the existing code style in each service

## Process for each step
1. Read the plan file for the step (Plan/step-XX-*.md)
2. Look at existing code to match patterns
3. Create the files described in the plan
4. Register new routes in the service app.js
5. Verify the service starts: npm run dev --workspace services/<service-name>
6. Commit: git add . && git commit -m "Baha: exact message from plan"
7. Push: git push origin main

## Start with Step 6 now
Read Plan/step-06-baha-traffic-service.md and implement it.
```

---

## What to attach/expand when giving this prompt

### Files to expand
- Plan/Rules/coding-style.md
- Plan/Rules/git-workflow.md
- Plan/Rules/architecture.md
- Plan/step-06-baha-traffic-service.md
- Plan/Ticket/Mini_Projet_Web_Services_GraphQL.pdf

### Files to expand as reference
- services/auth/controllers/authController.js
- services/auth/middleware/authMiddleware.js
- services/auth/routes/auth.js
- services/auth/validators/authValidator.js
- services/auth/models/User.js
- apps/gateway/app.js
- services/<any>/utils/HttpError.js

### Folder to attach
- The repo itself
