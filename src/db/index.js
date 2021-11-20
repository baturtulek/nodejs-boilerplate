const { Sequelize } = require("sequelize");
const { loadModels, makeModelAssociations } = require("./models");
const { DB_CONFIG } = require("../config");
const logQueries = require("../middlewares/logger/queryLogger.middleware");
const logger = require("../logger/loggers/general.logger");

const sequelize = new Sequelize({ ...DB_CONFIG, logging: (query) => logQueries(query) });

const DB = {};
DB.sequelize = sequelize;

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connection established successfully.");
  } catch (error) {
    throw error;
  }
};

const initializeDatabase = () => {
  try {
    loadModels(DB, sequelize);
    makeModelAssociations(DB);
    logger.info("Database modals loaded successfully.");
  } catch (error) {
    throw error;
  }
};

const dropAndReCreateModels = async () => {
  await DB.sequelize.sync({ force: true });
};

module.exports = {
  DB,
  connectToDatabase,
  initializeDatabase,
  dropAndReCreateModels,
};
