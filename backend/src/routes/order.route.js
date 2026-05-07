const express = require('express');
const orderController = require('../controllers/order.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(), orderController.createOrder)
  .get(auth('admin'), orderController.getAllOrders);

router.get('/myorders', auth(), orderController.getMyOrders);
router.post('/create-payment-intent', auth(), orderController.createPaymentIntent);
router.post('/:orderId/checkout-session', auth(), orderController.createCheckoutSession);

router
  .route('/:orderId')
  .get(auth(), orderController.getOrder);

router.patch('/:orderId/pay', auth(), orderController.updateOrderToPaid);
router.patch('/:orderId/deliver', auth('admin'), orderController.updateOrderToDelivered);

// Stripe webhook - needs raw body
router.post('/webhook', express.raw({type: 'application/json'}), orderController.stripeWebhook);

module.exports = router;
