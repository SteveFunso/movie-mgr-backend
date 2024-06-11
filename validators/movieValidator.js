const { body } = require("express-validator");

const createMovieValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("releaseDate").isDate().withMessage("Release date must be a valid date"),
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5"),
  body("ticketPrice")
    .isFloat({ min: 0 })
    .withMessage("Ticket price must be a positive number"),
  body("country").notEmpty().withMessage("Country is required"),
  body("genres")
    .isArray({ min: 1 })
    .withMessage("Genres must be an array with at least one genre"),
  body("photo").notEmpty().withMessage("Photo is required"),
];

module.exports = { createMovieValidator };
