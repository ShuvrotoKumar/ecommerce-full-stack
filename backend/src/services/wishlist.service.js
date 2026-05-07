const httpStatus = require('http-status');
const Wishlist = require('../models/wishlist.model');
const ApiError = require('../utils/ApiError');

const getWishlistByUserId = async (userId) => {
  let wishlist = await Wishlist.findOne({ user: userId }).populate('products');
  if (!wishlist) {
    wishlist = await Wishlist.create({ user: userId, products: [] });
  }
  return wishlist;
};

const addProductToWishlist = async (userId, productId) => {
  const wishlist = await getWishlistByUserId(userId);
  if (!wishlist.products.includes(productId)) {
    wishlist.products.push(productId);
  }
  return wishlist.save();
};

const removeProductFromWishlist = async (userId, productId) => {
  const wishlist = await getWishlistByUserId(userId);
  wishlist.products = wishlist.products.filter((id) => id.toString() !== productId);
  return wishlist.save();
};

module.exports = {
  getWishlistByUserId,
  addProductToWishlist,
  removeProductFromWishlist,
};
