const httpStatus = require('http-status');
const Order = require('../models/order.model');
const Product = require('../models/product.model');
const ApiError = require('../utils/ApiError');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createOrder = async (orderBody, user) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = orderBody;

  if (orderItems && orderItems.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No order items');
  }

  // Verify stock
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (!product || product.stock < item.quantity) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Product ${item.name} is out of stock or insufficient stock`);
    }
  }

  const order = new Order({
    user: user.id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  // Update stock
  for (const item of orderItems) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity }
    });
  }

  return createdOrder;
};

const getOrderById = async (id) => {
  const order = await Order.findById(id).populate('user', 'name email');
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  return order;
};

const updateOrderToPaid = async (orderId, paymentResult) => {
  const order = await getOrderById(orderId);
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: paymentResult.id,
    status: paymentResult.status,
    update_time: paymentResult.update_time,
    email_address: paymentResult.email_address,
  };
  return order.save();
};

const updateOrderToDelivered = async (orderId) => {
  const order = await getOrderById(orderId);
  order.isDelivered = true;
  order.deliveredAt = Date.now();
  order.status = 'Delivered';
  return order.save();
};

const getMyOrders = async (userId) => {
  return Order.find({ user: userId });
};

const getAllOrders = async () => {
  return Order.find({}).populate('user', 'id name');
};

const createPaymentIntent = async (amount) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // amount in cents
    currency: 'usd',
    metadata: { integration_check: 'accept_a_payment' },
  });
  return paymentIntent;
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getAllOrders,
  createPaymentIntent,
};
