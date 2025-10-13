const { body, validationResult } = require("express-validator");
const { CustomError } = require("../errors");

// Middleware for validation reset password data
const resetPasswordValidator = [
  body("password")
    .notEmpty()
    .withMessage("Password is Required")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be between 6 and 20 character long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*?])[A-Za-z\d!@#$%&*?]{6,20}$/
    )
    .withMessage(
      "Password must include at least one Uppercase letter, one lowercase letter, one number, and one special character"
    ),
];

// middleware for handling validation errors
const resetPasswordValidatorError = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const formatedErrors = error.array().reduce((acc, err) => {
      if (!acc.some((e) => e.path === err.path)) {
        acc.push({ path: err.path, msg: err.msg });
      }
      return acc;
    }, []);

    // throw validation error
    throw new CustomError("Validation Error Problem", 400, formatedErrors);
  }

  next();
};

// exporting the middleware
module.exports = {
  resetPasswordValidator,
  resetPasswordValidatorError,
};
