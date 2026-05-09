const httpStatus = require('http-status');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');

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

const getUserByResetPasswordToken = async (resetPasswordToken) => {
  return User.findOne({ 
    resetPasswordToken, 
    resetPasswordExpires: { $gt: new Date() } 
  });
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.findOne({ email: updateBody.email, _id: { $ne: userId } }))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await getUserById(userId);
  if (!user || !(await user.isPasswordMatch(oldPassword))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect old password');
  }
  user.password = newPassword;
  await user.save();
};

const getAddresses = async (userId) => {
  const user = await getUserById(userId);
  return user.addresses || [];
};

const addAddress = async (userId, addressData) => {
  const user = await getUserById(userId);
  if (addressData.isDefault) {
    user.addresses.forEach((addr) => (addr.isDefault = false));
  }
  user.addresses.push(addressData);
  await user.save();
  return user.addresses[user.addresses.length - 1];
};

const updateAddress = async (userId, addressId, updateData) => {
  const user = await getUserById(userId);
  const address = user.addresses.id(addressId);
  if (!address) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
  }
  if (updateData.isDefault) {
    user.addresses.forEach((addr) => (addr.isDefault = false));
  }
  Object.assign(address, updateData);
  await user.save();
  return address;
};

const deleteAddress = async (userId, addressId) => {
  const user = await getUserById(userId);
  user.addresses.pull(addressId);
  await user.save();
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getUserByRefreshToken,
  getUserByResetPasswordToken,
  updateUserById,
  changePassword,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
};
