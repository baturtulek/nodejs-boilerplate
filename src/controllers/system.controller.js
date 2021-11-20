const httpStatus = require("http-status");

const getApiStatus = (req, res, next) => {
  try {
    res.status(httpStatus.OK).json(
      successResponse({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date(),
      })
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getApiStatus,
};
