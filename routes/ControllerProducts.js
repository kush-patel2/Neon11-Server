const express = require("express");

const router = express.Router();

const catchAsync = require("../utils/catchAsync");

const multer = require("multer");
const { createControllerProds, listControllerProds, listControllerProdsByParams, updateControllerProds, getControllerProds, removeControllerProds } = require("../controllers/ControllerProducts/ControllerProducts");


const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/ControllerProds");
  },
  filename: (req, file, cb) => {
    // const ext = file.mimetype.split("/")[1];
    // cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: multerStorage });

router.post(
  "/auth/create/controllerproducts",
  upload.single("myFile"),
  catchAsync(createControllerProds)
);
y
router.get("/auth/list/controllerproducts", catchAsync(listControllerProds));

router.post(
  "/auth/list-by-params/controllerproducts",
  catchAsync(listControllerProdsByParams)
);

router.get("/auth/get/controllerproducts/:_id", catchAsync(getControllerProds));

router.put(
  "/auth/update/controllerproducts/:_id",
  upload.single("myFile"),
  catchAsync(updateControllerProds)
);

router.delete("/auth/remove/controllerproducts/:_id", catchAsync(removeControllerProds));

module.exports = router;
