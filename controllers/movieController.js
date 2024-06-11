// controllers/movieController.js
const db = require("../models");
const logger = require("../helpers/logger");

const getAllMovies = async (req, res) => {
  try {
    const movies = await db.Movie.findAll();
    res.json(movies);
  } catch (error) {
    logger.error(`Error fetching movies: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMovieBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const movie = await db.Movie.findOne({ where: { slug } });
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    logger.error(`Error fetching movie: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createMovie = async (req, res) => {
  try {
    const {
      name,
      description,
      releaseDate,
      rating,
      ticketPrice,
      country,
      genres,
      photo,
    } = req.body;
    const slug = name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, ""); // Generate slug from name
    const movie = await db.Movie.create({
      name,
      description,
      releaseDate,
      rating,
      ticketPrice,
      country,
      genres,
      photo,
      slug,
    });
    res.status(201).json(movie);
  } catch (error) {
    logger.error(`Error creating movie: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      releaseDate,
      rating,
      ticketPrice,
      country,
      genres,
      photo,
    } = req.body;
    const movie = await db.Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    const slug = name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, ""); // Generate slug from name
    await movie.update({
      name,
      description,
      releaseDate,
      rating,
      ticketPrice,
      country,
      genres,
      photo,
      slug,
    });
    res.json(movie);
  } catch (error) {
    logger.error(`Error updating movie: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await db.Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    await movie.destroy();
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting movie: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllMovies,
  getMovieBySlug,
  createMovie,
  updateMovie,
  deleteMovie,
};
