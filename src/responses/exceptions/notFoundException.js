const httpStatus = require("http-status");
const APIError = require("../classes/APIError");

const notFoundException = (message, data) => {
  return new APIError(httpStatus.NOT_FOUND, message, data);
};

module.exports = notFoundException;
