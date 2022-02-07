const Post = (sequelize, DataTypes) => {
  const post = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { timestamps: false });

  post.associate = (models) => {
    post.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return post;
};

module.exports = Post;
