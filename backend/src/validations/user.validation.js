const Joi = require('joi');

const updateMe = {
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    language: Joi.string(),
  }).min(1),
};

const changePassword = {
  body: Joi.object().keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required().min(8),
  }),
};

const addAddress = {
  body: Joi.object().keys({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.string().required(),
    country: Joi.string().required(),
    isDefault: Joi.boolean(),
  }),
};

const updateAddress = {
  params: Joi.object().keys({
    addressId: Joi.string().hex().length(24).required(),
  }),
  body: Joi.object().keys({
    street: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    zipCode: Joi.string(),
    country: Joi.string(),
    isDefault: Joi.boolean(),
  }).min(1),
};

const deleteAddress = {
  params: Joi.object().keys({
    addressId: Joi.string().hex().length(24).required(),
  }),
};

module.exports = {
  updateMe,
  changePassword,
  addAddress,
  updateAddress,
  deleteAddress,
};
