const express = require("express");

const router = express.Router();

const catchAsync = require("../utils/catchAsync");

const {
  removeNeonSignsCategoryMaster,
  updateNeonSignsCategoryMaster,
  getNeonSignsCategoryMaster,
  listNeonSignsCategoryMasterByParams,
  listNeonSignsActiveCategories,
  listNeonSignsCategoryMaster,
  createNeonSignsCategoryMaster,
} = require("../controllers/Category/NeonSignsCategory");

router.post(
  "/auth/create/NeonSignsCategoryMaster",
  catchAsync(createNeonSignsCategoryMaster)
);

router.get(
  "/auth/list/NeonSignsCategoryMaster",
  catchAsync(listNeonSignsCategoryMaster)
);

router.get(
  "/auth/list-active/NeonSignsCategoryMaster",
  catchAsync(listNeonSignsActiveCategories)
);

router.post(
  "/auth/list-by-params/NeonSignsCategoryMaster",
  catchAsync(listNeonSignsCategoryMasterByParams)
);

router.get(
  "/auth/get/NeonSignsCategoryMaster/:_id",
  catchAsync(getNeonSignsCategoryMaster)
);

router.put(
  "/auth/update/NeonSignsCategoryMaster/:_id",
  catchAsync(updateNeonSignsCategoryMaster)
);

router.delete(
  "/auth/remove/NeonSignsCategoryMaster/:_id",
  catchAsync(removeNeonSignsCategoryMaster)
);

module.exports = router;
