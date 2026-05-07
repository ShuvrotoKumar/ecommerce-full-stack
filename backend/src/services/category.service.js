const httpStatus = require('http-status');
const Category = require('../models/category.model');
const ApiError = require('../utils/ApiError');

const createCategory = async (categoryBody) => {
  if (await Category.findOne({ name: categoryBody.name })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category already exists');
  }
  return Category.create(categoryBody);
};

const getCategories = async () => {
  return Category.find().populate('parent', 'name');
};

const getCategoryById = async (id) => {
  const category = await Category.findById(id).populate('parent', 'name');
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  return category;
};

const updateCategoryById = async (categoryId, updateBody) => {
  const category = await getCategoryById(categoryId);
  Object.assign(category, updateBody);
  await category.save();
  return category;
};

const deleteCategoryById = async (categoryId) => {
  const category = await getCategoryById(categoryId);
  await category.remove();
  return category;
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
