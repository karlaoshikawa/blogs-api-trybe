const categoryService = require('../service/categories.service');

const addCategory = async (req, res) => {
  const { name } = req.body;
  
  if (!name) return res.status(400).json({ message: '"name" is required' });
  const result = await categoryService.addCategory({ name });
  
  return res.status(201).json(result);
};

const findAllCategories = async (req, res) => {
  const result = await categoryService.findAllCategories();
  return res.status(200).json(result);
};

  module.exports = {
  addCategory,
  findAllCategories,
};