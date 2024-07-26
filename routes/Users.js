const express = require("express");

const router = express.Router();

const catchAsync = require("../utils/catchAsync");

const { registerUser, loginUser, getUserProfile, updateUserProfile, updateUserAddress, changeUserPassword, listAllUsers, updateAllUserValues, listUsersByParams, deleteUser, getUserById } = require("../controllers/Users/Users");
const authenticate = require("../middlewares/users");

router.post("/auth/create/user", catchAsync(registerUser));

router.post("/auth/userLogin", catchAsync(loginUser));

router.get("/auth/userProfile", authenticate, catchAsync(getUserProfile));
router.put('/auth/updateProfile', authenticate, catchAsync(updateUserProfile));
router.put("/auth/updateAddress", authenticate, catchAsync(updateUserAddress));
router.put("/auth/changePassword", authenticate, catchAsync(changeUserPassword));

router.get("/auth/list/users", catchAsync(listAllUsers));
router.put("/auth/update/users/:id", catchAsync(updateAllUserValues));
router.post("/auth/listByparams/users", catchAsync(listUsersByParams));
router.delete("/auth/remove/users/:id", catchAsync(deleteUser));

router.get("/auth/get/users/:id",catchAsync(getUserById));

module.exports = router;
