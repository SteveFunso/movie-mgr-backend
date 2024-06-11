const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const { createMovieValidator } = require("../validators/movieValidator");
const { validationResult } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get("/", authMiddleware, movieController.getAllMovies);
router.get("/:slug", authMiddleware, movieController.getMovieBySlug);
router.post(
  "/create",
  authMiddleware,
  createMovieValidator,
  validate,
  movieController.createMovie
);
router.put(
  "/:id",
  authMiddleware,
  createMovieValidator,
  validate,
  movieController.updateMovie
);
router.delete("/:id", authMiddleware, movieController.deleteMovie);

module.exports = router;
