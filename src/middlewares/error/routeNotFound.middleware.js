const notFoundException = require("../../responses/exceptions/notFoundException");
const { ROUTE_NOT_FOUND } = require("../../responses/messages");

const routeNotFoundHandler = (req, res, next) => {
  const { method, originalUrl } = req;
  next(notFoundException(ROUTE_NOT_FOUND, { method, url: originalUrl }));
};

module.exports = routeNotFoundHandler;
