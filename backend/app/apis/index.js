const express = require("express");
const PeopleApi = require("./web/people.api.js");
const router = express.Router();

router.use("/api/v1/core/people", PeopleApi);

module.exports = router;
