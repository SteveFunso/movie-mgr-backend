const { body } = require("express-validator");

const createCommentValidator = [
  body("comment").notEmpty().withMessage("Comment is required"),
  body("movieId").isInt().withMessage("Movie ID must be a valid integer"),
];

module.exports = { createCommentValidator };
