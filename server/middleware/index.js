const asyncWrap = require("./asyncWrap");
const notFound = require("./notFound");
const defaultError = require("./defaultError");
const { signUpValidation, validationError } = require("./signUpValidation");
const { loginValidator, loginValidationError } = require("./loginValidator");
const {
  forgotDataValidator,
  forgotDataValidatorError,
} = require("./forgotPassValidator");
const {
  resetPasswordValidator,
  resetPasswordValidatorError,
} = require("./resetPasswordValidator");
const verifyToken = require("./verifyToken");

// index file to export all middleware
module.exports = {
  asyncWrap,
  notFound,
  defaultError,
  signUpValidation,
  validationError,
  loginValidator,
  loginValidationError,
  forgotDataValidator,
  forgotDataValidatorError,
  resetPasswordValidator,
  resetPasswordValidatorError,
  verifyToken,
};
