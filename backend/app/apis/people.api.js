const express = require("express");
const router = express.Router();

const PeopleController = require("../controllers/people.controller");

router.get("/", PeopleController.getAllMalePeopleByFilter);
router.get("/family-tree", PeopleController.getAllPeople);
router.post("/create-person", PeopleController.createPerson);
router.get("/person-details", PeopleController.getPersonDetails);
router.get("/get-all-people", PeopleController.getAllPeopleOfManager);
router.get("/get-all-father", PeopleController.getAllFather);

module.exports = router;
