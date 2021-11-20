const queryLogger = require("../../logger/loggers/query.logger");

const logQueries = (query) => {
  queryLogger.query(query);
};

module.exports = logQueries;
