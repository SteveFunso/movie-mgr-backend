// models/comment.js
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    movieId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Movies",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Movie, {
      foreignKey: "movieId",
      as: "movie",
    });
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return Comment;
};
