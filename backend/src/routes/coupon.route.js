const express = require('express');
const couponController = require('../controllers/coupon.controller');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { createCoupon, validateCoupon, deleteCoupon } = require('../validations/coupon.validation');

const router = express.Router();

router
  .route('/')
  .post(auth('admin'), validate(createCoupon), couponController.createCoupon)
  .get(auth('admin'), couponController.getCoupons);

router.post('/validate', auth(), validate(validateCoupon), couponController.validateCoupon);

router.delete('/:couponId', auth('admin'), validate(deleteCoupon), couponController.deleteCoupon);

module.exports = router;
