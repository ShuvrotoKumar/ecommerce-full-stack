const Joi = require('joi');

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    discountPrice: Joi.number(),
    category: Joi.string().required(),
    brand: Joi.string().required(),
    stock: Joi.number().required(),
    isFeatured: Joi.boolean(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    category: Joi.string(),
    brand: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().hex().length(24),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.string().hex().length(24),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    discountPrice: Joi.number(),
    category: Joi.string(),
    brand: Joi.string(),
    stock: Joi.number(),
    isFeatured: Joi.boolean(),
  }).min(1),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().hex().length(24),
  }),
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
