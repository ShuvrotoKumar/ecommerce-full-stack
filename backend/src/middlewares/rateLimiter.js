const rateLimit = require('express-rate-limit');

const createLimiter = (windowMs, max, message) => rateLimit({
  windowMs,
  max,
  message: message || 'Too many requests, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Stricter limiter for sensitive auth routes
const authLimiter = createLimiter(
  15 * 60 * 1000, 
  20, 
  'Too many login attempts, please try again after 15 minutes'
);

// General limiter for API to prevent broad scraping/abuse
const apiLimiter = createLimiter(
  60 * 1000, 
  100, 
  'Too many requests, please try again after a minute'
);

module.exports = {
  authLimiter,
  apiLimiter,
};
