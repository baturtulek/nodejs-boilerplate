const { winston, customLogLevels } = require("../winston");
const DBRequestLogger = require("../CustomTransports/DBRequestLogger");
const { LOG_CONFIG } = require("../../config");

const upperCaseLevelFormat = winston.format((info) => {
  info.level = info.level.toUpperCase();
  return info;
});

const requestLogger = winston.createLogger({
  levels: customLogLevels.levels,
  transports: [
    new winston.transports.Console({
      level: "request",
      silent: !LOG_CONFIG.LOG_REQUESTS.LOG_TO_CONSOLE,
      format: winston.format.combine(
        upperCaseLevelFormat(),
        winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
        winston.format.colorize(),
        winston.format.printf((info) => {
          return `${info.level}: ${info.timestamp} - ${info.message.ip} - ${info.message.method} - ${info.message.url} - ${info.message.timeDiff}ms`;
        })
      ),
    }),
    new DBRequestLogger({
      level: "request",
      silent: !LOG_CONFIG.LOG_REQUESTS.LOG_TO_DB,
    }),
  ],
});

module.exports = requestLogger;
