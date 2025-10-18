const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const notFound = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    status: false,
    message: ReasonPhrases.NOT_FOUND,
  });
};

// middleware to handle 404 errors
module.exports = notFound;
