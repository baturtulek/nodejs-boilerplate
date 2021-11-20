const errorLogger = require("../../logger/loggers/error.logger");

const errorHandler = (err, req, res, next) => {
  const { statusCode, message, stack, errorDetail } = err;
  let error = { statusCode, message, stack };
  if (req.user) {
    const { uid: userId } = req.user;
    error = {
      ...error,
      userId,
    };
  }
  if (errorDetail) {
    error = {
      ...error,
      errorDetail,
    };
  }
  errorLogger.error(error);
  next(err);
};

module.exports = errorHandler;
