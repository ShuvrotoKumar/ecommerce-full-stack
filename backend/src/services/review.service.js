const httpStatus = require('http-status');
const Product = require('../models/product.model');
const ApiError = require('../utils/ApiError');

const addReview = async (productId, reviewBody, user) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === user.id.toString()
  );

  if (alreadyReviewed) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product already reviewed');
  }

  const review = {
    name: user.name,
    rating: Number(reviewBody.rating),
    comment: reviewBody.comment,
    user: user.id,
  };

  product.reviews.push(review);
  product.numOfReviews = product.reviews.length;
  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();
  return product;
};

const deleteReview = async (productId, reviewId, user) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const review = product.reviews.id(reviewId);
  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }

  if (review.user.toString() !== user.id.toString() && user.role !== 'admin') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Not authorized to delete this review');
  }

  review.remove();
  product.numOfReviews = product.reviews.length;
  
  if (product.reviews.length > 0) {
    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
  } else {
    product.ratings = 0;
  }

  await product.save();
  return product;
};

module.exports = {
  addReview,
  deleteReview,
};
