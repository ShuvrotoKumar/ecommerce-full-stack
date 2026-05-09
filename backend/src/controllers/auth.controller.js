const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');
const tokenService = require('../services/token.service');
const ApiError = require('../utils/ApiError');
const { sendEmail } = require('../utils/email');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(201).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(401, 'Incorrect email or password');
  }
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;
  const user = await userService.getUserByRefreshToken(refreshToken);
  if (user) {
    user.refreshToken = null;
    await user.save();
  }
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;
  const payload = await tokenService.verifyToken(refreshToken);
  const user = await userService.getUserById(payload.sub);
  if (!user || user.refreshToken !== refreshToken) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid refresh token');
  }
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await userService.getUserByEmail(email);
  
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No user found with this email');
  }
  
  // Generate password reset token (1 hour expiry)
  const resetPasswordToken = tokenService.generateToken(
    user.id,
    Math.floor(Date.now() / 1000) + 3600
  );
  
  // Save token to user
  user.resetPasswordToken = resetPasswordToken;
  user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
  await user.save();
  
  // Send reset email
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetPasswordToken}`;
  const message = `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n` +
    `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
    `${resetUrl}\n\n` +
    `If you did not request this, please ignore this email and your password will remain unchanged.\n`;
  
  await sendEmail({
    to: user.email,
    subject: 'Password Reset Request',
    text: message,
  });
  
  res.status(httpStatus.OK).send({ message: 'Reset link sent to your email' });
});

const resetPassword = catchAsync(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  
  const hashedToken = token; // In production, hash the token before storing
  
  const user = await userService.getUserByResetPasswordToken(hashedToken);
  
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Token is invalid or has expired');
  }
  
  // Check if token has expired
  if (user.resetPasswordExpires < new Date()) {
    throw new ApiError(httpStatus.GONE, 'Password reset token has expired');
  }
  
  // Update password
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  
  // Generate new auth tokens
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
};
