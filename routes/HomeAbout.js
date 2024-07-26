const express = require("express");

const router = express.Router();

const catchAsync = require("../utils/catchAsync");

const multer = require("multer");
const { createHomeAbout, listHomeAbout, listHomeAboutByParams, getHomeAbout, updateHomeAbout, removeHomeAbout } = require("../controllers/HomeAbout/HomeAbout");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/HomeAboutImg");
  },
  filename: (req, file, cb) => {
    // const ext = file.mimetype.split("/")[1];
    // cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: multerStorage });

router.post(
  "/auth/create/home-about",
  upload.single("myFile"),
  catchAsync(createHomeAbout)
);

router.get("/auth/list/home-about", catchAsync(listHomeAbout));

router.post(
  "/auth/list-by-params/home-about",
  catchAsync(listHomeAboutByParams)
);

router.get("/auth/get/home-about/:_id", catchAsync(getHomeAbout));

router.put(
  "/auth/update/home-about/:_id",
  upload.single("myFile"),
  catchAsync(updateHomeAbout)
);

router.delete(
  "/auth/remove/home-about/:_id",
  catchAsync(removeHomeAbout)
);

module.exports = router;
