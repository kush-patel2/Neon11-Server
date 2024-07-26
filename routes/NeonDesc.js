const express = require("express");

const router = express.Router();

const catchAsync = require("../utils/catchAsync");

const multer = require('multer');
const { listNeonDescDetails, listNeonDescDetailsByParams, getNeonDescDetails, removeNeonDescDetails, updateNeonDescDetails, listNeonDescByCategory, createNeonDescDetails } = require("../controllers/NeonSigns/NeonDesc");
const upload = multer();

router.post(
  "/auth/create/neondesc-details",
  upload.none(),
  catchAsync(createNeonDescDetails)
);

router.get("/auth/list/neondesc-details", catchAsync(listNeonDescDetails));

router.post(
  "/auth/list-by-params/neondesc-details",
  catchAsync(listNeonDescDetailsByParams)
);

router.get("/auth/get/neondesc-details/:_id", catchAsync(getNeonDescDetails));

router.put(
  "/auth/update/neondesc-details/:_id",
  upload.none(),
  catchAsync(updateNeonDescDetails)
);

router.delete(
  "/auth/remove/neondesc-details/:_id",
  catchAsync(removeNeonDescDetails)
);


// APPLICATION
router.get(
  "/auth/list/neondesc-by-category/:categoryId",
  catchAsync(listNeonDescByCategory)
);

// router.post("/auth/list/ledboard-by-id/:productId", catchAsync(getProductByID));

///

module.exports = router;
