const { asyncWrap } = require("../middleware");
const { BadRequest } = require("../errors");

// login controller function
const login = asyncWrap(async (req, res) => {
  res.send("Login route");
});

// logout controller function
const logout = asyncWrap(async (req, res) => {
  res.send("Logout route");
});

// signup controller function
const signup = asyncWrap(async (req, res) => {
  // extract user details from request body
  const { username, email, password, name } = req.body;

  // basic validation
  if (!username.trim() || !email.trim() || !password.trim()) {
    throw new BadRequest("Please provide username, email and password");
  }

  res.send("Signup route");
});

// export controller functions
module.exports = {
  login,
  logout,
  signup,
};
