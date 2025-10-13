const { body, validationResult } = require("express-validator");
const { CustomError } = require("../errors");

// Middleware for validation login data
const loginValidator = [
  body("user")
    .notEmpty()
    .withMessage("Username or Email is Required")
    .bail()
    .custom((value) => {
      const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const usernameReg = /^[A-Za-z0-9!@#$%^&*()]*$/;

      if (!emailReg.test(value) && !usernameReg.test(value)) {
        throw new CustomError("Please enter a valid username or email", 400);
      }

      return true;
    }),
  body("password").notEmpty().withMessage("password is required"),
];

// middleware to handle validation errors
const loginValidationError = (req, res, next) => {
  const errors = validationResult(req);

  // if there are validation errors, format and send them
  if (!errors.isEmpty()) {
    const formatedErrors = errors.array().reduce((acc, err) => {
      if (!acc.some((e) => e.path === err.path)) {
        acc.push({ path: err.path, msg: err.msg });
      }

      return acc;
    }, []);

    // throw a bad request error with formated errors
    throw new BadRequest("Validation Error Problem", formatedErrors);
  }

  // if validation passed, proceed to the next middleware/controller
  next();
};

// exporting the middleware
module.exports = {
  loginValidator,
  loginValidationError,
};
