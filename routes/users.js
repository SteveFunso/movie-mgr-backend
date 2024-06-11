const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  registerUserValidator,
  loginUserValidator,
} = require("../validators/userValidator");
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
  "/register",
  registerUserValidator,
  validate,
  userController.registerUser
);
router.post("/login", loginUserValidator, validate, userController.loginUser);
router.get("/profile", authMiddleware, userController.getUserProfile);

module.exports = router;
