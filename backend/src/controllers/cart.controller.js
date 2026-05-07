const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const cartService = require('../services/cart.service');

const getCart = catchAsync(async (req, res) => {
  const cart = await cartService.getCartByUserId(req.user.id);
  res.send(cart);
});

const addToCart = catchAsync(async (req, res) => {
  const cart = await cartService.addItemToCart(req.user.id, req.body);
  res.send(cart);
});

const removeFromCart = catchAsync(async (req, res) => {
  const cart = await cartService.removeItemFromCart(req.user.id, req.params.productId);
  res.send(cart);
});

const clearCart = catchAsync(async (req, res) => {
  const cart = await cartService.clearCart(req.user.id);
  res.send(cart);
});

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
};
