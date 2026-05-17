const Joi = require('joi');

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    parent: Joi.string().hex().length(24).allow(null),
  }),
};

const getCategories = {
  query: Joi.object().keys({
    parent: Joi.string().hex().length(24).allow(null),
  }),
};

const getCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().hex().length(24),
  }),
};

const updateCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().hex().length(24),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    parent: Joi.string().hex().length(24).allow(null),
  }).min(1),
};

const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().hex().length(24),
  }),
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
