const { Category } = require('../models');

const addCategory = async (name) => Category.create(name);

const findAllCategories = async () => Category.findAll();

const findCategoryById = async (ids) => {
  const categories = await ids.map((categoryId) => Category.findOne({ where: { id: categoryId } }));
  const result = await Promise.all(categories);
  return result;
};
  
module.exports = {
  addCategory,
  findAllCategories,
  findCategoryById,
};