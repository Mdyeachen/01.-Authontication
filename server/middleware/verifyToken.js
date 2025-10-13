const jwttoken = require("jsonwebtoken");
const { UnAuth } = require("../errors");

// verify token when user request get method
const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new UnAuth("You are not authorized. Please Login.");
  }

  // verify the token
  const decoded = jwttoken.verify(token, process.env.JSONSECRET);

  // if token is not valid, throw an error
  if (!decoded) {
    throw new UnAuth("Invalid Token. Please Login again.");
  }

  // check if the token has expired
  if (decoded.exp * 1000 < Date.now()) {
    throw new UnAuth("Token has expired. Please Login again.");
  }

  // attach the user to the request object
  // so that we can use it in the next middleware/function
  req.userId = decoded.id;
  req.username = decoded.username;

  // proceed to the next middleware/function
  next();
};

// export the middleware
module.exports = verifyToken;
