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
const { createProdCategoryMaster, listProdCategoryMaster, listProdActiveCategories, listProdCategoryMasterByParams, getProdCategoryMaster, updateProdCategoryMaster, removeProdCategoryMaster } = require("../controllers/Category/ProdCategory");

router.post(
  "/auth/create/ProductsCategoryMaster",
  catchAsync(createProdCategoryMaster)
);

router.get(
  "/auth/list/ProductsCategoryMaster",
  catchAsync(listProdCategoryMaster)
);

router.get(
  "/auth/list-active/ProductsCategoryMaster",
  catchAsync(listProdActiveCategories)
);

router.post(
  "/auth/list-by-params/ProductsCategoryMaster",
  catchAsync(listProdCategoryMasterByParams)
);

router.get(
  "/auth/get/ProductsCategoryMaster/:_id",
  catchAsync(getProdCategoryMaster)
);

router.put(
  "/auth/update/ProductsCategoryMaster/:_id",
  catchAsync(updateProdCategoryMaster)
);

router.delete(
  "/auth/remove/ProductsCategoryMaster/:_id",
  catchAsync(removeProdCategoryMaster)
);

module.exports = router;
