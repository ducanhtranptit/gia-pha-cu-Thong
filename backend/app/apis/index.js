const express = require("express");
const PeopleApi = require("./people.api.js");
const PostsApi = require("./posts.api.js");
const config = require("../../config/config.js");
const router = express.Router();

const baseUrl = config.baseUrl;

router.use(`${baseUrl}/people`, PeopleApi);
router.use(`${baseUrl}/posts`, PostsApi);

module.exports = router;
