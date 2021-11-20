const { winston, customLogLevels } = require("../winston");
const { LOG_CONFIG } = require("../../config");

const upperCaseLevelFormat = winston.format((info) => {
  info.level = info.level.toUpperCase();
  return info;
});

const logger = winston.createLogger({
  silent: !LOG_CONFIG.LOG_GENERAL,
  levels: customLogLevels.levels,
  transports: [
    new winston.transports.Console({
      level: "error",
      format: winston.format.combine(
        upperCaseLevelFormat(),
        winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
        winston.format.colorize(),
        winston.format.printf((info) => {
          return `${info.level}: ${info.timestamp} - ${info.message}`;
        })
      ),
    }),
  ],
});

module.exports = logger;
