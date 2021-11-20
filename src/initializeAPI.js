const AJV = require("./middlewares/validation/ajv/ajv");
const loadEndpointValidationSchemas = require("./middlewares/validation/ajv/loadSchemas");
const { connectToDatabase, initializeDatabase: initializeDatabaseModals, dropAndReCreateModels } = require("./db");
const { makeSuccessResponseGloballyAccessible } = require("./responses/success/successReponse");
const validateEnvVariables = require("./utils/validateEnvVariables");

const initializeAPI = async () => {
  try {
    validateEnvVariables();
    await connectToDatabase();
    await initializeDatabaseModals();
    await dropAndReCreateModels();
    loadEndpointValidationSchemas(AJV);
    makeSuccessResponseGloballyAccessible();
  } catch (error) {
    throw error;
  }
};

module.exports = initializeAPI;
