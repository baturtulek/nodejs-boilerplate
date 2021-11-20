const { cleanEnv, port, str, host, bool, EnvError, EnvMissingError } = require("envalid");
const logger = require("../logger/loggers/general.logger");

const concatEnvVariableErrors = (errors) => {
  let concatErrors = "Environment Variable Validation Error.";
  for (const [envVar, err] of Object.entries(errors)) {
    if (err instanceof EnvError) {
      concatErrors += `\n* ${err.message}.`;
    } else if (err instanceof EnvMissingError) {
      concatErrors += `\n* ${envVar} is missing.`;
    }
  }
  return concatErrors;
};

const validateEnvVariables = () => {
  try {
    cleanEnv(
      process.env,
      {
        PORT: port(),
        NODE_ENV: str({ choices: ["development", "test", "production"] }),
        TOKEN_SECRET: str(),
        TOKEN_EXPIRES_IN: str(),
        DB_HOST: host(),
        DB_PORT: port(),
        DB_NAME: str(),
        DB_USERNAME: str(),
        DB_PASSWORD: str(),
        LOG_GENERAL: bool(),
        LOG_QUERIES: bool(),
        LOG_ERRORS_DB: bool(),
        LOG_ERRORS_CONSOLE: bool(),
        LOG_REQUESTS_DB: bool(),
        LOG_REQUESTS_CONSOLE: bool(),
      },
      {
        reporter: ({ errors }) => {
          if (Object.keys(errors).length !== 0) {
            const errorStr = concatEnvVariableErrors(errors);
            throw errorStr;
          }
        },
      }
    );
    logger.info("Environment variables validated successfully.");
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = validateEnvVariables;
