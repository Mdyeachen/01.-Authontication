const asyncWrap = require("./asyncWrap");
const notFound = require("./notFound");
const defaultError = require("./defaultError");

// index file to export all middleware
module.exports = {
  asyncWrap,
  notFound,
  defaultError,
};
