const express = require('express');
const cartController = require('../controllers/cart.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.use(auth());

router
  .route('/')
  .get(cartController.getCart)
  .post(cartController.addToCart)
  .delete(cartController.clearCart);

router.delete('/:productId', cartController.removeFromCart);

module.exports = router;
