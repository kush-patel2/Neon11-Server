const express = require("express");

const router = express.Router();

const catchAsync = require("../utils/catchAsync");

const multer = require("multer");
const { createAboutUs, listAboutUs, listAboutUsByParams, getAboutUs, updateAboutUs, removeAboutUs } = require("../controllers/AboutUs/AboutUs");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/AboutUsImg");
  },
  filename: (req, file, cb) => {
    // const ext = file.mimetype.split("/")[1];
    // cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: multerStorage });

router.post(
  "/auth/create/aboutus",
  upload.single("myFile"),
  catchAsync(createAboutUs)
);

router.get("/auth/list/aboutus", catchAsync(listAboutUs));

router.post(
  "/auth/list-by-params/aboutus",
  catchAsync(listAboutUsByParams)
);

router.get("/auth/get/aboutus/:_id", catchAsync(getAboutUs));

router.put(
  "/auth/update/aboutus/:_id",
  upload.single("myFile"),
  catchAsync(updateAboutUs)
);

router.delete(
  "/auth/remove/aboutus/:_id",
  catchAsync(removeAboutUs)
);

module.exports = router;
