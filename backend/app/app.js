const express = require("express");
const loggerMiddleware = require("./middlewares/core/logger");
const { jsonParserMiddleware, urlEncodedParserMiddleware, cookieParserMiddleware } = require("./middlewares/core/parser");
const router = require("./apis/index");
const { notFoundHandlerMiddleware, errorHandlerMiddleware } = require("./middlewares/core/handler");

const app = express();

app.use(loggerMiddleware);
app.use(jsonParserMiddleware);
app.use(urlEncodedParserMiddleware);
app.use(cookieParserMiddleware);
app.use(router);
app.use(notFoundHandlerMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
