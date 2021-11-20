const { DB } = require("../db");

const insertRequestLog = async (requestObj) => {
  const { ip, method, url, body, params, query, timeDiff, userAgent } = requestObj;
  try {
    await DB.RequestLog.create({
      ip,
      url,
      httpMethod: method,
      httpBody: JSON.stringify(body),
      httpParams: JSON.stringify(params),
      httpQuery: JSON.stringify(query),
      requestProcessTime: timeDiff,
      userAgent,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.log(error);
  }
};

const insertErrorLog = async (errorObj) => {
  const { statusCode, message, level, stack, userId, errorDetail } = errorObj;
  try {
    await DB.ErrorLog.create({
      statusCode,
      message,
      errorDetail: JSON.stringify(errorDetail),
      level: level.toUpperCase(),
      stackTrace: stack,
      station: "API",
      userId,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  insertRequestLog,
  insertErrorLog,
};
