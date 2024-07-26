const express = require("express");

const router = express.Router();

const catchAsync = require("../utils/catchAsync");

const multer = require("multer");
const {
  createNeonProds,
  listNeonProds,
  listNeonProdsByParams,
  getNeonProds,
  updateNeonProds,
  removeNeonProds,
} = require("../controllers/NeonGoProducts/NeonGoProducts");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/NeonProds");
  },
  filename: (req, file, cb) => {
    // const ext = file.mimetype.split("/")[1];
    // cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: multerStorage });

router.post(
  "/auth/create/neongoproducts",
  upload.single("myFile"),
  catchAsync(createNeonProds)
);

router.get("/auth/list/neongoproducts", catchAsync(listNeonProds));

router.post(
  "/auth/list-by-params/neongoproducts",
  catchAsync(listNeonProdsByParams)
);

router.get("/auth/get/neongoproducts/:_id", catchAsync(getNeonProds));

router.put(
  "/auth/update/neongoproducts/:_id",
  upload.single("myFile"),
  catchAsync(updateNeonProds)
);

router.delete("/auth/remove/neongoproducts/:_id", catchAsync(removeNeonProds));

module.exports = router;
