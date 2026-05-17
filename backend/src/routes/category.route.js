const express = require('express');
const categoryController = require('../controllers/category.controller');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { 
  createCategory, 
  getCategories, 
  getCategory, 
  updateCategory, 
  deleteCategory 
} = require('../validations/category.validation');

const router = express.Router();

router
  .route('/')
  .post(auth('admin'), validate(createCategory), categoryController.createCategory)
  .get(validate(getCategories), categoryController.getCategories);

router
  .route('/:categoryId')
  .get(validate(getCategory), categoryController.getCategory)
  .patch(auth('admin'), validate(updateCategory), categoryController.updateCategory)
  .delete(auth('admin'), validate(deleteCategory), categoryController.deleteCategory);

module.exports = router;
