const {
  login,
  logout,
  signup,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
} = require("../controllers/user.controller");
const {
  signUpValidation,
  validationError,
  loginValidator,
  loginValidationError,
  forgotDataValidator,
  forgotDataValidatorError,
  resetPasswordValidator,
  resetPasswordValidatorError,
  verifyToken,
} = require("../middleware");
const express = require("express");
// user router
const router = express.Router();

// define routes
router.get("/check-auth", verifyToken, checkAuth);

router.post("/login", loginValidator, loginValidationError, login);
router.post("/logout", logout);
router.post("/signup", signUpValidation, validationError, signup);
router.post("/verify-email", verifyEmail);
router.post(
  "/forgot-password",
  forgotDataValidator,
  forgotDataValidatorError,
  forgotPassword
);
router.post(
  "/reset-password/:resetPasswordToken",
  resetPasswordValidator,
  resetPasswordValidatorError,
  resetPassword
);

// export the router
module.exports = router;
