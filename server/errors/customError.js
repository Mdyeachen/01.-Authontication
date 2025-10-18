const { StatusCodes, ResonPhrases } = require("http-status-codes");

class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

// export default CustomError;
module.exports = CustomError;
