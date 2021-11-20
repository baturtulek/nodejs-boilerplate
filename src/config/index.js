const toBoolean = require("to-boolean");

module.exports = {
  APP_CONFIG: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    PASSWORD_HASH_ROUNDS: 10,
  },
  TOKEN_CONFIG: {
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    EXPIRES_IN: process.env.TOKEN_EXPIRES_IN,
  },
  DB_CONFIG: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: "postgres",
    dialectOptions: {
      ssl: false,
    },
    define: {
      underscored: true,
    },
  },
  LOG_CONFIG: {
    LOG_GENERAL: toBoolean(process.env.LOG_GENERAL ?? true),
    LOG_QUERIES: toBoolean(process.env.LOG_QUERIES ?? true),
    LOG_ERRORS: {
      LOG_TO_DB: toBoolean(process.env.LOG_ERRORS_DB ?? true),
      LOG_TO_CONSOLE: toBoolean(process.env.LOG_ERRORS_CONSOLE ?? true),
    },
    LOG_REQUESTS: {
      LOG_TO_DB: toBoolean(process.env.LOG_REQUESTS_DB ?? true),
      LOG_TO_CONSOLE: toBoolean(process.env.LOG_REQUESTS_CONSOLE ?? true),
    },
  },
};
