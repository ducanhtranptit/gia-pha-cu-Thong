const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs").promises;
const PeopleController = require("../controllers/people.controller");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});

router.get("/", PeopleController.getAllMalePeopleByFilter);
router.get("/get-one-person/:id", PeopleController.findOne);
router.get("/family-tree", PeopleController.getAllPeople);
router.post(
    "/create-person",
    upload.single("file"),
    PeopleController.createPerson
);
router.get("/person-details", PeopleController.getPersonDetails);
router.get("/get-all-people", PeopleController.getAllPeopleOfManager);
router.get("/get-all-father", PeopleController.getAllFather);
router.delete("/delete-person/:id", PeopleController.deletePerson);
router.put("/update-person/:id", PeopleController.updateDataPerson);

module.exports = router;
