// controllers/commentController.js
const db = require("../models");
const logger = require("../helpers/logger");

const createComment = async (req, res) => {
  try {
    const { comment, movieId } = req.body;
    const { id: userId, username: name } = req.user; // Assuming user is authenticated and userId and username are available in req.user
    const newComment = await db.Comment.create({
      name,
      comment,
      movieId,
      userId,
    });
    res.status(201).json(newComment);
  } catch (error) {
    logger.error(`Error creating comment: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCommentsByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const comments = await db.Comment.findAll({ where: { movieId } });
    res.json(comments);
  } catch (error) {
    logger.error(`Error fetching comments: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createComment, getCommentsByMovie };
