const logger = require("../../../logger/loggers/general.logger");
const SCHEMAS = require("../schemas");
const LOGIN_SCHEMA = require("../schemas/Login/login.schema.json");
const USER_CREATE_SCHEMA = require("../schemas/User/userCreate.schema.json");

const loadAuthRouteSchemas = (ajv) => {
  ajv.addSchema(LOGIN_SCHEMA, SCHEMAS.AUTH.LOGIN_SCHEMA);
};

const loadUserRouteSchemas = (ajv) => {
  ajv.addSchema(USER_CREATE_SCHEMA, SCHEMAS.USER.USER_CREATE_SCHEMA);
};

const loadSchemas = (ajv) => {
  try {
    loadAuthRouteSchemas(ajv);
    loadUserRouteSchemas(ajv);
    logger.info("Validation schemas loaded successfully.");
  } catch (error) {
    throw error;
  }
};

module.exports = loadSchemas;
