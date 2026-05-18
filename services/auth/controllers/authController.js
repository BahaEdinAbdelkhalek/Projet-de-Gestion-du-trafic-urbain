const asyncHandler = require('express-async-handler');
const HttpError = require('../../../shared/utils/HttpError');
const User = require('../models/User');
const generateToken = require('../../../shared/utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new HttpError('User already exists with this email', 400);
  }

  const user = await User.create({ name, email, password, role });
  const token = generateToken(user);

  res.status(201).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.scope('withPassword').findOne({ where: { email } });
  if (!user || !(await user.matchPassword(password))) {
    throw new HttpError('Invalid email or password', 401);
  }

  const token = generateToken(user);

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.userId);
  if (!user) {
    throw new HttpError('User not found', 404);
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});

module.exports = { register, login, getMe };
