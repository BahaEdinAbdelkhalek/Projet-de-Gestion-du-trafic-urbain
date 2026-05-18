# Step 2 - Adem: Base Service Middleware and DB Config

**Commit message:** `Adem: add base service middleware and db config`

---

## What to do

Create the shared base for all REST services: DB connection (Sequelize), error handling, validation middleware, and Express app/server setup.

## Files to create in EACH service

```
config/db.js
middleware/errorMiddleware.js
middleware/validateMiddleware.js
utils/HttpError.js
app.js
server.js
```

## config/db.js (Sequelize singleton)

```js
const { Sequelize } = require('sequelize');

const createSequelize = () => {
  return new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      dialect: 'mysql',
      logging: false,
    }
  );
};

const sequelize = createSequelize();

module.exports = sequelize;
```

## utils/HttpError.js

```js
class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = HttpError;
```

## middleware/validateMiddleware.js

```js
const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;
```

## middleware/errorMiddleware.js

```js
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
  const message = err.message || 'Server error';

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
```

## app.js (example)

```js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes go here

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
```

## server.js (example)

```js
const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const sequelize = require('./config/db');

const PORT = process.env.PORT || 4001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Service running on port ${PORT}`);
  });
});
```

## Verify

```
npm run dev --workspace services/auth
```

## Commit

```
git add .
git commit -m "Adem: add base service middleware and db config"
```
