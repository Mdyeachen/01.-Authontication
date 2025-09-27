const asyncWrap = require("./asyncWrap");
const notFound = require("./notFound");
const defaultError = require("./defaultError");
const { signUpValidation, validationError } = require("./signUpValidation");

// index file to export all middleware
module.exports = {
  asyncWrap,
  notFound,
  defaultError,
  signUpValidation,
  validationError,
};
