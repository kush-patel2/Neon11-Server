const express = require("express");

const router = express.Router();

const catchAsync = require("../utils/catchAsync");

const multer = require("multer");
const {
  createLogo,
  listLogo,
  listLogoByParams,
  getLogo,
  updateLogo,
  removeLogo,
} = require("../controllers/Logo/Logo");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/Logo");
  },
  filename: (req, file, cb) => {
    // const ext = file.mimetype.split("/")[1];
    // cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: multerStorage });

router.post(
  "/auth/create/logo",
  upload.single("myFile"),
  catchAsync(createLogo)
);

router.get("/auth/list/logo", catchAsync(listLogo));

router.post("/auth/list-by-params/logo", catchAsync(listLogoByParams));

router.get("/auth/get/logo/:_id", catchAsync(getLogo));

router.put(
  "/auth/update/logo/:_id",
  upload.single("myFile"),
  catchAsync(updateLogo)
);

router.delete("/auth/remove/logo/:_id", catchAsync(removeLogo));

module.exports = router;
