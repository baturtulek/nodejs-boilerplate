const winston = require("winston");

const customLogLevels = {
  levels: {
    info: 0,
    request: 1,
    query: 2,
    error: 3,
  },
  colors: {
    info: "green",
    request: "blue",
    query: "yellow",
    error: "red",
  },
};

winston.addColors(customLogLevels.colors);

module.exports = { winston, customLogLevels };
