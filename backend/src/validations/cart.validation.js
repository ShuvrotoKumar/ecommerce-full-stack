const Joi = require('joi');

const addToCart = {
  body: Joi.object().keys({
    productId: Joi.string().hex().length(24).required(),
    quantity: Joi.number().integer().min(1).required(),
  }),
};

const removeFromCart = {
  params: Joi.object().keys({
    productId: Joi.string().hex().length(24).required(),
  }),
};

module.exports = {
  addToCart,
  removeFromCart,
};
