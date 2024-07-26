const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const { createProdDetails, listProdDetails, listProdDetailsByParams, getProdDetails, updateProdDetails, removeProdDetails, listProdByCategoryName, listProdByCategory } = require("../controllers/ProdDetails/ProdDetails");

// Configure multer for file uploads
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/Products");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: multerStorage });

// Routes for ProdDetails
router.post(
  "/auth/create/prod-details",
  upload.single("image"),
  catchAsync(createProdDetails)
);

router.get("/auth/list/prod-details", catchAsync(listProdDetails));

router.post(
  "/auth/list-by-params/prod-details",
  catchAsync(listProdDetailsByParams)
);

router.get("/auth/get/prod-details/:_id", catchAsync(getProdDetails));

router.put(
  "/auth/update/prod-details/:_id",
  upload.single("image"),
  catchAsync(updateProdDetails)
);

router.delete(
  "/auth/remove/prod-details/:_id",
  catchAsync(removeProdDetails)
);

// Route for listing products by category name
router.get(
  "/auth/list/products-by-category-name/:categoryName",
  catchAsync(listProdByCategoryName)
);
router.get(
    "/auth/list/products-by-category/:categoryId",
    catchAsync(listProdByCategory)
  );

module.exports = router;
