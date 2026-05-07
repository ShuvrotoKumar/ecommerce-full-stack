const httpStatus = require('http-status');
const Coupon = require('../models/coupon.model');
const ApiError = require('../utils/ApiError');

const createCoupon = async (couponBody) => {
  if (await Coupon.findOne({ code: couponBody.code })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Coupon code already exists');
  }
  return Coupon.create(couponBody);
};

const getCoupons = async () => {
  return Coupon.find();
};

const validateCoupon = async (code, orderAmount) => {
  const coupon = await Coupon.findOne({ code, isActive: true });
  if (!coupon) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid or inactive coupon code');
  }

  if (coupon.expiryDate < new Date()) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Coupon has expired');
  }

  if (orderAmount < coupon.minOrderAmount) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Minimum order amount for this coupon is $${coupon.minOrderAmount}`);
  }

  if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Coupon usage limit reached');
  }

  return coupon;
};

const deleteCoupon = async (couponId) => {
  const coupon = await Coupon.findById(couponId);
  if (!coupon) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Coupon not found');
  }
  await coupon.remove();
  return coupon;
};

module.exports = {
  createCoupon,
  getCoupons,
  validateCoupon,
  deleteCoupon,
};
