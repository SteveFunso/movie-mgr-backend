const logger = require("../helpers/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );

  const status = err.status || 500;
  const response = {
    status,
    message: err.message || "Internal Server Error",
  };

  if (err.errors) {
    response.errors = err.errors;
  }

  res.status(status).json(response);
};

module.exports = errorHandler;
