const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const xss = require("xss-clean");

const { v1Routes } = require("./routes/v1");
const requestLogger = require("./middlewares/logger/requestLogger.middleware");
const routeNotFoundHandler = require("./middlewares/error/routeNotFound.middleware");
const internalServerErrorConverter = require("./middlewares/error/errorConverter.middleware");
const errorLogger = require("./middlewares/logger/errorLogger.middleware");
const errorHandler = require("./middlewares/error/errorHandler.middleware");

const app = express();

app.use(express.json());
app.use(cors());
app.use(xss());
app.use(helmet());
app.use(compression());
app.use(requestLogger);
app.use("/v1", v1Routes);
app.use(routeNotFoundHandler);
app.use(internalServerErrorConverter);
app.use(errorLogger);
app.use(errorHandler);

module.exports = app;
