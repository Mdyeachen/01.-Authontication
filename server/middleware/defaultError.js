const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const defaultError = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || ReasonPhrases.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    status: false,
    message,
    errors: err.errors || null,
  });
};

// middleware to handle default errors
module.exports = defaultError;
