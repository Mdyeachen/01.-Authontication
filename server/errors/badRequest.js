const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const CustomError = require("./customError");

class BadRequest extends CustomError {
  constructor(message) {
    super(message || ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST);
  }
}

// export default BadRequest;
module.exports = BadRequest;
