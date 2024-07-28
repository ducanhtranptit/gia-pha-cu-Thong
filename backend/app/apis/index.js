const express = require("express");
const PeopleApi = require("./people.api.js");
const PostsApi = require("./posts.api.js");
const UploadApi = require("./upload.api.js");
const authApi = require("./auth.api.js");
const userApi = require("./user.api.js");
const config = require("../../config/config.js");
const router = express.Router();

const baseUrl = config.baseUrl;

router.use(`${baseUrl}/auth`, authApi);
router.use(`${baseUrl}/users`, userApi);
router.use(`${baseUrl}/people`, PeopleApi);
router.use(`${baseUrl}/posts`, PostsApi);
router.use(`${baseUrl}/upload`, UploadApi);

module.exports = router;
