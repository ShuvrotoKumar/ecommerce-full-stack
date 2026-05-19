const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const orderService = require('../services/order.service');

const stripe = require('../config/stripe');

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
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // amount in cents
    currency: 'usd',
    metadata: { integration_check: 'accept_a_payment' },
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const createCheckoutSession = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.params.orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  
  const session = await orderService.createCheckoutSession(order, req.user);
  res.send({ url: session.url });
});

const stripeWebhook = catchAsync(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.metadata.orderId;
    
    await orderService.updateOrderToPaid(orderId, {
      id: session.payment_intent,
      status: 'succeeded',
      update_time: new Date().toISOString(),
      email_address: session.customer_details.email,
    });
  }

  res.json({ received: true });
});

module.exports = {
  createOrder,
  getOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getAllOrders,
  createPaymentIntent,
  createCheckoutSession,
  stripeWebhook,
};
