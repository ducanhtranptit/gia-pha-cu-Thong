const express = require("express");
const homePageRouter = require("./web/home-page.api");
const router = express.Router();

router.use("/", (req, res) => {
	return res.send("This is backend of Thong's tree family web");
});
router.use("/api/v1/core", homePageRouter);

module.exports = router;
