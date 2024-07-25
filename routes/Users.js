const express = require("express");

const router = express.Router();

const catchAsync = require("../utils/catchAsync");

const { registerUser, loginUser, getUserProfile, updateUserProfile, updateUserAddress, changeUserPassword } = require("../controllers/Users/Users");
const authenticate = require("../middlewares/users");

router.post("/auth/create/user", catchAsync(registerUser));

router.post("/auth/userLogin", catchAsync(loginUser));

router.get("/auth/userProfile", authenticate, catchAsync(getUserProfile));
router.put('/auth/updateProfile', authenticate, catchAsync(updateUserProfile));
router.put("/auth/updateAddress", authenticate, catchAsync(updateUserAddress));
router.put("/auth/changePassword", authenticate, catchAsync(changeUserPassword));

module.exports = router;
