const express = require("express");
const router = express.Router();

const PeopleController = require("../controllers/people.controller");

router.get("/", PeopleController.getAllMalePeopleByFilter)
router.get("/family-tree", PeopleController.getAllPeople);
router.post("/create-person", PeopleController.createPerson)

module.exports = router;
