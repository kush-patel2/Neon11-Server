const express = require("express");

const router = express.Router();

const catchAsync = require("../utils/catchAsync");

const { createNeonSignsDetails, listNeonSignsDetails, listNeonSignsDetailsByParams, getNeonSignsDetails, updateNeonSignsDetails, removeNeonSignsDetails, listNeonSignsByCategory } = require("../controllers/NeonSigns/NeonSigns");

const multer = require('multer');
const upload = multer();

router.post(
  "/auth/create/neonsigns-details",
  upload.none(),
  catchAsync(createNeonSignsDetails)
);

router.get("/auth/list/neonsigns-details", catchAsync(listNeonSignsDetails));

router.post(
  "/auth/list-by-params/neonsigns-details",
  catchAsync(listNeonSignsDetailsByParams)
);

router.get("/auth/get/neonsigns-details/:_id", catchAsync(getNeonSignsDetails));

router.put(
  "/auth/update/neonsigns-details/:_id",
  upload.none(),
  catchAsync(updateNeonSignsDetails)
);

router.delete(
  "/auth/remove/neonsigns-details/:_id",
  catchAsync(removeNeonSignsDetails)
);


// APPLICATION
router.get(
  "/auth/list/neonsigns-by-category/:categoryId",
  catchAsync(listNeonSignsByCategory)
);

// router.post("/auth/list/ledboard-by-id/:productId", catchAsync(getProductByID));

///

module.exports = router;
