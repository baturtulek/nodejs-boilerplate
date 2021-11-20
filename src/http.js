const http = require("http");
const app = require("./app");
const { APP_CONFIG } = require("./config");
const logger = require("./logger/loggers/general.logger");

const server = http.createServer(app);

const initializeHttpService = async () => {
  server.listen(APP_CONFIG.PORT);
};

const onListeningHandler = () => {
  logger.info(`API is running at port ${APP_CONFIG.PORT} in '${APP_CONFIG.NODE_ENV}' environment.`);
};

const onErrorHandler = (error) => {
  logger.info(`HTTP Error: ${error}`);
  process.exit(1);
};

server.on("listening", onListeningHandler);
server.on("error", onErrorHandler);

module.exports = { initializeHttpService };
