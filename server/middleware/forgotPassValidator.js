const { body, validationResult } = require("express-validator");
const { CustomError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

// Middleware for validation forgotPassword data
const forgotDataValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),
];

// validation error
const forgotDataValidatorError = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const formatedErrors = error.array().reduce((acc, err) => {
      if (!acc.some((e) => e.path === err.path)) {
        acc.push({ path: err.path, msg: err.msg });
      }

      return acc;
    }, []);

    throw new CustomError(
      "Email is not valid",
      StatusCodes.BAD_REQUEST,
      formatedErrors
    );
  }

  next();
};

module.exports = {
  forgotDataValidator,
  forgotDataValidatorError,
};
