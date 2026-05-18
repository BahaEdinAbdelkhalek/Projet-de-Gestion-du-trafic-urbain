const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const HttpError = require('../utils/HttpError');

const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null;

  if (!token) {
    throw new HttpError('Not authorized, no token', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    throw new HttpError('Not authorized, token invalid', 401);
  }
});

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new HttpError('Not authorized for this role', 403);
    }
    next();
  };
};

module.exports = { protect, authorize };
