const Joi = require('joi');

const createOrder = {
  body: Joi.object().keys({
    orderItems: Joi.array().items(Joi.object().keys({
      name: Joi.string().required(),
      quantity: Joi.number().integer().required(),
      image: Joi.string().required(),
      price: Joi.number().required(),
      product: Joi.string().hex().length(24).required(),
    })).required(),
    shippingAddress: Joi.object().keys({
      address: Joi.string().required(),
      city: Joi.string().required(),
      postalCode: Joi.string().required(),
      country: Joi.string().required(),
    }).required(),
    paymentMethod: Joi.string().required(),
    itemsPrice: Joi.number().required(),
    taxPrice: Joi.number().required(),
    shippingPrice: Joi.number().required(),
    totalPrice: Joi.number().required(),
  }),
};

const getOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().hex().length(24),
  }),
};

const createCheckoutSession = {
  params: Joi.object().keys({
    orderId: Joi.string().hex().length(24),
  }),
};

module.exports = {
  createOrder,
  getOrder,
  createCheckoutSession,
};
