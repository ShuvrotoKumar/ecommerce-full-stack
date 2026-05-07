const express = require('express');
const reviewController = require('../controllers/review.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/:productId', auth(), reviewController.addReview);
router.delete('/:productId/:reviewId', auth(), reviewController.deleteReview);

module.exports = router;
