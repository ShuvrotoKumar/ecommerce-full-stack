const httpStatus = require('http-status');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');

const createUser = async (userBody) => {
  if (await User.findOne({ email: userBody.email })) {
    throw new ApiError(400, 'Email already taken');
  }
  return User.create(userBody);
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const getUserById = async (id) => {
  return User.findById(id);
};

const getUserByRefreshToken = async (refreshToken) => {
  return User.findOne({ refreshToken });
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getUserByRefreshToken,
};
