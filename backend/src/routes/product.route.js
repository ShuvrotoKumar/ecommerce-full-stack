const express = require('express');
const productController = require('../controllers/product.controller');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { 
  createProduct, 
  getProducts, 
  getProduct, 
  updateProduct, 
  deleteProduct 
} = require('../validations/product.validation');

const router = express.Router();

router
  .route('/')
  .post(auth('admin'), validate(createProduct), productController.createProduct)
  .get(validate(getProducts), productController.getProducts);

router
  .route('/:productId')
  .get(validate(getProduct), productController.getProduct)
  .patch(auth('admin'), validate(updateProduct), productController.updateProduct)
  .delete(auth('admin'), validate(deleteProduct), productController.deleteProduct);

module.exports = router;
