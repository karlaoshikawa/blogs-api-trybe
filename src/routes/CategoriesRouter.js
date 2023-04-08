const express = require('express');

const categoryController = require('../controller/categories.controller');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', validateToken, categoryController.addCategory);
router.get('/', validateToken, categoryController.findAllCategories);

module.exports = router;