const express = require("express");
const cors = require("cors")
const loggerMiddleware = require("./middlewares/core/logger");
const parserMiddleware = require("./middlewares/core/parser");
const router = require("./apis/index");
const handleMiddleware = require("./middlewares/core/handler");

const app = express();

app.use(cors())
app.use(loggerMiddleware);
app.use(parserMiddleware.jsonParserMiddleware);
app.use(parserMiddleware.urlEncodedParserMiddleware);
app.use(parserMiddleware.cookieParserMiddleware);
app.use(router);
app.use(handleMiddleware.notFoundHandlerMiddleware);
app.use(handleMiddleware.errorHandlerMiddleware);

module.exports = app;
