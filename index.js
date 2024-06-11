const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./helpers/logger");
const errorHandler = require("./middlewares/errorHandler");
const movieRoutes = require("./routes/movies");
const userRoutes = require("./routes/users");
const commentRoutes = require("./routes/comments");
const db = require("./models/index.js");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Logging middleware
app.use((req, res, next) => {
  logger.info(`HTTP ${req.method} ${req.url}`);
  next();
});

// Redirect from / to /movies
app.get("/", (req, res) => {
  res.redirect("/api/movies");
});

// Routes
app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);

// Error handling middleware
app.use(errorHandler);

// Sync models with the database and start server
const PORT = process.env.PORT || 5000;
db.sequelize.sync({ force: false }).then(() => {
  if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  }
});

module.exports = app; // Export the app for testing
