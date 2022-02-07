const rescue = require('express-rescue');
const Post = require('../services/Post');

const createPost = rescue(async (req, res, next) => {
  const { title, categoryIds, content } = req.body;
  const { id: userId } = req.user;

  const post = await Post.createPost(userId, title, categoryIds, content);

  if (post.message) return next(post);

  return res.status(201).json(post);
});

const getAllPosts = rescue(async (_req, res, _next) => {
  const allPosts = await Post.getAllPosts();

  return res.status(200).json(allPosts);
});

const getPostById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.getPostById(id);

  if (post.message) return next(post);

  return res.status(200).json(post);
});

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
};
