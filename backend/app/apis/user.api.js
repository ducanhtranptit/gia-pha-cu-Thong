const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const VerifyTokenMiddleware = require("../middlewares/auth/verify-token.middleware");

router.post("/refresh-token", userController.refreshToken);
router.get("/profile", VerifyTokenMiddleware, userController.getProfile);

module.exports = router;
