const Joi = require('joi');

const addReview = {
  params: Joi.object().keys({
    productId: Joi.string().hex().length(24).required(),
  }),
  body: Joi.object().keys({
    rating: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().required(),
  }),
};

const deleteReview = {
  params: Joi.object().keys({
    productId: Joi.string().hex().length(24).required(),
    reviewId: Joi.string().hex().length(24).required(),
  }),
};

module.exports = {
  addReview,
  deleteReview,
};
