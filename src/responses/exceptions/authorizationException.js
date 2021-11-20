const httpStatus = require("http-status");
const APIError = require("../classes/APIError");

const authorizationException = (message) => {
  return new APIError(httpStatus.FORBIDDEN, message);
};

module.exports = authorizationException;
