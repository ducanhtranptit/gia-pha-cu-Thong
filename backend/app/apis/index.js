const express = require("express");
const PeopleApi = require("./people.api.js");
const config = require("../../config/config.js")
const router = express.Router();

const baseUrl = config.baseUrl

router.use(`${baseUrl}/people`, PeopleApi);

module.exports = router;
