const express = require("express");
const upload = require("../middlewares/uploads/uploadfile.middleware.js");
const VerifyTokemMiddleware = require("../middlewares/auth/verify-token.middleware");
const UploadFileController = require("../controllers/uploadfile.controller.js");

const router = express.Router();

router.post(
  "/",
  VerifyTokemMiddleware,
  upload.single("file"),
  UploadFileController.uploadFile
);
router.get("/:filename", UploadFileController.getFile);

module.exports = router;
