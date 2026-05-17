const express = require('express');
const orderController = require('../controllers/order.controller');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { 
  createOrder,
  getOrder,
  createCheckoutSession
} = require('../validations/order.validation');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(createOrder), orderController.createOrder)
  .get(auth('admin'), orderController.getAllOrders);

router.get('/myorders', auth(), orderController.getMyOrders);
router.post('/create-payment-intent', auth(), orderController.createPaymentIntent);
router.post('/:orderId/checkout-session', auth(), validate(createCheckoutSession), orderController.createCheckoutSession);

router
  .route('/:orderId')
  .get(auth(), validate(getOrder), orderController.getOrder);

router.patch('/:orderId/pay', auth(), validate(getOrder), orderController.updateOrderToPaid);
router.patch('/:orderId/deliver', auth('admin'), validate(getOrder), orderController.updateOrderToDelivered);

// Stripe webhook - needs raw body
router.post('/webhook', express.raw({type: 'application/json'}), orderController.stripeWebhook);

module.exports = router;
