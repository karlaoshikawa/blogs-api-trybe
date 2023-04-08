const express = require('express');

const postController = require('../controller/post.controller');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', validateToken, postController.createPost);
router.get('/', validateToken, postController.getAllPosts);
router.get('/search', validateToken, postController.searchPost);
router.get('/:id', validateToken, postController.getPostsById);
router.put('/:id', validateToken, postController.changePost);
router.delete('/:id', validateToken, postController.deletePost);

module.exports = router;