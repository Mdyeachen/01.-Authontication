const { StatusCodes, ResonPhrases } = require("http-status-codes");

class CustomError extends Error {
  constructor(message, status, errors = null) {
    super(message);
    this.status = status;
    if (errors) this.errors = errors;
  }
}

// export default CustomError;
module.exports = CustomError;
