const express = require('express');
const wishlistController = require('../controllers/wishlist.controller');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { addToWishlist, removeFromWishlist } = require('../validations/wishlist.validation');

const router = express.Router();

router.use(auth());

router
  .route('/')
  .get(wishlistController.getWishlist)
  .post(validate(addToWishlist), wishlistController.addToWishlist);

router.delete('/:productId', validate(removeFromWishlist), wishlistController.removeFromWishlist);

module.exports = router;
