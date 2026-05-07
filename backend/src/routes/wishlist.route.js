const express = require('express');
const wishlistController = require('../controllers/wishlist.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.use(auth());

router
  .route('/')
  .get(wishlistController.getWishlist)
  .post(wishlistController.addToWishlist);

router.delete('/:productId', wishlistController.removeFromWishlist);

module.exports = router;
