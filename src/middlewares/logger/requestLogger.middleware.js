const requestLogger = require("../../logger/loggers/request.logger");

const parseUserIp = (ip) => {
  let userIp = ip;
  if (userIp) {
    if (userIp === "::1") {
      userIp = "127.0.0.1";
    } else if (userIp.startsWith("::ffff:")) {
      userIp = userIp.split("::ffff:").join("");
    }
  }
  return userIp;
};

const removeQueryVariablesFromUrl = (url) => {
  return url.split(/[?#]/)[0];
};

const removeParamVariablesFromUrl = (pathUrl, params) => {
  const splittedUrlArray = pathUrl.split("/");
  const paramValues = Object.values(params);
  const removedParamsFromUrlArray = splittedUrlArray.filter(
    (element) => element !== "" && !paramValues.includes(element)
  );
  return removedParamsFromUrlArray.join("/");
};

const logger = (req, res, next) => {
  const startTime = new Date();
  res.on("finish", () => {
    const endTime = new Date();
    const timeDiff = (endTime - startTime) / 1000;
    const ip = parseUserIp(req.ip);
    const userId = req.user ? req.user.uid : null;
    const { originalUrl, method, body, params, query } = req;
    const path = removeQueryVariablesFromUrl(originalUrl);
    const cleanPath = removeParamVariablesFromUrl(path, params);
    const userAgent = req.get("User-Agent");
    const accessLog = { userId, ip, url: cleanPath, method, body, query, params, userAgent, timeDiff };
    requestLogger.request(accessLog);
  });
  next();
};

module.exports = logger;
