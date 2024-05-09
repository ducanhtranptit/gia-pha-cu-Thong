const express = require("express");
const router = express.Router();

const PeopleController = require("../../controllers/people.controller");

router.get("/", PeopleController.getAllPeople);
router.get("/male-people", PeopleController.getAllMalePeopleByFilter)

module.exports = router;
