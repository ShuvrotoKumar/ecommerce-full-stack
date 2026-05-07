const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const orderService = require('../services/order.service');

const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req.body, req.user);
  res.status(httpStatus.CREATED).send(order);
});

const getOrder = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.params.orderId);
  res.send(order);
});

const updateOrderToPaid = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderToPaid(req.params.orderId, req.body);
  res.send(order);
});

const updateOrderToDelivered = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderToDelivered(req.params.orderId);
  res.send(order);
});

const getMyOrders = catchAsync(async (req, res) => {
  const orders = await orderService.getMyOrders(req.user.id);
  res.send(orders);
});

const getAllOrders = catchAsync(async (req, res) => {
  const orders = await orderService.getAllOrders();
  res.send(orders);
});

const createPaymentIntent = catchAsync(async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await orderService.createPaymentIntent(amount);
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = {
  createOrder,
  getOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getAllOrders,
  createPaymentIntent,
};
