const express = require('express');
const categoryController = require('../controllers/category.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth('admin'), categoryController.createCategory)
  .get(categoryController.getCategories);

router
  .route('/:categoryId')
  .get(categoryController.getCategory)
  .patch(auth('admin'), categoryController.updateCategory)
  .delete(auth('admin'), categoryController.deleteCategory);

module.exports = router;
