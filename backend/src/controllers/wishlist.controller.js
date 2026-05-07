const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const wishlistService = require('../services/wishlist.service');

const getWishlist = catchAsync(async (req, res) => {
  const wishlist = await wishlistService.getWishlistByUserId(req.user.id);
  res.send(wishlist);
});

const addToWishlist = catchAsync(async (req, res) => {
  const wishlist = await wishlistService.addProductToWishlist(req.user.id, req.body.productId);
  res.send(wishlist);
});

const removeFromWishlist = catchAsync(async (req, res) => {
  const wishlist = await wishlistService.removeProductFromWishlist(req.user.id, req.params.productId);
  res.send(wishlist);
});

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
