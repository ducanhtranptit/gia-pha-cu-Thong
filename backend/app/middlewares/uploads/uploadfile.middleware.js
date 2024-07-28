const multer = require("multer");
const path = require("path");
const fs = require("fs");

const imageTypes = ["image/png", "image/jpeg", "image/jpg"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../../uploads"));
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 30000000 },
  fileFilter: function (_req, file, cb) {
    if (imageTypes.includes(file.mimetype)) {
      return cb(null, true);
    } else {
      return cb(null, false);
    }
  },
});

const uploadDir = path.join(__dirname, "../../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

module.exports = upload;
