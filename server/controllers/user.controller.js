const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { asyncWrap } = require("../middleware");
const { BadRequest, CustomError } = require("../errors");
const User = require("../models/user.model");
const { generateTokenAndSetCookies } = require("../utils");
const sendMail = require("../sendMail/mailSender");
const { log } = require("console");

// login controller function
const login = asyncWrap(async (req, res) => {
  // get username and password from request body
  const { user, password } = req.body;

  // check the user is email or username
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = emailReg.test(user);

  // check if username/email and password are existing
  const foundUser = await User.findOne(
    isEmail ? { email: user } : { username: user }
  ).select("+password");

  // throw error if the user was missing or not found
  if (!foundUser) {
    throw new CustomError("User are not found", StatusCodes.NOT_FOUND);
  }

  // password validation checker
  const isPasswordValid = await bcrypt.compare(password, foundUser.password);

  // if password is not valid, throw an error
  if (!isPasswordValid) {
    throw new BadRequest("Password is not valid");
  }

  // generate jwttoken and set cookies
  generateTokenAndSetCookies(res, foundUser._id, foundUser.username);
  foundUser.lastLogin = new Date();

  // save last login time
  await foundUser.save();

  // sent email notification for login
  await sendMail(foundUser.email, "success", "Login Notification");

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Success to Login",
  });
});

// logout controller function
const logout = asyncWrap(async (req, res) => {
  // clear the token cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  // send response
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Logged out successfully",
  });
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

// verify Email Address
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

// resend or forgot Password
const forgotPassword = asyncWrap(async (req, res) => {
  const { email } = req.body;

  // find the user on db using email
  const user = await User.findOne({ email });

  // throw error if user are not found
  if (!user) {
    throw new BadRequest("User are not Found. Please Signup");
  }

  // generate reset password token and expiry
  const resetPasswordToken = crypto.randomBytes(32).toString("hex");
  const resetPasswordExpire = Date.now() + 60 * 1000 * 10; // expires in 10 minutes

  // send the reset password token to user email
  await sendMail(
    user.email,
    "reset",
    "Reset Password Token",
    `${process.env.CLIENT_URL}/reset-password?resetPasswordToken=${resetPasswordToken}`
  );

  // update user with reset token and expiry
  user.resetPasswordToken = resetPasswordToken;
  user.resetPasswordExpire = resetPasswordExpire;
  await user.save(); // save the user

  // send response
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Reset Password Token sent to eamil",
  });
});

// reset password
const resetPassword = asyncWrap(async (req, res) => {
  const { password } = req.body;
  const { resetPasswordToken } = req.params;

  // find user by reset token and check if token is not expired
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  // if user not found or token expired
  if (!user) {
    throw new BadRequest("Invalid or expired Reset Password Token");
  }

  // hash the new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // update user's password and clear reset token fields
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  // send confirmation email
  await sendMail(user.email, "success", "Password Reset Successful");

  // send response
  res.status(StatusCodes.OK).json({
    status: "Success",
    message: "Password has been reset successfully",
  });
});

// check authentication
const checkAuth = asyncWrap(async (req, res) => {
  const { userId, username } = req;

  // find user by id
  const user = await User.findById(userId);

  // throw error if user not found
  if (!user) {
    throw new CustomError("User not found", StatusCodes.NOT_FOUND);
  }

  // send response with user details
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "User is authenticated",
    user,
  });
});

// export controller functions
module.exports = {
  login,
  logout,
  signup,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
};
