const { APP_CONFIG } = require("../../config");

const errorHandler = (err, req, res, next) => {
  const response = {
    status: "error",
    error: {
      code: err.statusCode,
      message: err.message,
      data: err.data,
    },
  };
  if (err.stack && APP_CONFIG.NODE_ENV === "development") {
    response.error.stack = err.stack;
  }
  res.status(err.statusCode).json(response);
};

module.exports = errorHandler;
