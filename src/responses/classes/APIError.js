class APIError extends Error {
  constructor(statusCode, message, data, stack) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = APIError;
