const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const VerifyTokenMiddleware = require("../middlewares/auth/verify-token.middleware");

router.post("/login", authController.login);
router.post("/logout", VerifyTokenMiddleware, authController.logout);
router.post("/register", authController.register);

module.exports = router;
