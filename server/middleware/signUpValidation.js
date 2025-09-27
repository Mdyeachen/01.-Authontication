const { body, validationResult } = require("express-validator");
const { BadRequest } = require("../errors");

// Middleware for validating sign-up data
const signUpValidation = [
  body("username")
    .trim()
    .notEmpty()
    .isLength({ min: 5, max: 20 })
    .withMessage("Username must be between 5 and 20 characters Long")
    .matches(/^[A-Za-z0-9!@#$%^&*()]*$/)
    .withMessage(
      "Username must be alphanumeric and can include special characters !@#$%^&*()"
    ),

  body("email")
    .notEmpty()
    .trim()
    .isEmail({ allow_utf8_local_part: false, allow_ip_domain: false })
    .withMessage("Invalid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be between 6 and 20 characters Long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*?])[A-Za-z\d!@#$%&*?]{6,20}$/
    )
    .withMessage(
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  body("name")
    .isLength({ max: 50 })
    .optional({ checkFalsy: true })
    .matches(/^[A-Za-z\s]*$/),
];

const validationError = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formatedErrors = errors.array().reduce((acc, err) => {
      if (!acc.some((e) => e.path === err.path)) {
        acc.push({ path: err.path, msg: err.msg });
      }
      return acc;
    }, []);

    throw new BadRequest("Validation Error Problem", formatedErrors);
  }
  next();
};

// exporting the middleware
module.exports = {
  signUpValidation,
  validationError,
};
