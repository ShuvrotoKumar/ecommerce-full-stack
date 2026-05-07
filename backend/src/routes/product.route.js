const express = require('express');
const productController = require('../controllers/product.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth('admin'), productController.createProduct)
  .get(productController.getProducts);

router
  .route('/:productId')
  .get(productController.getProduct)
  .patch(auth('admin'), productController.updateProduct)
  .delete(auth('admin'), productController.deleteProduct);

module.exports = router;
