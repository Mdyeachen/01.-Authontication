const bcrypt = require("bcryptjs");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { asyncWrap } = require("../middleware");
const { BadRequest } = require("../errors");
const User = require("../models/user.model");
const { generateTokenAndSetCookies } = require("../utils");
const sendMail = require("../sendMail/mailSender");

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

  // send the varification token here
  await sendMail(
    userData.email,
    "verify",
    "verification Token",
    userData.verificationToken
  );

  const user = await User.create(userData);

  // generate jwttoken and set cookies
  generateTokenAndSetCookies(res, user._id, user.username);

  // respond with success message and user details
  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: ReasonPhrases.CREATED,
    user: {
      ...user._doc,
      password: undefined,
    },
  });
});
const verifyEmail = asyncWrap(async (req, res) => {
  const { code } = req.body;

  // find user by verification token
  const user = await User.findOne({
    verificationToken: code,
    verificationTokenExpire: { $gt: Date.now() },
  });

  // if user not found or token expired
  if (!user) {
    throw new BadRequest("Verification code is invalid or expired");
  }

  // update user verification status
  user.verificationToken = undefined;
  user.verificationTokenExpire = undefined;
  user.isVarifed = true;
  await user.save();

  // send confirmation email (await ensures error handling)
  await sendMail(user.email, "success", "Confirmation Message");

  // send response
  res.status(StatusCodes.ACCEPTED).json({
    status: "success",
    message: "Verification successful",
    user: {
      ...user._doc,
      password: undefined,
      verificationToken: undefined,
      verificationTokenExpire: undefined,
    },
  });
});

// export controller functions
module.exports = {
  login,
  logout,
  signup,
  verifyEmail,
};
