const express = require("express");

const router = express.Router();

const catchAsync = require("../utils/catchAsync");

const multer = require("multer");
const { createLEDBoardDetails, listLEDBoardDetails, listLEDBoardDetailsByParams, getLEDBoardDetails, updateLEDBoardDetails, removeLEDBoardDetails, listLEDBoardByCategory } = require("../controllers/LEDBoard/LEDBoard");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/LEDBoard");
  },
  filename: (req, file, cb) => {
    // const ext = file.mimetype.split("/")[1];
    // cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: multerStorage });

router.post(
  "/auth/create/ledboard-details",
  upload.single("myFile"),
  catchAsync(createLEDBoardDetails)
);

router.get("/auth/list/ledboard-details", catchAsync(listLEDBoardDetails));

router.post(
  "/auth/list-by-params/ledboard-details",
  catchAsync(listLEDBoardDetailsByParams)
);

router.get("/auth/get/ledboard-details/:_id", catchAsync(getLEDBoardDetails));

router.put(
  "/auth/update/ledboard-details/:_id",
  upload.single("myFile"),
  catchAsync(updateLEDBoardDetails)
);

router.delete(
  "/auth/remove/ledboard-details/:_id",
  catchAsync(removeLEDBoardDetails)
);


// APPLICATION
router.get(
  "/auth/list/ledboard-by-category/:categoryId",
  catchAsync(listLEDBoardByCategory)
);

// router.post("/auth/list/ledboard-by-id/:productId", catchAsync(getProductByID));

///

module.exports = router;
