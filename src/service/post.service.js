const { BlogPost, PostCategory, User, Category, sequelize } = require('../models');

const createPost = async ({ title, content, userId, categoryIds }) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const post = await BlogPost.create(
        { title, content, userId, published: new Date(), updated: new Date() },
        { transaction: t },
      );

      const postId = post.id;

      const category = await categoryIds.map(async (categoryId) =>
        PostCategory.create({ categoryId, postId }, { transaction: t }));

      await Promise.all(category);

      return post;
      });

    return result;
  } catch (err) {
    return err;
  }
};

const getAllPosts = async () => {
  const result = BlogPost
    .findAll({
      include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
       { model: Category, as: 'categories', attributes: { exclude: ['PostCategory'] } }] });
  return result;
};

const getPostsById = async (id) => {
  const result = BlogPost
    .findOne({ where: { id },
      include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
       { model: Category, as: 'categories', attributes: { exclude: ['PostCategory'] } }] });
  return result;
};

const changePost = async (id, title, content) => {
  await BlogPost.update({ title, content }, { where: { id } });
  const result = await getPostsById(id);
  return result;
};

const deletePost = async (id) => BlogPost.destroy({ where: { id } });

const searchPost = async (data) => {
  const posts = await getAllPosts();
  const result = posts.filter((post) => post.title.includes(data) 
    || post.content.includes(data));
  console.log('filter', result);
    return result;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostsById,
  changePost,
  deletePost,
  searchPost,
};