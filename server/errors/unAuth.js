const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const CustomError = require("./customError");

class UnAuth extends CustomError {
  constructor(message) {
    super(message || ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
  }
}

// export default UnAuth;
module.exports = UnAuth;
