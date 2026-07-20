// import express from "express";
// import { protect } from "../middlewares/authmiddleware.js";

// import {
//     register,
//     login,
//     getProfile
// } from "../controllers/authController.js";

// const router = express.Router();

// router.post("/register", register);

// router.post("/login", login);

// router.get("/me", protect, getProfile);

// export default router;



import express from "express";

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  changePassword,
  uploadProfileImage
} from "../controllers/authController.js";

import protect from "../middlewares/authmiddleware.js";

const router = express.Router();

// ===========================
// PUBLIC ROUTES
// ===========================

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// ===========================
// PROTECTED ROUTES
// ===========================

// Get logged-in user profile
router.get("/profile", protect, getProfile);

// Update profile
router.put("/profile", protect, updateProfile);

// Change password
router.put("/change-password", protect, changePassword);



import upload from "../middlewares/upload.js";

// import {

//     uploadProfileImage

// } from "../controllers/authController.js";

router.put(

    "/profile-image",

    protect,

    upload.single("image"),

    uploadProfileImage

);

export default router;