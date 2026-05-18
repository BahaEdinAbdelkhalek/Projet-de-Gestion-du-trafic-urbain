# Coding Style Rules

## Comments

DO NOT over-comment. The goal is clean, readable code with minimal noise.

### What to comment

- Controllers: exactly 3 lines for @desc, @route, @access
- Resolvers: one short comment only for non-obvious logic
- One short comment for tricky logic blocks

### What NOT to comment

- Models, validators, routes
- Obvious assignments or destructuring
- Each line of a function

## Controllers and resolvers

- Wrap async controllers with express-async-handler
- Use async/await, no .then() chains
- Use HttpError for HTTP status based errors

## Validation

- Use express-validator in REST services
- Return validation errors as:
  res.status(400).json({ errors: errors.array() })
- GraphQL inputs are validated in resolvers or delegated to services

## General

- Use const by default, let only when reassignment is needed
- No console.log in committed code
- Keep one resource per controller/route/validator file
- Keep error messages short and user friendly
