const Joi = require('joi');

const createCoupon = {
  body: Joi.object().keys({
    code: Joi.string().required(),
    discountPercent: Joi.number().required().min(1).max(100),
    expiryDate: Joi.date().required(),
  }),
};

const validateCoupon = {
  body: Joi.object().keys({
    code: Joi.string().required(),
  }),
};

const deleteCoupon = {
  params: Joi.object().keys({
    couponId: Joi.string().hex().length(24).required(),
  }),
};

module.exports = {
  createCoupon,
  validateCoupon,
  deleteCoupon,
};
