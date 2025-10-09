const {
  login,
  logout,
  signup,
  verifyEmail,
} = require("../controllers/user.controller");
const { signUpValidation, validationError } = require("../middleware");
const express = require("express");
// user router
const router = express.Router();

// define routes
router.post("/login", login);
router.post("/logout", logout);
router.post("/signup", signUpValidation, validationError, signup);
router.post("/verify-email", verifyEmail);

// export the router
module.exports = router;
