const express = require("express");
const homePageRouter = require("./web/home-page.api");
const router = express.Router();

router.use("/", homePageRouter);

module.exports = router;
