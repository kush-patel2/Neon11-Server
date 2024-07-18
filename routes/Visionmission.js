const express = require("express");

const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const { createSocialMedia, listSocialMedia, listActiveSocialMedia, listSocialMediaByParams, getSocialMedia, updateSocialMedia, removeSocialMedia } = require("../controllers/SocialMedia/SocialMedia");
const { createVisionmission, listVisionmission, listActiveVisionmission, listVisionmissionByParams, getVisionmission, updateVisionmission, removeVisionmission } = require("../controllers/Visionmission/Visionmission");

router.post("/auth/vision-mission", catchAsync(createVisionmission));
router.get("/auth/list/vision-mission", catchAsync(listVisionmission));

router.get(
  "/auth/list-active/vision-mission",
  catchAsync(listActiveVisionmission)
);

router.post(
  "/auth/list-by-params/vision-mission",
  catchAsync(listVisionmissionByParams)
);

router.get("/auth/get/vision-mission/:_id", catchAsync(getVisionmission));

router.put(
  "/auth/update/vision-mission/:_id",
  catchAsync(updateVisionmission)
);

router.delete(
  "/auth/remove/vision-mission/:_id",
  catchAsync(removeVisionmission)
);


module.exports = router;