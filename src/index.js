require("dotenv").config();
const { initializeHttpService } = require("./http");
const initializeAPI = require("./initializeAPI");
const logger = require("./logger/loggers/general.logger");

const bootstrapAPI = async () => {
  try {
    await initializeAPI();
    initializeHttpService();
  } catch (error) {
    logger.error(`API Bootstrap Error: ${error}`);
    process.exit(1);
  }
};

bootstrapAPI();
