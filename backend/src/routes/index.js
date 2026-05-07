const express = require('express');
const authRoute = require('./auth.route');
const productRoute = require('./product.route');
const categoryRoute = require('./category.route');
const orderRoute = require('./order.route');
const cartRoute = require('./cart.route');
const wishlistRoute = require('./wishlist.route');
const couponRoute = require('./coupon.route');
const reviewRoute = require('./review.route');
const uploadRoute = require('./upload.route');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/categories',
    route: categoryRoute,
  },
  {
    path: '/orders',
    route: orderRoute,
  },
  {
    path: '/cart',
    route: cartRoute,
  },
  {
    path: '/wishlist',
    route: wishlistRoute,
  },
  {
    path: '/coupons',
    route: couponRoute,
  },
  {
    path: '/reviews',
    route: reviewRoute,
  },
  {
    path: '/upload',
    route: uploadRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
