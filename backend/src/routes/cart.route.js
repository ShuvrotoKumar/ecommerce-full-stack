const express = require('express');
const cartController = require('../controllers/cart.controller');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { addToCart, removeFromCart } = require('../validations/cart.validation');

const router = express.Router();

router.use(auth());

router
  .route('/')
  .get(cartController.getCart)
  .post(validate(addToCart), cartController.addToCart)
  .delete(cartController.clearCart);

router.delete('/:productId', validate(removeFromCart), cartController.removeFromCart);

module.exports = router;
