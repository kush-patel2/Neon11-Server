const express = require("express");

const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const { createYTDesc, listYTDesc, listActiveYTDesc, listYTDescByParams, getYTDesc, updateYTDescMaster, removeYTDescMaster } = require("../controllers/YTDesc/YTDesc");
const multer = require('multer');
const upload = multer();

router.post("/auth/ytdesc", upload.none(), catchAsync(createYTDesc));
router.get("/auth/list/ytdesc", catchAsync(listYTDesc));

router.get(
  "/auth/list-active/ytdesc",
  catchAsync(listActiveYTDesc)
);

router.post(
  "/auth/list-by-params/ytdesc",
  catchAsync(listYTDescByParams)
);

router.get("/auth/get/ytdesc/:_id", catchAsync(getYTDesc));

router.put(
  "/auth/update/ytdesc/:_id",upload.none(),
  catchAsync(updateYTDescMaster)
);

router.delete(
  "/auth/remove/ytdesc/:_id",
  catchAsync(removeYTDescMaster)
);


module.exports = router;