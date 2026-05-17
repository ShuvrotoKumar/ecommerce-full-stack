const express = require('express');
const reviewController = require('../controllers/review.controller');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { addReview, deleteReview } = require('../validations/review.validation');

const router = express.Router();

router.post('/:productId', auth(), validate(addReview), reviewController.addReview);
router.delete('/:productId/:reviewId', auth(), validate(deleteReview), reviewController.deleteReview);

module.exports = router;
