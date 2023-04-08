const postService = require('../service/post.service');
const categoryService = require('../service/categories.service');

const createPost = async (req, res) => {
    const { title, content, categoryIds } = req.body;
  const userId = req.payload.id;

    if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
    }
  
    const hasCategory = await categoryService.findCategoryById(categoryIds);
  if (hasCategory.includes(null)) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }
  const result = await postService.createPost({ title, content, userId, categoryIds });
  return res.status(201).json(result);
};

const getAllPosts = async (req, res) => {
  const result = await postService.getAllPosts();
  return res.status(200).json(result);
};

const getPostsById = async (req, res) => {
  const { id } = req.params;
  const result = await postService.getPostsById(id);

  if (!result) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  return res.status(200).json(result);
};

const changePost = async (req, res) => {
  const userId = req.payload.id;
  const { id } = req.params;
  const { title, content } = req.body;
  
  const user = await postService.getPostsById(id);
  if (user.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const result = await postService.changePost(id, title, content);

  return res.status(200).json(result);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.payload.id;

  const user = await postService.getPostsById(id);
  if (user === null) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  if (user.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  await postService.deletePost(id);

  return res.status(204).end();
};

const searchPost = async (req, res) => {
  const data = req.query.q;
console.log('allPosts', data);
  if (!data) {
    const allPost = await postService.getAllPosts();
    return res.status(200).json(allPost);
  }

  let result = await postService.searchPost(data);
  if (!result) result = [];
  return res.status(200).json(result);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostsById,
  changePost,
  deletePost,
  searchPost,
};