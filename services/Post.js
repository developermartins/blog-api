const { BlogPost, Category, Users } = require('../models');

const validateTitle = (title) => {
  if (!title) return { err: { status: 400, message: '"title" is required' } };
};

const validateContent = (content) => {
  if (!content) return { err: { status: 400, message: '"content" is required' } };
};

const validateCategory = (categoryIds) => {
  if (!categoryIds) return { err: { status: 400, message: '"categoryIds" is required' } };
};

const validateIfCategoriesExists = async (categoryIds) => {
  const categories = await Category.findAll({ where: { id: categoryIds } });

  if (categories.length === 0) return { err: { status: 400, message: '"categoryIds" not found' } };
};

const verifyPost = async (id) => {
  const post = await BlogPost.findOne({ where: { id } });

  if (!post) return { err: { status: 404, message: 'Post does not exist' } };
};

const createPost = async (userId, title, categoryIds, content) => {
  const validTitle = validateTitle(title);
  if (validTitle) return validTitle.err;
  const validContent = validateContent(content);
  if (validContent) return validContent.err;
  const validCategory = validateCategory(categoryIds);
  if (validCategory) return validCategory.err;
  const existsCategory = await validateIfCategoriesExists(categoryIds);
  if (existsCategory) return existsCategory.err;

  const post = await BlogPost.create({ userId, title, categoryIds, content });
  return post;
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
     include: [
       { model: Users, as: 'user', attributes: { exclude: ['password'] } },
       { model: Category, as: 'categories', through: { attributes: [] } },
       /*
        Referências:
        https://github.com/tryber/sd-09-project-blogs-api/pull/1/commits/ca76c9b74e001708f94f55e891dcf5c742763855
        https://living-sun.com/pt/mysql/571329-exclude-primary-key-attributes-from-a-sequelize-query-mysql-nodejs-sequelizejs.html
       */
      ],
    });

  return posts;
};

const getPostById = async (id) => {
  const getPost = await verifyPost(id);

  if (getPost) return getPost.err;

  const post = await BlogPost.findOne({ where: { id },
    include: [
    { model: Users, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
   ] });

   return post;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
};
