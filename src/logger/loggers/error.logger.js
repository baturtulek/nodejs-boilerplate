const { winston, customLogLevels } = require("../winston");
const DBErrorLogger = require("../CustomTransports/DBErrorLogger");
const { LOG_CONFIG } = require("../../config");

const upperCaseLevelFormat = winston.format((info) => {
  info.level = info.level.toUpperCase();
  return info;
});

const errorLogger = winston.createLogger({
  levels: customLogLevels.levels,
  transports: [
    new winston.transports.Console({
      level: "error",
      silent: !LOG_CONFIG.LOG_ERRORS.LOG_TO_CONSOLE,
      format: winston.format.combine(
        upperCaseLevelFormat(),
        winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
        winston.format.colorize(),
        winston.format.printf((info) => {
          return `${info.level}: ${info.timestamp} - ${info.statusCode} - ${info.message} ${
            info.errorDetail ? JSON.stringify(info.errorDetail) : ""
          }`;
        })
      ),
    }),
    new DBErrorLogger({
      level: "error",
      silent: !LOG_CONFIG.LOG_ERRORS.LOG_TO_DB,
    }),
  ],
});

module.exports = errorLogger;
