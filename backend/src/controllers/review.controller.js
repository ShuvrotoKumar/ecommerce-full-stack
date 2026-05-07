const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const reviewService = require('../services/review.service');

const addReview = catchAsync(async (req, res) => {
  const product = await reviewService.addReview(req.params.productId, req.body, req.user);
  res.send(product);
});

const deleteReview = catchAsync(async (req, res) => {
  const product = await reviewService.deleteReview(req.params.productId, req.params.reviewId, req.user);
  res.send(product);
});

module.exports = {
  addReview,
  deleteReview,
};
