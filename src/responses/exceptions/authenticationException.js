const httpStatus = require("http-status");
const APIError = require("../classes/APIError");

const authenticationException = (message) => {
  return new APIError(httpStatus.UNAUTHORIZED, message);
};

module.exports = authenticationException;
