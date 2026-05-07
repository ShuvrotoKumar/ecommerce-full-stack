const express = require('express');
const couponController = require('../controllers/coupon.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth('admin'), couponController.createCoupon)
  .get(auth('admin'), couponController.getCoupons);

router.post('/validate', auth(), couponController.validateCoupon);

router.delete('/:couponId', auth('admin'), couponController.deleteCoupon);

module.exports = router;
