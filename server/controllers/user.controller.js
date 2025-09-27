const bcrypt = require("bcryptjs");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { asyncWrap } = require("../middleware");
const { BadRequest } = require("../errors");
const User = require("../models/user.model");

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

  console.log({ username, email, password, name });

  // user existence check
  const userExisted = await User.findOne({
    $or: [{ email }, { username }],
  }).lean();
  // if user exists, throw an error
  if (userExisted) {
    throw new BadRequest("User already exists");
  }

  // hash the password before saving
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // verification token and expiry can be added here if needed
  const verificationToken = Math.floor(
    Math.random() * 900000 + 100000
  ).toString();
  const verificationTokenExpire = Date.now() + 1000 * 60 * 10; // expires in 10 minutes

  // create the user and save to database
  const userData = {
    username,
    email,
    password: hashPassword,
    name,
    verificationToken,
    verificationTokenExpire,
  };
  const user = await User.create(userData);

  // respond with success message and user details
  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: ReasonPhrases.CREATED,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
    },
  });
});

// export controller functions
module.exports = {
  login,
  logout,
  signup,
};
