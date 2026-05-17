const Joi = require('joi');

const addToWishlist = {
  body: Joi.object().keys({
    productId: Joi.string().hex().length(24).required(),
  }),
};

const removeFromWishlist = {
  params: Joi.object().keys({
    productId: Joi.string().hex().length(24).required(),
  }),
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
};
