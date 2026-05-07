const jwt = require('jsonwebtoken');

const generateToken = (userId, expires, secret = process.env.JWT_SECRET) => {
  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: expires,
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = Math.floor(Date.now() / 1000) + process.env.JWT_ACCESS_EXPIRATION_MINUTES * 60;
  const accessToken = generateToken(user.id, accessTokenExpires);

  const refreshTokenExpires = Math.floor(Date.now() / 1000) + process.env.JWT_REFRESH_EXPIRATION_DAYS * 24 * 60 * 60;
  const refreshToken = generateToken(user.id, refreshTokenExpires);

  user.refreshToken = refreshToken;
  await user.save();

  return {
    access: {
      token: accessToken,
      expires: new Date(accessTokenExpires * 1000),
    },
    refresh: {
      token: refreshToken,
      expires: new Date(refreshTokenExpires * 1000),
    },
  };
};

const verifyToken = async (token, secret = process.env.JWT_SECRET) => {
  const payload = jwt.verify(token, secret);
  return payload;
};

module.exports = {
  generateToken,
  generateAuthTokens,
  verifyToken,
};
