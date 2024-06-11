const { body } = require("express-validator");

const registerUserValidator = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage(
      "Password must be at least 6 characters long and must be a string"
    ),
];

const loginUserValidator = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = { registerUserValidator, loginUserValidator };
