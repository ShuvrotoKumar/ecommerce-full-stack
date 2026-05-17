const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const validate = (schema) => (req, res, next) => {
  const validSchema = Object.keys(schema).reduce((obj, key) => {
    if (Object.prototype.hasOwnProperty.call(req, key)) {
      obj[key] = schema[key];
    }
    return obj;
  }, {});

  const object = Object.keys(validSchema).reduce((obj, key) => {
    obj[key] = req[key];
    return obj;
  }, {});

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key', abortEarly: false }, allowUnknown: true })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
