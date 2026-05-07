const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const couponService = require('../services/coupon.service');

const createCoupon = catchAsync(async (req, res) => {
  const coupon = await couponService.createCoupon(req.body);
  res.status(httpStatus.CREATED).send(coupon);
});

const getCoupons = catchAsync(async (req, res) => {
  const coupons = await couponService.getCoupons();
  res.send(coupons);
});

const validateCoupon = catchAsync(async (req, res) => {
  const { code, orderAmount } = req.body;
  const coupon = await couponService.validateCoupon(code, orderAmount);
  res.send(coupon);
});

const deleteCoupon = catchAsync(async (req, res) => {
  await couponService.deleteCoupon(req.params.couponId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCoupon,
  getCoupons,
  validateCoupon,
  deleteCoupon,
};
