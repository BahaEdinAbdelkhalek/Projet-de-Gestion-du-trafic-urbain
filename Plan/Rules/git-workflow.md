# Git Workflow Rules

## Commit messages

Every commit MUST be prefixed with the developer name.

- Adem commits: "Adem: ..."
- Baha commits: "Baha: ..."

Use the exact commit message from the corresponding plan/step-XX-*.md file.

### Commit message mapping (steps)

| Step | Prefix | Commit message |
|------|--------|----------------|
| 1 | Adem | Adem: project structure and setup |
| 2 | Adem | Adem: add base service middleware and db config |
| 3 | Adem | Adem: implement auth service |
| 4 | Adem | Adem: add service auth middleware |
| 5 | Baha | Baha: implement vehicle service |
| 6 | Baha | Baha: implement traffic service |
| 7 | Baha | Baha: implement incident service |
| 8 | Adem | Adem: implement notification service |
| 9 | Baha | Baha: implement graphql gateway |
| 10 | Adem | Adem: add gateway auth and role guards |
| 11 | Baha | Baha: add docs and sample queries |
| 12 | Baha | Baha: add unit tests |

## Process per step

1. Read the plan file for the step (plan/step-XX-*.md)
2. Create/edit files exactly as described
3. Verify the service or gateway starts (npm run dev)
4. Stage all changes: git add .
5. Commit with the exact message from the table above
6. Push: git push origin main

Do not start the next step until the current step is committed and pushed.

## Branch

Everything goes on main. No feature branches needed.

## What NOT to commit

- node_modules/
- .env
- plan files must not be edited during implementation
