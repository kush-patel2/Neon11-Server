const express = require("express");

const router = express.Router();

const catchAsync = require("../utils/catchAsync");


const { createLEDCategoryMaster, listLEDCategoryMaster, listLEDActiveCategories, listLEDCategoryMasterByParams, getLEDCategoryMaster, updateLEDCategoryMaster, removeLEDCategoryMaster } = require("../controllers/Category/LEDCategory");

router.post(
  "/auth/create/LEDCategoryMaster",
  catchAsync(createLEDCategoryMaster)
);

router.get(
  "/auth/list/LEDCategoryMaster",
  catchAsync(listLEDCategoryMaster)
);

router.get(
  "/auth/list-active/LEDCategoryMaster",
  catchAsync(listLEDActiveCategories)
);

router.post(
  "/auth/list-by-params/LEDCategoryMaster",
  catchAsync(listLEDCategoryMasterByParams)
);

router.get(
  "/auth/get/LEDCategoryMaster/:_id",
  catchAsync(getLEDCategoryMaster)
);

router.put(
  "/auth/update/LEDCategoryMaster/:_id",
  catchAsync(updateLEDCategoryMaster)
);

router.delete(
  "/auth/remove/LEDCategoryMaster/:_id",
  catchAsync(removeLEDCategoryMaster)
);

module.exports = router;
