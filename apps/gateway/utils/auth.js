const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');

const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization || '';
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }

  if (req.cookies?.token) {
    return req.cookies.token;
  }

  if (req.cookies?.jwt) {
    return req.cookies.jwt;
  }

  return null;
};

const getUserFromToken = (token) => {
  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

const requireAuth = (context) => {
  if (!context.user) {
    throw new GraphQLError('Not authorized', { extensions: { code: 'UNAUTHENTICATED' } });
  }
};

const requireRole = (context, roles) => {
  requireAuth(context);
  if (!roles.includes(context.user.role)) {
    throw new GraphQLError('Forbidden', { extensions: { code: 'FORBIDDEN' } });
  }
};

module.exports = {
  getTokenFromRequest,
  getUserFromToken,
  requireAuth,
  requireRole,
};
