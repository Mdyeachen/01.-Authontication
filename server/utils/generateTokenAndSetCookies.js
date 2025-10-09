const jwt = require("jsonwebtoken");

/**
 *
 * @param {object} res - Express response Object
 * @param {*} id - User ID
 * @param {*} username - Username
 * @returns {string} - return the jwt token as a string
 */

const generateTokenAndSetCookies = (res, id, username) => {
  const token = jwt.sign(
    { id, username },
    process.env.JSONSECRET, // secret from env
    { expiresIn: "7d" } // token validity
  );

  // set cookie
  res.cookie("token", token, {
    httpOnly: true, // not accessible from JS
    secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    sameSite: "strict", // CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token; // useful if you also want to return it in JSON
};

module.exports = generateTokenAndSetCookies;
