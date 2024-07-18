const express = require("express");

const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const { createSocialMedia, listSocialMedia, listActiveSocialMedia, listSocialMediaByParams, getSocialMedia, updateSocialMedia, removeSocialMedia } = require("../controllers/SocialMedia/SocialMedia");

router.post("/auth/socialmedia", catchAsync(createSocialMedia));
router.get("/auth/list/socialmedia", catchAsync(listSocialMedia));

router.get(
  "/auth/list-active/socialmedia",
  catchAsync(listActiveSocialMedia)
);

router.post(
  "/auth/list-by-params/socialmedia",
  catchAsync(listSocialMediaByParams)
);

router.get("/auth/get/socialmedia/:_id", catchAsync(getSocialMedia));

router.put(
  "/auth/update/socialmedia/:_id",
  catchAsync(updateSocialMedia)
);

router.delete(
  "/auth/remove/socialmedia/:_id",
  catchAsync(removeSocialMedia)
);


module.exports = router;