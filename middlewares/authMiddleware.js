const jwt = require("jsonwebtoken");
const logger = require("../helpers/logger");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    logger.warn("No token provided");
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Split the "Bearer" keyword and the token
  if (!token) {
    logger.warn("No token provided");
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    logger.warn("Invalid token");
    res.status(400).json({ error: "Invalid token." });
  }
};

module.exports = authMiddleware;
