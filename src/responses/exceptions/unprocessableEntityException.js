const httpStatus = require("http-status");
const APIError = require("../classes/APIError");

const unprocessableEntityException = (message) => {
  return new APIError(httpStatus.UNPROCESSABLE_ENTITY, message);
};

module.exports = unprocessableEntityException;
