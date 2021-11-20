const httpStatus = require("http-status");
const APIError = require("../../responses/classes/APIError");

const internalServerErrorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof APIError)) {
    const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    const message = httpStatus[statusCode];
    const errorMessage = error.message ? error.message : null;
    error = new APIError(statusCode, message, errorMessage, err.stack);
  }
  next(error);
};

module.exports = internalServerErrorConverter;
