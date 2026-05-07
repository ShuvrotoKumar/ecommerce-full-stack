const httpStatus = require('http-status');
const Cart = require('../models/cart.model');
const ApiError = require('../utils/ApiError');

const getCartByUserId = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
};

const addItemToCart = async (userId, item) => {
  const cart = await getCartByUserId(userId);
  const existingItemIndex = cart.items.findIndex(
    (i) => i.product.toString() === item.product.toString()
  );

  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity += item.quantity;
  } else {
    cart.items.push(item);
  }

  cart.totalAmount = cart.items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  return cart.save();
};

const removeItemFromCart = async (userId, productId) => {
  const cart = await getCartByUserId(userId);
  cart.items = cart.items.filter((item) => item.product.toString() !== productId);
  cart.totalAmount = cart.items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  return cart.save();
};

const clearCart = async (userId) => {
  const cart = await getCartByUserId(userId);
  cart.items = [];
  cart.totalAmount = 0;
  return cart.save();
};

module.exports = {
  getCartByUserId,
  addItemToCart,
  removeItemFromCart,
  clearCart,
};
