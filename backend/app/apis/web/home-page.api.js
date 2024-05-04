const express = require("express");
const router = express.Router();

const PeopleController = require("../../controllers/people.controller")

router.get("/",PeopleController.hellWorld);

module.exports = router;
