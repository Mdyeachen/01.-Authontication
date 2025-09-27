const { login, logout, signup } = require("../controllers/user.controller");
const { signUpValidation, validationError } = require("../middleware");
const express = require("express");
// user router
const router = express.Router();

// define routes
router.post("/login", login);
router.post("/logout", logout);
router.post("/signup", signUpValidation, validationError, signup);

// export the router
module.exports = router;
