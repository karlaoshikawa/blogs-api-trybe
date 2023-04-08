const express = require('express');

const LoginRouter = require('./LoginRouter');
const UserRouter = require('./UserRouter');
const CategoryRouter = require('./CategoriesRouter');
const PostRouter = require('./PostRouter');

const router = express.Router();

router.use('/login', LoginRouter);
router.use('/user', UserRouter);
router.use('/categories', CategoryRouter);
router.use('/post', PostRouter);

module.exports = router;