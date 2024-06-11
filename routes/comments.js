const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { createCommentValidator } = require("../validators/commentValidator");
const { validationResult } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post(
  "/",
  authMiddleware,
  createCommentValidator,
  validate,
  commentController.createComment
);
router.get("/:movieId", commentController.getCommentsByMovie);

module.exports = router;
