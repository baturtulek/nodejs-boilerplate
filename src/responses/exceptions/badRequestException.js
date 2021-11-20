const httpStatus = require("http-status");
const APIError = require("../classes/APIError");

const badRequestException = (message, data) => {
  return new APIError(httpStatus.BAD_REQUEST, message, data);
};

module.exports = badRequestException;
